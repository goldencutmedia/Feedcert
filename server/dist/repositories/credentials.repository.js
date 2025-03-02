"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const core_1 = require("@loopback/core");
let CredentialsRepository = class CredentialsRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.Credentials, dataSource);
    }
};
exports.CredentialsRepository = CredentialsRepository;
exports.CredentialsRepository = CredentialsRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mongodb')),
    tslib_1.__metadata("design:paramtypes", [repository_1.juggler.DataSource])
], CredentialsRepository);
//# sourceMappingURL=credentials.repository.js.map