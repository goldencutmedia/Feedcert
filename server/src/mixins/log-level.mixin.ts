import {Constructor} from '@loopback/context';
import {LOG_LEVEL, LogBindings} from '../keys';
import {LogComponent} from '../component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function LogMixin<T extends Constructor<any>>(superClass: T) {
    return class extends superClass {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
            super(...args);
            if (this.options && this.options.logLevel) {
                this.logLevel(this.options.logLevel);
            }
            this.component(LogComponent);
        }

        logLevel(level: LOG_LEVEL) {
            this.bind(LogBindings.APP_LOG_LEVEL).to(level);
        }
    };
}
