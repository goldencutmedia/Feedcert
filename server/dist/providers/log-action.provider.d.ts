import { Constructor, Getter, Provider } from '@loopback/context';
import { LogFn, TimerFn } from '../types';
export declare class LogActionProvider implements Provider<LogFn> {
    private readonly getController;
    private readonly getMethod;
    timer: TimerFn;
    private logWriter;
    private logLevel;
    constructor(getController: Getter<Constructor<{}>>, getMethod: Getter<string>, timer: TimerFn);
    value(): LogFn;
    private action;
}
