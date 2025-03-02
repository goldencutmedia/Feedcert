"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogMixin = LogMixin;
const keys_1 = require("../keys");
const component_1 = require("../component");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LogMixin(superClass) {
    return class extends superClass {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args) {
            super(...args);
            if (this.options && this.options.logLevel) {
                this.logLevel(this.options.logLevel);
            }
            this.component(component_1.LogComponent);
        }
        logLevel(level) {
            this.bind(keys_1.LogBindings.APP_LOG_LEVEL).to(level);
        }
    };
}
//# sourceMappingURL=log-level.mixin.js.map