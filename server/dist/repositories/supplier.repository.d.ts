import { DefaultCrudRepository, Getter, HasManyRepositoryFactory } from '@loopback/repository';
import { Rating, Supplier, SupplierRelations } from '../models';
import { MongodbDataSource } from '../datasources';
import { RatingRepository } from "./rating.repository";
export declare class SupplierRepository extends DefaultCrudRepository<Supplier, typeof Supplier.prototype.id, SupplierRelations> {
    protected ratingRepositoryGetter: Getter<RatingRepository>;
    readonly ratings: HasManyRepositoryFactory<Rating, typeof Supplier.prototype.id>;
    constructor(dataSource: MongodbDataSource, ratingRepositoryGetter: Getter<RatingRepository>);
}
