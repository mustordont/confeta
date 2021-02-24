import {registerLocaleData} from '@angular/common';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import {APP_INITIALIZER, LOCALE_ID, NgModule, Provider} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ApiModule} from '../api/api.module';
import {SharedModule} from '../shared/shared.module';

import {ConfirmModalComponent, LoginComponent, NotFoundComponent} from './components';
import {HandleErrorInterceptor, MockRequestInterceptor, RequestNotificationInterceptor} from './interceptors';
import {AppSettings} from './services';

registerLocaleData(localeRu, 'ru');

const providers: Provider[] = [
    {
        provide: APP_INITIALIZER,
        useFactory: (config: AppSettings) => () => config.loadConfig(),
        deps: [AppSettings],
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HandleErrorInterceptor,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: RequestNotificationInterceptor,
        multi: true,
    },
    {
        provide: LOCALE_ID,
        useValue: 'ru',
    },
];


if (!environment.production) {
    providers.push({
        provide: HTTP_INTERCEPTORS,
        useClass: MockRequestInterceptor,
        multi: true,
    });
}

@NgModule({
    imports: [
        HttpClientModule,
        SharedModule,
        ApiModule.forRoot({
            rootUrl: AppSettings.api.baseURL,
        }),
    ],
    declarations: [
        LoginComponent,
        NotFoundComponent,
        ConfirmModalComponent,
    ],
    providers,
})
export class CoreModule {
}
