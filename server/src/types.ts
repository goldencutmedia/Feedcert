import {OperationArgs, Request} from '@loopback/rest';

/**
 * A function to perform REST req/res logging action
 */
export interface LogFn {
    (
        req: Request,
        args: OperationArgs,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result: any,
        startTime?: HighResTime,
    ): Promise<void>;

    startTimer(): HighResTime;
}

/**
 * Log level metadata
 */
export type LevelMetadata = { level: number };

/**
 * High resolution time as [seconds, nanoseconds]. Used by process.hrtime().
 */
export type HighResTime = [number, number]; // [seconds, nanoseconds]

/**
 * Log writing function
 */
export type LogWriterFn = (msg: string, level: number) => void;

/**
 * Timer function for logging
 */
export type TimerFn = (start?: HighResTime) => HighResTime;
