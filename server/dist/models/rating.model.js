"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const supplier_model_1 = require("./supplier.model");
let Rating = class Rating extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Rating = Rating;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", String)
], Rating.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Rating.prototype, "position", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true
    }),
    tslib_1.__metadata("design:type", String)
], Rating.prototype, "defect", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Rating.prototype, "description", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        default: 0,
    }),
    tslib_1.__metadata("design:type", String)
], Rating.prototype, "points", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], Rating.prototype, "taskforceMessage", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], Rating.prototype, "companyMessage", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], Rating.prototype, "governmentMessage", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], Rating.prototype, "lockSupplier", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Rating.prototype, "ratingId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", Date)
], Rating.prototype, "creationDate", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => supplier_model_1.Supplier),
    tslib_1.__metadata("design:type", Number)
], Rating.prototype, "supplierId", void 0);
exports.Rating = Rating = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Rating);
//# sourceMappingURL=rating.model.js.map