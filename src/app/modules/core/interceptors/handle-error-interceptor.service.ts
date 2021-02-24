import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NotificationService} from '../services/notification.service';
import {ApiException} from '../services/models/api-exception.model';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

/**
 * Catch Http Error
 */
@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {
    constructor(
        private _router: Router,
        private _authService: AuthService,
        private _notificationService: NotificationService,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((errorResponse: HttpErrorResponse) => {
                    console.error(errorResponse);
                    const error = errorResponse.error ? new ApiException(errorResponse.error) : errorResponse.message;
                    this._notificationService.showSnack(error);
                    if ([401, 403].includes(errorResponse.status)) {
                        this._router.navigateByUrl(this._authService.logout());
                    }

                    return throwError(error);
                })
            );
    }
}
