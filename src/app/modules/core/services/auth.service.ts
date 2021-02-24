import {Injectable} from '@angular/core';
import {ActivatedRoute, Router, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {LocalStorageService} from './local-storage.service';
import {ApiClientService} from './api-client.service';
import {CoreUserModel, ICoreUser} from './models';
import {AbstractBaseClass} from '../base';

@Injectable({
    providedIn: 'root',
})
export class AuthService extends AbstractBaseClass {
    public static USER_KEY: string = 'user';
    public static REDIRURL_PARAM: string = 'redirurl';

    private _user: CoreUserModel | null = null;
    public set user(value: CoreUserModel | null) {
        if (value) {
            this._user = value;
            LocalStorageService.set(AuthService.USER_KEY, JSON.stringify(value));
        } else {
            this._user = null;
            LocalStorageService.remove(AuthService.USER_KEY);
        }
    }
    public get user(): CoreUserModel | null {
        return this._user;
    }

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _apiClient: ApiClientService,
    ) {
        super();
        const userData = LocalStorageService.get(AuthService.USER_KEY);
        try {
            if (userData) {
                this.user = new CoreUserModel(JSON.parse(userData));
            }
        } catch (e) {
            this._logger.error(e);
        }
    }

    public isAuthenticated(): boolean {
        return !!this.user;
    }

    public login(request: {login: string , password: string}): Observable<boolean> {
        const request$: Observable<ICoreUser> = of({login: request.login, token: 'fakeToken'});
        return request$
            .pipe(
                map((result) => this.user = new CoreUserModel(result)),
                map(() => this.isAuthenticated()),
            );
    }

    public logout(addRedirURL: boolean = true): UrlTree {
        this.user = null;
        return this.generateUrlTree(['login'], addRedirURL);
    }

    public generateUrlTree(commands: any[], addRedirurl: boolean = true): UrlTree {
        const queryParams = addRedirurl && !window.location.pathname.includes('login') ?
            {
                [AuthService.REDIRURL_PARAM]: window.location.pathname + window.location.search,
            }
            : this._activatedRoute.snapshot.queryParams;
        return this._router.createUrlTree(commands, {queryParams});
    }
}
