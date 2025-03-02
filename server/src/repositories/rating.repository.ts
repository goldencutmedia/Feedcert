import {BelongsToAccessor, DefaultCrudRepository, Getter, repository} from '@loopback/repository';
import {Rating, RatingRelations, Supplier} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';
import {SupplierRepository} from "./supplier.repository";

export class RatingRepository extends DefaultCrudRepository<Rating,
    typeof Rating.prototype.id,
    RatingRelations> {
    public readonly supplier: BelongsToAccessor<Supplier,
        typeof Rating.prototype.id>;

    constructor(
        @inject('datasources.mongodb') dataSource: MongodbDataSource,
        @repository.getter('SupplierRepository')
            supplierRepositoryGetter: Getter<SupplierRepository>,
    ) {
        super(Rating, dataSource);
        this.supplier = this.createBelongsToAccessorFor(
            'supplier',
            supplierRepositoryGetter,
        );
    }
}
