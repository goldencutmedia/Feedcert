import {Entity, hasMany, model, property} from '@loopback/repository';
import {Rating, RatingWithRelations} from "./rating.model";

@model()
export class Supplier extends Entity {
    @property({
        type: 'string',
        id: true,
        generated: true,
    })
    id?: string;

    @property({
        type: 'string',
        id: true,
    })
    number: string;

    @property({
        type: 'string',
        required: true,
        id: true,
    })
    name: string;

    @property({
        type: 'string',
    })
    person?: string;

    @property({
        type: 'string',
    })
    street?: string;

    @property({
        type: 'string',
    })
    postalcode?: string;

    @property({
        type: 'string',
    })
    city?: string;

    @property({
        type: 'string',
    })
    phone?: string;

    @property({
        type: 'string',
    })
    fax?: string;

    @property({
        type: 'string',
    })
    email?: string;

    @property({
        type: 'string',
    })
    web?: string;

    @property({
        type: 'string',
    })
    traderegisternumber?: string;

    @property({
        type: 'string',
    })
    registercourt?: string;

    @property({
        type: 'string',
    })
    bioControlFacility?: string;

    @property({
        type: 'boolean',
    })
    gopluszertified: boolean;

    @property({
        type: 'string',
        default: 100
    })
    rating: string;

    @hasMany(() => Rating)
    ratings?: Rating[];


    constructor(data?: Partial<Supplier>) {
        super(data);
    }
}

export interface SupplierRelations {
    // describe navigational properties here
    ratings?: RatingWithRelations[];
}

export type SupplierWithRelations = Supplier & SupplierRelations;
