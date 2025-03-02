"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sample = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const company_model_1 = require("./company.model");
const action_model_1 = require("./action.model");
let Sample = class Sample extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Sample = Sample;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: true
    }),
    tslib_1.__metadata("design:type", String)
], Sample.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", String)
], Sample.prototype, "reportdate", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Sample.prototype, "description", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        default: 0
    }),
    tslib_1.__metadata("design:type", Number)
], Sample.prototype, "state", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Sample.prototype, "type", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        number: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Sample.prototype, "number", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Sample.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Sample.prototype, "article", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Sample.prototype, "transportation", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", String)
], Sample.prototype, "deliverydate", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", String)
], Sample.prototype, "deliverydatestart", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", String)
], Sample.prototype, "deliverydateend", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Sample.prototype, "supplierId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Sample.prototype, "user", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'array',
        itemType: 'string',
    }),
    tslib_1.__metadata("design:type", Array)
], Sample.prototype, "documentIds", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        number: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Sample.prototype, "gvo", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'array',
        itemType: 'object',
    }),
    tslib_1.__metadata("design:type", Array)
], Sample.prototype, "substances", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        default: false
    }),
    tslib_1.__metadata("design:type", Boolean)
], Sample.prototype, "quarantine", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        default: false
    }),
    tslib_1.__metadata("design:type", Boolean)
], Sample.prototype, "silopart", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        default: false
    }),
    tslib_1.__metadata("design:type", Boolean)
], Sample.prototype, "partlydelivered", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        default: false
    }),
    tslib_1.__metadata("design:type", Boolean)
], Sample.prototype, "singlefeed", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Sample.prototype, "deliveredAs", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Sample.prototype, "deliveredTo", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => company_model_1.Company),
    tslib_1.__metadata("design:type", String)
], Sample.prototype, "companyId", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => action_model_1.Action),
    tslib_1.__metadata("design:type", Array)
], Sample.prototype, "actions", void 0);
exports.Sample = Sample = tslib_1.__decorate([
    (0, repository_1.model)({ settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Sample);
//# sourceMappingURL=sample.model.js.map