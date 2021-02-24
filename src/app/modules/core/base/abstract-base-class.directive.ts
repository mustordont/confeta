import {Directive, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {ELoggingLevelType, Logger} from '../services/models';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractBaseClass implements OnDestroy {
    protected _onDestroy$: Subject<void> = new Subject<void>();
    // Logger to log events to browser console
    protected _logger: Logger;

    public constructor(logLevel: ELoggingLevelType = Logger.DEFAULT_LOG_LEVEL) {
        this._logger = new Logger({
            logLevel,
            prefix: this.constructor.name.replace(/([A-Z])/g, ' $1').trim().toLowerCase(),
        });
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }
}
