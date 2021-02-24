import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

import {NotificationService} from './notification.service';
import {AppSettings} from './app-settings.service';

interface IWithHasOwnProperty {
    hasOwnProperty: (i: string) => boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ApiClientService {
    /**
     * delete empty fields form request
     */
    public static prepareRequest<R extends IWithHasOwnProperty>(request: R): any {
        const result = Object.assign({}, request);
        for (const i in request) {
            if (request.hasOwnProperty(i) && request[i] === null || request[i] === undefined) {
                delete result[i];
            }
        }
        return result;
    }

    constructor(
        private _httpClient: HttpClient,
        private _notificationService: NotificationService,
    ) {}

    public request<R>(method: string = 'GET', url: string, body?: any, params?: any): Observable<R> {
        let preparedParams: HttpParams | undefined;

        if (params) {
            preparedParams = new HttpParams();
            params = ApiClientService.prepareRequest(params);
            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    preparedParams = preparedParams.append(key, params[key]);
                }
            }
        }
        const showId: number = this._notificationService.show();

        return this._httpClient.request<R>(
                method,
                AppSettings.api.baseURL + url,
                {
                    body,
                    params: preparedParams,
                    responseType: 'json',
                    observe: 'body'
                }
            )
            .pipe(
                finalize(() => this._notificationService.hide(showId))
            );
    }
}
