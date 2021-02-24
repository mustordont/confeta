import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {TreeModelService} from '../../../tree/services/tree-model.service';
import {AuthService} from '../../services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    public busy$: Subject<boolean> = new Subject();

    public form: FormGroup = new FormGroup({
        login: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,

        private _treeService: TreeModelService,
    ) {
    }

    public login(): void {
        this.busy$.next(true);
        this._authService.login({
            login: this.form.get('login')!.value,
            password: this.form.get('password')!.value,
        }).
            pipe(
                tap(() => this._navigate()),
                finalize(() => {
                    this.busy$.next(false);
                })
            )
            .subscribe();
    }

    private _navigate(): void {
        const redirUrl: string | null = this._activatedRoute.snapshot.queryParamMap.get(AuthService.REDIRURL_PARAM);
        let address: string = '';
        const queryParams: Params = {};
        if (redirUrl) {
            const redirUrlArr: string[] = decodeURIComponent(redirUrl).split('?');
            address = redirUrlArr[0];
            if (redirUrlArr.length > 1) {
                redirUrlArr[1].split('&')
                    .forEach(i => {
                        const arr = i.split('=');
                        queryParams[arr[0]] = arr[1];
                    });
            }
        }
        this._router.navigate([address], {queryParams})
            .catch(() => {
                this._router.navigate(['']);
            });
    }
}
