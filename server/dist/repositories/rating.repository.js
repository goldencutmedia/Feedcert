"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let RatingRepository = class RatingRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, supplierRepositoryGetter) {
        super(models_1.Rating, dataSource);
        this.supplier = this.createBelongsToAccessorFor('supplier', supplierRepositoryGetter);
    }
};
exports.RatingRepository = RatingRepository;
exports.RatingRepository = RatingRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mongodb')),
    tslib_1.__param(1, repository_1.repository.getter('SupplierRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MongodbDataSource, Function])
], RatingRepository);
//# sourceMappingURL=rating.repository.js.map