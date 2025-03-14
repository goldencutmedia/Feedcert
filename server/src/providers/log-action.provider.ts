import {Constructor, Getter, inject, Provider} from '@loopback/context';
import {CoreBindings} from '@loopback/core';
import {OperationArgs, Request} from '@loopback/rest';
import {getLogMetadata} from '../decorators/log.decorator';
import {LOG_LEVEL, LogBindings} from '../keys';
import {HighResTime, LevelMetadata, LogFn, LogWriterFn, TimerFn,} from '../types';
import chalk from 'chalk';

export class LogActionProvider implements Provider<LogFn> {
    // LogWriteFn is an optional dependency and it falls back to `logToConsole`
    @inject(LogBindings.LOGGER, {optional: true})
    private logWriter: LogWriterFn = logToConsole;

    @inject(LogBindings.APP_LOG_LEVEL, {optional: true})
    private logLevel: number = LOG_LEVEL.WARN;

    constructor(
        @inject.getter(CoreBindings.CONTROLLER_CLASS)
        private readonly getController: Getter<Constructor<{}>>,
        @inject.getter(CoreBindings.CONTROLLER_METHOD_NAME)
        private readonly getMethod: Getter<string>,
        @inject(LogBindings.TIMER) public timer: TimerFn,
    ) {
    }

    value(): LogFn {
        const fn = <LogFn>((
            req: Request,
            args: OperationArgs,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            result: any,
            start?: HighResTime,
        ) => {
            return this.action(req, args, result, start);
        });

        fn.startTimer = () => {
            return this.timer();
        };

        return fn;
    }

    private async action(
        req: Request,
        args: OperationArgs,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result: any,
        start?: HighResTime,
    ): Promise<void> {
        const controllerClass = await this.getController();
        const methodName: string = await this.getMethod();

        const metadata: LevelMetadata = getLogMetadata(controllerClass, methodName);
        const level: number | undefined = metadata ? metadata.level : undefined;

        if (
            level !== undefined &&
            this.logLevel !== LOG_LEVEL.OFF &&
            level >= this.logLevel &&
            level !== LOG_LEVEL.OFF
        ) {
            if (!args) args = [];
            let msg = `${req.url} :: ${controllerClass.name}.`;
            msg += `${methodName}(${args.join(', ')}) => `;

            if (typeof result === 'object') msg += JSON.stringify(result);
            else msg += result;

            if (start) {
                const timeDiff: HighResTime = this.timer(start);
                const time: number =
                    timeDiff[0] * 1000 + Math.round(timeDiff[1] * 1e-4) / 100;
                msg = `${time}ms: ${msg}`;
            }

            this.logWriter(msg, level);
        }
    }
}

function logToConsole(msg: string, level: number) {
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
