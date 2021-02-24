import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
    constructor(
        private _router: Router,
        private _authService: AuthService,
    ) {
    }

    canActivate(
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | boolean | UrlTree {
        if (!currentState.url.includes('/login')) {
            if (!this._authService.isAuthenticated()) {
                return this._authService.logout();
            } else {
                return true;
            }
        } else {
            return !this._authService.isAuthenticated();
        }
    }
}
