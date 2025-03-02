import { Component, ProviderMap } from '@loopback/core';
export declare class LogComponent implements Component {
    providers?: ProviderMap;
}
export declare class Logger {
    private logLevel;
    static logToConsole(msg: string, level: number): void;
    static debug(this: any, msg: string): void;
    static info(this: any, msg: string): void;
    static warn(this: any, msg: string): void;
    static error(this: any, msg: string): void;
}
