"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let SampleRepository = class SampleRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, companyRepositoryGetter, actionRepositoryGetter) {
        super(models_1.Sample, dataSource);
        this.companyRepositoryGetter = companyRepositoryGetter;
        this.actionRepositoryGetter = actionRepositoryGetter;
        this.company = this.createBelongsToAccessorFor('company', companyRepositoryGetter);
        this.registerInclusionResolver('company', this.company.inclusionResolver);
        this.actions = this.createHasManyRepositoryFactoryFor('actions', actionRepositoryGetter);
        this.registerInclusionResolver('actions', this.actions.inclusionResolver);
    }
};
exports.SampleRepository = SampleRepository;
exports.SampleRepository = SampleRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mongodb')),
    tslib_1.__param(1, repository_1.repository.getter('CompanyRepository')),
    tslib_1.__param(2, repository_1.repository.getter('ActionRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MongodbDataSource, Function, Function])
], SampleRepository);
//# sourceMappingURL=sample.repository.js.map