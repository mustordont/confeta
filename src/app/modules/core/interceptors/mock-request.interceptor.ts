import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable, of, timer} from 'rxjs';
import {delay, map} from 'rxjs/operators';

const MOCKS: IMockRequest[] = [
];

import {AbstractBaseClass} from '../base/abstract-base-class.directive';
import {ELoggingLevelType} from '../services/models/logger';

@Injectable({
    providedIn: 'root',
})
export class MockRequestInterceptor extends AbstractBaseClass implements HttpInterceptor {
    private _mocks: MockRequests = new MockRequests(MOCKS);
    constructor() {
        super(ELoggingLevelType.DEBUG);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const mock: MockRequest | null = this._mocks.getMostMatchedRequest(request);
        if (mock) {
            this._logger.log(`Mocked: ${request.method} ${request.url} from ${mock.url}`, mock.json);
            if (mock.json.error) {
                return  timer(1000)
                    .pipe(
                        map(() => {
                            throw({
                                error: mock.json
                            });
                        }),
                    );
            }
            return of(new HttpResponse({
                status: 100,
                body: mock.json,
            }))
                .pipe(
                    delay(10),
                );
        }
        this._logger.log(`Loaded from http call: ${request.method} ${request.url}`);
        return next.handle(request);
    }

}

type methodType = 'head' | 'get' | 'put' | 'post' | 'delete';

interface IMockRequest {
    url: string;
    method?: methodType | methodType[]; // default GET
    json: any;
    matched?: number; // number of matched chars,
    usageCount?: number;
}

class MockRequest {
    public readonly url: string;
    public readonly method: methodType[]; // default GET
    private readonly _json: any;
    public matched: number = 0; // number of matched chars,
    private _usageCount: number = 0;
    constructor(data: IMockRequest) {
        this.url = data.url;
        this.method = Array.isArray(data.method) ?
            data.method :
            (!data.method ? ['get'] : [data.method]);
        this._json = data.json;
    }

    public set usageCount(value: number) {
        this._usageCount = value;
    }

    public get usageCount(): number {
        return this._usageCount;
    }

    public get json(): any {
        return Array.isArray(this._json) ? this._json[(this._usageCount !== 0 ? this._usageCount - 1 : 0) % this._json.length] : this._json;
    }
}

class MockRequests {
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
        const mock: MockRequest | null = mocks[0]?.matched ? mocks[0] : null;
        if (mock) {
            mock.usageCount++;
        }
        return mock;
    }
}
