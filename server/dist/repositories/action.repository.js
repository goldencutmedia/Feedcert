"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let ActionRepository = class ActionRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.Action, dataSource);
    }
};
exports.ActionRepository = ActionRepository;
exports.ActionRepository = ActionRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mongodb')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MongodbDataSource])
], ActionRepository);
//# sourceMappingURL=action.repository.js.map