"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogActionProvider = void 0;
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const core_1 = require("@loopback/core");
const log_decorator_1 = require("../decorators/log.decorator");
const keys_1 = require("../keys");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
let LogActionProvider = class LogActionProvider {
    constructor(getController, getMethod, timer) {
        this.getController = getController;
        this.getMethod = getMethod;
        this.timer = timer;
        // LogWriteFn is an optional dependency and it falls back to `logToConsole`
        this.logWriter = logToConsole;
        this.logLevel = keys_1.LOG_LEVEL.WARN;
    }
    value() {
        const fn = ((req, args, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        result, start) => {
            return this.action(req, args, result, start);
        });
        fn.startTimer = () => {
            return this.timer();
        };
        return fn;
    }
    async action(req, args, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result, start) {
        const controllerClass = await this.getController();
        const methodName = await this.getMethod();
        const metadata = (0, log_decorator_1.getLogMetadata)(controllerClass, methodName);
        const level = metadata ? metadata.level : undefined;
        if (level !== undefined &&
            this.logLevel !== keys_1.LOG_LEVEL.OFF &&
            level >= this.logLevel &&
            level !== keys_1.LOG_LEVEL.OFF) {
            if (!args)
                args = [];
            let msg = `${req.url} :: ${controllerClass.name}.`;
            msg += `${methodName}(${args.join(', ')}) => `;
            if (typeof result === 'object')
                msg += JSON.stringify(result);
            else
                msg += result;
            if (start) {
                const timeDiff = this.timer(start);
                const time = timeDiff[0] * 1000 + Math.round(timeDiff[1] * 1e-4) / 100;
                msg = `${time}ms: ${msg}`;
            }
            this.logWriter(msg, level);
        }
    }
};
exports.LogActionProvider = LogActionProvider;
tslib_1.__decorate([
    (0, context_1.inject)(keys_1.LogBindings.LOGGER, { optional: true }),
    tslib_1.__metadata("design:type", Function)
], LogActionProvider.prototype, "logWriter", void 0);
tslib_1.__decorate([
    (0, context_1.inject)(keys_1.LogBindings.APP_LOG_LEVEL, { optional: true }),
    tslib_1.__metadata("design:type", Number)
], LogActionProvider.prototype, "logLevel", void 0);
exports.LogActionProvider = LogActionProvider = tslib_1.__decorate([
    tslib_1.__param(0, context_1.inject.getter(core_1.CoreBindings.CONTROLLER_CLASS)),
    tslib_1.__param(1, context_1.inject.getter(core_1.CoreBindings.CONTROLLER_METHOD_NAME)),
    tslib_1.__param(2, (0, context_1.inject)(keys_1.LogBindings.TIMER)),
    tslib_1.__metadata("design:paramtypes", [Function, Function, Function])
], LogActionProvider);
function logToConsole(msg, level) {
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
//# sourceMappingURL=log-action.provider.js.map