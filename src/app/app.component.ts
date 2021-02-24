import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, mergeMap} from 'rxjs/operators';
import {AuthService, NotificationService, routerTransition} from './modules/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        routerTransition
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    public title: string = 'Confeta';

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _route: ActivatedRoute,
        public authService: AuthService,
        public notificationService: NotificationService,
    ) {
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this._route),
                map((route) => {
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route;
                }),
                filter((route) => route.outlet === 'primary'),
                mergeMap((route) => route.data)
            )
            .subscribe((data: { title?: string }) => {
                this.title = data.title ? data.title : this.title;
                this._changeDetectorRef.markForCheck();
            });
    }

    public logout(): void {
        this._router.navigateByUrl(this.authService.logout());
    }

    public getState(outlet: any): string {
        // can return more compehensive info for transition
        // return outlet.activatedRouteData.state;
        return outlet.isActivated && outlet.activatedRoute.routeConfig.path;
    }
}
