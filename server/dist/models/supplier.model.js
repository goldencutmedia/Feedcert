"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplier = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rating_model_1 = require("./rating.model");
let Supplier = class Supplier extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Supplier = Supplier;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", String)
], Supplier.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], Supplier.prototype, "number", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], Supplier.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Supplier.prototype, "person", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Supplier.prototype, "street", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Supplier.prototype, "postalcode", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Supplier.prototype, "city", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Supplier.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Supplier.prototype, "fax", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Supplier.prototype, "email", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Supplier.prototype, "web", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Supplier.prototype, "traderegisternumber", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Supplier.prototype, "registercourt", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Supplier.prototype, "bioControlFacility", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], Supplier.prototype, "gopluszertified", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        default: 100
    }),
    tslib_1.__metadata("design:type", String)
], Supplier.prototype, "rating", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => rating_model_1.Rating),
    tslib_1.__metadata("design:type", Array)
], Supplier.prototype, "ratings", void 0);
exports.Supplier = Supplier = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Supplier);
//# sourceMappingURL=supplier.model.js.map