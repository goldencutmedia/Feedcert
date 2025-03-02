import { Entity } from '@loopback/repository';
import { Rating, RatingWithRelations } from "./rating.model";
export declare class Supplier extends Entity {
    id?: string;
    number: string;
    name: string;
    person?: string;
    street?: string;
    postalcode?: string;
    city?: string;
    phone?: string;
    fax?: string;
    email?: string;
    web?: string;
    traderegisternumber?: string;
    registercourt?: string;
    bioControlFacility?: string;
    gopluszertified: boolean;
    rating: string;
    ratings?: Rating[];
    constructor(data?: Partial<Supplier>);
}
export interface SupplierRelations {
    ratings?: RatingWithRelations[];
}
export type SupplierWithRelations = Supplier & SupplierRelations;
