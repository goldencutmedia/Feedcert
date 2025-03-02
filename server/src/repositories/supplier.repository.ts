import {DefaultCrudRepository, Getter, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {Rating, Supplier, SupplierRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';
import {RatingRepository} from "./rating.repository";

export class SupplierRepository extends DefaultCrudRepository<Supplier,
    typeof Supplier.prototype.id,
    SupplierRelations> {
    public readonly ratings: HasManyRepositoryFactory<Rating, typeof Supplier.prototype.id>;

    constructor(
        @inject('datasources.mongodb') dataSource: MongodbDataSource,
        @repository.getter('RatingRepository')
        protected ratingRepositoryGetter: Getter<RatingRepository>,
    ) {
        super(Supplier, dataSource);

        this.ratings = this.createHasManyRepositoryFactoryFor(
            'ratings',
            ratingRepositoryGetter,
        );
        this.registerInclusionResolver('ratings', this.ratings.inclusionResolver);
    }
}
