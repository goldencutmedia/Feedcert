import { Count, Filter, Where } from '@loopback/repository';
import { Rating, Supplier } from '../models';
import { RatingRepository, SupplierRepository } from '../repositories';
export declare class SupplierController {
    supplierRepository: SupplierRepository;
    ratingRepository: RatingRepository;
    constructor(supplierRepository: SupplierRepository, ratingRepository: RatingRepository);
    create(supplier: Omit<Supplier, 'id'>): Promise<Supplier>;
    count(where?: Where<Supplier>): Promise<Count>;
    find(filter?: Filter<Supplier>): Promise<Supplier[]>;
    updateAll(supplier: Supplier, where?: Where<Supplier>): Promise<Count>;
    findById(id: string): Promise<Supplier>;
    updateById(id: string, supplier: Supplier): Promise<void>;
    replaceById(id: string, supplier: Supplier): Promise<void>;
    deleteById(id: string): Promise<void>;
    setRating(id: string, data: {
        rating: Rating;
    }): Promise<Rating>;
}
