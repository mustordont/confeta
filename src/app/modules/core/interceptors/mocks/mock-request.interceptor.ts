import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AbstractBaseClass} from '@modules/core';

import {Observable, of, timer} from 'rxjs';
import {delay, map} from 'rxjs/operators';

import {ELoggingLevelType} from '../../services/models/logger';

// import pageData from '@mocks/page-data.json';
// import settings from '@mocks/settings.json';
// import chatSettings from '@mocks/chat-settings.json';
// import analyticEvents from '@mocks/analytic-events.json';
// import journals from '@mocks/journals.json';
import {IMockRequest, MockItemType, MockRequest, MockRequests} from './mock-request.model';

const MOCKS: IMockRequest[] = [
    // {url: '/settings', json: settings},
    // {url: '/chat/settings', json: chatSettings},
    // {
    //     url: '/page/data',
    //     json: pageData,
    //     operators: [
    //         map(([value, item]: MockItemType) => {
    //             const result = value.find(i => item.request$.getValue().params.get('pageUrl').includes(i.pageUrl));
    //             return [result, item];
    //         }),
    //     ]
    // },
    // {url: '/analytic-events', json: analyticEvents},
    // {
    //     url: '/journal/content',
    //     json: journals,
    //     operators: [
    //         map(([value, item]: [IWebContentResponse[], MockRequest]) => {
    //             const result = value.find(i => item.request$.getValue().url.includes(`/${i.id}`));
    //             return [result.data, item];
    //         }),
    //     ]
    // },
];

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
            this._logger.log(`Mocked: ${request.method} ${request.url} from ${mock.url}`, mock.result);
            if (mock.result?.error) {
                return timer(1000)
                    .pipe(
                        map(() => {
                            throw({
                                error: mock.result
                            });
                        }),
                    );
            }
            return of(new HttpResponse({
                status: 100,
                body: mock.result,
            }))
                .pipe(
                    delay(10),
                );
        }
        this._logger.log(`Loaded from http call: ${request.method} ${request.url}`);
        return next.handle(request);
    }

}


