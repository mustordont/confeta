import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {HttpRequest} from '@angular/common/http';
import {pipeFromArray} from 'rxjs/internal/util/pipe';
import {catchError, map, shareReplay} from 'rxjs/operators';

export type methodType = 'head' | 'get' | 'put' | 'post' | 'delete';

export interface IMockRequest {
    url: string;
    method?: methodType | methodType[]; // default GET
    json: any;
    matched?: number; // number of matched chars,
    operators?: MockItemType[];
}

export type MockItemType = [any, MockRequest];

export class MockRequest {
    public readonly url: string;
    public readonly method: methodType[]; // default GET
    public matched: number; // number of matched chars,
    private _operators: any[] = [];
    public readonly request$: BehaviorSubject<HttpRequest<any>> = new BehaviorSubject<HttpRequest<any>>(null);
    private readonly _result$: Observable<MockItemType>;
    constructor(data: IMockRequest) {
        this.url = data.url;
        this.method = Array.isArray(data.method) ?
            data.method :
            (!data.method ? ['get'] : [data.method]);
        if (Array.isArray(data.operators)) {
            this._operators = data.operators;
        }
        this._result$ = combineLatest([
            of(data.json),
            this.request$,
        ])
            .pipe(
                map(([value]: [any, HttpRequest<any>]) => [value, this]),
                pipeFromArray(this._operators),
                map(([value]: MockItemType) => value),
                catchError((e) => {
                    console.error(e);
                    return EMPTY;
                }),
                shareReplay(),
            );
    }

    public get result(): any {
        let result;
        this._result$
            .subscribe((data) => result = data);
        return result;
    }
}

export class MockRequests {
    public readonly mocks: MockRequest[] = [];
    constructor(
        data: IMockRequest[]
    ) {
        this.mocks = data.map(i => new MockRequest(i));
    }

    public getMostMatchedRequest(request: HttpRequest<any>): MockRequest | null {
        const mocks: MockRequest[] = this.mocks
            .filter((i) => i.method.includes(request.method.toLowerCase() as methodType))
            .map(i => {
                i.matched = request.url.includes(i.url) ? i.url.length : 0;
                return i;
            })
            .sort((a, b) => b.matched - a.matched || a.url.length - b.url.length);
        const mock = mocks[0]?.matched ? mocks[0] : null;
        if (mock) {
            mock.request$.next(request);
        }
        return mock;
    }
}
