"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LogComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const keys_1 = require("./keys");
const log_action_provider_1 = require("./providers/log-action.provider");
const timer_provider_1 = require("./providers/timer.provider");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
class LogComponent {
    constructor() {
        this.providers = {
            [keys_1.LogBindings.TIMER.key]: timer_provider_1.TimerProvider,
            [keys_1.LogBindings.LOG_ACTION.key]: log_action_provider_1.LogActionProvider,
        };
    }
}
exports.LogComponent = LogComponent;
class Logger {
    constructor() {
        this.logLevel = keys_1.LOG_LEVEL.INFO;
    }
    static logToConsole(msg, level) {
        let output;
        switch (level) {
            case keys_1.LOG_LEVEL.DEBUG:
                output = chalk_1.default.white(`DEBUG: ${msg}`);
                break;
            case keys_1.LOG_LEVEL.INFO:
                output = chalk_1.default.green(`INFO: ${msg}`);
                break;
            case keys_1.LOG_LEVEL.WARN:
                output = chalk_1.default.yellow(`WARN: ${msg}`);
                break;
            case keys_1.LOG_LEVEL.ERROR:
                output = chalk_1.default.red(`ERROR: ${msg}`);
                break;
        }
        if (output)
            console.log(output);
    }
    static debug(msg) {
        if (this.logLevel === keys_1.LOG_LEVEL.DEBUG) {
            Logger.logToConsole(msg, keys_1.LOG_LEVEL.DEBUG);
        }
    }
    static info(msg) {
        if (this.logLevel === keys_1.LOG_LEVEL.INFO) {
            Logger.logToConsole(msg, keys_1.LOG_LEVEL.INFO);
        }
    }
    static warn(msg) {
        if (this.logLevel === keys_1.LOG_LEVEL.WARN) {
            Logger.logToConsole(msg, keys_1.LOG_LEVEL.WARN);
        }
    }
    static error(msg) {
        if (this.logLevel === keys_1.LOG_LEVEL.ERROR) {
            Logger.logToConsole(msg, keys_1.LOG_LEVEL.ERROR);
        }
    }
}
exports.Logger = Logger;
tslib_1.__decorate([
    (0, core_1.inject)(keys_1.LogBindings.APP_LOG_LEVEL, { optional: true }),
    tslib_1.__metadata("design:type", Number)
], Logger.prototype, "logLevel", void 0);
//# sourceMappingURL=component.js.map