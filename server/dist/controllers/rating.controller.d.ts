import { Count, Filter, Where } from '@loopback/repository';
import { Rating } from '../models';
import { RatingRepository } from '../repositories';
export declare class RatingController {
    ratingRepository: RatingRepository;
    constructor(ratingRepository: RatingRepository);
    create(rating: Omit<Rating, 'id'>): Promise<Rating>;
    count(where?: Where<Rating>): Promise<Count>;
    find(filter?: Filter<Rating>): Promise<Rating[]>;
    updateAll(rating: Rating, where?: Where<Rating>): Promise<Count>;
    findById(id: string): Promise<Rating>;
    updateById(id: string, rating: Rating): Promise<void>;
    replaceById(id: string, rating: Rating): Promise<void>;
    deleteById(id: string): Promise<void>;
}
