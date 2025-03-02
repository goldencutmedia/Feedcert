import { Constructor } from '@loopback/context';
import { LOG_LEVEL } from '../keys';
export declare function LogMixin<T extends Constructor<any>>(superClass: T): {
    new (...args: any[]): {
        [x: string]: any;
        logLevel(level: LOG_LEVEL): void;
    };
} & T;
