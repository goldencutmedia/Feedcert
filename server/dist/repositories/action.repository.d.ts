import { DefaultCrudRepository } from '@loopback/repository';
import { Action, ActionRelations } from '../models';
import { MongodbDataSource } from '../datasources';
export declare class ActionRepository extends DefaultCrudRepository<Action, typeof Action.prototype.id, ActionRelations> {
    constructor(dataSource: MongodbDataSource);
}
