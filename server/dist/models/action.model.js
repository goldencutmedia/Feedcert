"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const sample_model_1 = require("./sample.model");
let Action = class Action extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Action = Action;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: true
    }),
    tslib_1.__metadata("design:type", String)
], Action.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", Date)
], Action.prototype, "creationDate", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Action.prototype, "description", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", Number)
], Action.prototype, "state", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => sample_model_1.Sample),
    tslib_1.__metadata("design:type", String)
], Action.prototype, "sampleId", void 0);
exports.Action = Action = tslib_1.__decorate([
    (0, repository_1.model)({ settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Action);
//# sourceMappingURL=action.model.js.map