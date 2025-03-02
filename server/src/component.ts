import {Component, inject, ProviderMap} from '@loopback/core';
import {LOG_LEVEL, LogBindings} from './keys';
import {LogActionProvider} from './providers/log-action.provider';
import {TimerProvider} from './providers/timer.provider';
import chalk from 'chalk';

export class LogComponent implements Component {
    providers?: ProviderMap = {
        [LogBindings.TIMER.key]: TimerProvider,
        [LogBindings.LOG_ACTION.key]: LogActionProvider,
    };
}

export class Logger {
    @inject(LogBindings.APP_LOG_LEVEL, {optional: true})
    private logLevel: number = LOG_LEVEL.INFO;

    static logToConsole(msg: string, level: number) {
        let output;
        switch (level) {
            case LOG_LEVEL.DEBUG:
                output = chalk.white(`DEBUG: ${msg}`);
                break;
            case LOG_LEVEL.INFO:
                output = chalk.green(`INFO: ${msg}`);
                break;
            case LOG_LEVEL.WARN:
                output = chalk.yellow(`WARN: ${msg}`);
                break;
            case LOG_LEVEL.ERROR:
                output = chalk.red(`ERROR: ${msg}`);
                break;
        }
        if (output) console.log(output);
    }

    static debug(this: any, msg: string) {
        if (this.logLevel === LOG_LEVEL.DEBUG) {
            Logger.logToConsole(msg, LOG_LEVEL.DEBUG);
        }
    }

    static info(this: any, msg: string) {
        if (this.logLevel === LOG_LEVEL.INFO) {
            Logger.logToConsole(msg, LOG_LEVEL.INFO);
        }
    }

    static warn(this: any, msg: string) {
        if (this.logLevel === LOG_LEVEL.WARN) {
            Logger.logToConsole(msg, LOG_LEVEL.WARN);
        }
    }

    static error(this: any, msg: string) {
        if (this.logLevel === LOG_LEVEL.ERROR) {
            Logger.logToConsole(msg, LOG_LEVEL.ERROR);
        }
    }
}
