import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private _instances: Array<number> = [];
    public isBusy$ = new BehaviorSubject(false);

    constructor(
        private _snackBar: MatSnackBar,
    ) {}

    public show(): number {
        const newInstance: number = new Date().valueOf();
        this._instances.push( newInstance );
        this.isBusy$.next(true);
        return newInstance;
    }

    public hide(instance: number): boolean {
        const index: number = this._instances.indexOf(instance);
        if (index > -1) {
            this._instances.splice(index, 1);
        }
        this.isBusy$.next(this._instances.length > 0);
        return (index !== -1);
    }

    public showSnack(message: any, warn: boolean = true): void {
        this._snackBar.open(
            message,
            '',
            {
                duration: 5000,
                panelClass: `snack-bar_${warn ? 'error' : 'success'}`,
            },
        );
    }
}
