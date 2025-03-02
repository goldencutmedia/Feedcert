"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = log;
exports.getLogMetadata = getLogMetadata;
const keys_1 = require("../keys");
const context_1 = require("@loopback/context");
/**
 * Mark a controller method as requiring logging (input, output & timing)
 * if it is set at or greater than Application LogLevel.
 * LOG_LEVEL.DEBUG < LOG_LEVEL.INFO < LOG_LEVEL.WARN < LOG_LEVEL.ERROR < LOG_LEVEL.OFF
 *
 * @param level - The Log Level at or above it should log
 */
function log(level) {
    if (level === undefined)
        level = keys_1.LOG_LEVEL.WARN;
    return context_1.MethodDecoratorFactory.createDecorator(keys_1.LogBindings.METADATA, {
        level,
    });
}
/**
 * Fetch log level stored by `@log` decorator.
 *
 * @param controllerClass - Target controller
 * @param methodName - Target method
 */
function getLogMetadata(controllerClass, methodName) {
    return (context_1.MetadataInspector.getMethodMetadata(keys_1.LogBindings.METADATA, controllerClass.prototype, methodName) || { level: keys_1.LOG_LEVEL.OFF });
}
//# sourceMappingURL=log.decorator.js.map