import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Supplier} from "./supplier.model";

@model()
export class Rating extends Entity {
    @property({
        type: 'string',
        id: true,
        generated: true,
    })
    id?: string;

    @property({
        type: 'string',
    })
    position?: string;

    @property({
        type: 'string',
        required: true
    })
    defect: string;

    @property({
        type: 'string',
    })
    description?: string;

    @property({
        type: 'string',
        required: true,
        default: 0,
    })
    points: string;

    @property({
        type: 'boolean',
    })
    taskforceMessage?: boolean;

    @property({
        type: 'boolean',
    })
    companyMessage?: boolean;

    @property({
        type: 'boolean',
    })
    governmentMessage?: boolean;

    @property({
        type: 'boolean',
    })
    lockSupplier?: boolean;

    @property({
        type: 'string',
    })
    ratingId?: string;

    @property({
        type: 'date',
    })
    creationDate?: Date;

    @belongsTo(() => Supplier)
    supplierId: number;


    constructor(data?: Partial<Rating>) {
        super(data);
    }
}

export interface RatingRelations {
}

export type RatingWithRelations = Rating & RatingRelations;
