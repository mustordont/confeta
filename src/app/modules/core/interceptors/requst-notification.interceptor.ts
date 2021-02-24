import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {NotificationService} from '../services';

@Injectable()
export class RequestNotificationInterceptor implements HttpInterceptor {
    constructor(
        private _notificationService: NotificationService,
    ) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const id = this._notificationService.show();
        // Also handle errors globally
        return next.handle(req)
            .pipe(
                finalize(() => this._notificationService.hide(id)),
            );
    }
}
