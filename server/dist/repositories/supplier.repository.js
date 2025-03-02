"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let SupplierRepository = class SupplierRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, ratingRepositoryGetter) {
        super(models_1.Supplier, dataSource);
        this.ratingRepositoryGetter = ratingRepositoryGetter;
        this.ratings = this.createHasManyRepositoryFactoryFor('ratings', ratingRepositoryGetter);
        this.registerInclusionResolver('ratings', this.ratings.inclusionResolver);
    }
};
exports.SupplierRepository = SupplierRepository;
exports.SupplierRepository = SupplierRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mongodb')),
    tslib_1.__param(1, repository_1.repository.getter('RatingRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MongodbDataSource, Function])
], SupplierRepository);
//# sourceMappingURL=supplier.repository.js.map