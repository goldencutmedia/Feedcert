"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Container = class Container extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Container = Container;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: true
    }),
    tslib_1.__metadata("design:type", String)
], Container.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Container.prototype, "name", void 0);
exports.Container = Container = tslib_1.__decorate([
    (0, repository_1.model)({ settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Container);
//# sourceMappingURL=container.model.js.map