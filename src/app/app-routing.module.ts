import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService, LoginComponent} from './modules/core';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: '',
                loadChildren: () => import('./modules/tree/tree.module').then(m => m.TreeModule),
            }
        ],
        canActivate: [
            AuthGuardService,
        ]
    },
    {
        path: '**',
        redirectTo: ''
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
