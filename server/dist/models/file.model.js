"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let File = class File extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.File = File;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", String)
], File.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], File.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], File.prototype, "type", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], File.prototype, "url", void 0);
exports.File = File = tslib_1.__decorate([
    (0, repository_1.model)({ settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], File);
//# sourceMappingURL=file.model.js.map