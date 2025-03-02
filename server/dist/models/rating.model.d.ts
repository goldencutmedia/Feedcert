import { Entity } from '@loopback/repository';
export declare class Rating extends Entity {
    id?: string;
    position?: string;
    defect: string;
    description?: string;
    points: string;
    taskforceMessage?: boolean;
    companyMessage?: boolean;
    governmentMessage?: boolean;
    lockSupplier?: boolean;
    ratingId?: string;
    creationDate?: Date;
    supplierId: number;
    constructor(data?: Partial<Rating>);
}
export interface RatingRelations {
}
export type RatingWithRelations = Rating & RatingRelations;
