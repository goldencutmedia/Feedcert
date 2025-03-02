import {
    BelongsToAccessor,
    DefaultCrudRepository,
    Getter,
    HasManyRepositoryFactory,
    repository
} from '@loopback/repository';
import {Action, Company, Sample, SampleRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';
import {CompanyRepository} from "./company.repository";
import {ActionRepository} from "./action.repository";

export class SampleRepository extends DefaultCrudRepository<Sample,
    typeof Sample.prototype.id,
    SampleRelations> {
    public readonly company: BelongsToAccessor<Company, typeof Sample.prototype.id>;
    public readonly actions: HasManyRepositoryFactory<Action, typeof Sample.prototype.id>;

    constructor(
        @inject('datasources.mongodb') dataSource: MongodbDataSource,
        @repository.getter('CompanyRepository')
        protected companyRepositoryGetter: Getter<CompanyRepository>,
        @repository.getter('ActionRepository')
        protected actionRepositoryGetter: Getter<ActionRepository>,
    ) {
        super(Sample, dataSource);

        this.company = this.createBelongsToAccessorFor(
            'company',
            companyRepositoryGetter,
        );
        this.registerInclusionResolver('company', this.company.inclusionResolver);

        this.actions = this.createHasManyRepositoryFactoryFor(
            'actions',
            actionRepositoryGetter,
        );
        this.registerInclusionResolver('actions', this.actions.inclusionResolver);
    }
}
