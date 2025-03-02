import { BelongsToAccessor, DefaultCrudRepository, Getter, HasManyRepositoryFactory } from '@loopback/repository';
import { Action, Company, Sample, SampleRelations } from '../models';
import { MongodbDataSource } from '../datasources';
import { CompanyRepository } from "./company.repository";
import { ActionRepository } from "./action.repository";
export declare class SampleRepository extends DefaultCrudRepository<Sample, typeof Sample.prototype.id, SampleRelations> {
    protected companyRepositoryGetter: Getter<CompanyRepository>;
    protected actionRepositoryGetter: Getter<ActionRepository>;
    readonly company: BelongsToAccessor<Company, typeof Sample.prototype.id>;
    readonly actions: HasManyRepositoryFactory<Action, typeof Sample.prototype.id>;
    constructor(dataSource: MongodbDataSource, companyRepositoryGetter: Getter<CompanyRepository>, actionRepositoryGetter: Getter<ActionRepository>);
}
