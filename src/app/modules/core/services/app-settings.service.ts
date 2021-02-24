import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {of} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {environment} from '../../../../environments/environment';
import {API} from './models';

@Injectable({
    providedIn: 'root',
})
export class AppSettings {

    // defined as object just for Object.assign
    public static api = API;

    constructor(private _httpClient: HttpClient) {}

    public loadConfig(): Promise<boolean> {
        const params: HttpParams = new HttpParams().append('v', new Date().valueOf().toString());
        return this._httpClient.get(environment.configURL, {params})
            .pipe(
                map((result: any) => {
                    try {
                        Object.assign(AppSettings.api, result);
                    } catch (e) {
                        console.error(e);
                    }
                    return true;
                }),
                catchError((e) => {
                    if (!environment.production) {
                        console.error('failed get config file, using default values', e);
                    }
                    return of(true);
                }),
            )
            .toPromise();
    }
}
