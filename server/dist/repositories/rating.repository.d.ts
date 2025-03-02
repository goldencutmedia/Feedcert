import { BelongsToAccessor, DefaultCrudRepository, Getter } from '@loopback/repository';
import { Rating, RatingRelations, Supplier } from '../models';
import { MongodbDataSource } from '../datasources';
import { SupplierRepository } from "./supplier.repository";
export declare class RatingRepository extends DefaultCrudRepository<Rating, typeof Rating.prototype.id, RatingRelations> {
    readonly supplier: BelongsToAccessor<Supplier, typeof Rating.prototype.id>;
    constructor(dataSource: MongodbDataSource, supplierRepositoryGetter: Getter<SupplierRepository>);
}
