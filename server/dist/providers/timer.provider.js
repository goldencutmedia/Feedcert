"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerProvider = void 0;
class TimerProvider {
    constructor() { }
    value() {
        return (start) => {
            if (!start)
                return process.hrtime();
            return process.hrtime(start);
        };
    }
}
exports.TimerProvider = TimerProvider;
//# sourceMappingURL=timer.provider.js.map