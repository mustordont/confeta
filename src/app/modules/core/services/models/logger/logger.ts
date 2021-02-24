import {ELoggingLevelType} from './logging-level-type.enum';

// tslint:disable:no-console
// tslint:disable:only-arrow-functions
// tslint:disable:ban-types
/**
 * Logger wraps console methods.
 * It adds such bonuses like:
 *      - log level, for instance: DEBUG
 *      - prefix, for instance: ... [wa-client] ...
 */

export class Logger {
    public static DEFAULT_LOG_LEVEL: ELoggingLevelType = ELoggingLevelType.DEBUG;
    public readonly logLevel: ELoggingLevelType = this.options.logLevel || Logger.DEFAULT_LOG_LEVEL;
    public prefix: string = `[${this.options.prefix}]`;

    public error: Function = console.error.bind(window.console, this.prefix);
    public warn: Function = console.warn.bind(window.console, this.prefix);
    public info: Function = console.info.bind(window.console, this.prefix);
    public log: Function = console.log.bind(window.console, this.prefix);

    private _handlers: string[] = [
        'error',
        'warn',
        'info',
        'log',
    ];

    constructor(
        private options: {logLevel?: ELoggingLevelType, prefix: string},
    ) {
        const logLevels = Object.keys(ELoggingLevelType) as ELoggingLevelType[];
        const logLevelIndex: number = logLevels.findIndex(i => this.logLevel === i) - 1;
        this._handlers.forEach((i, index) => {
            if (index > logLevelIndex) {
                // @ts-ignore
                this[i] = function(): void {};
            }
        });
    }
}
