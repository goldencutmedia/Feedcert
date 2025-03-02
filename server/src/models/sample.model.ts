import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Company, CompanyWithRelations} from "./company.model";
import {Action, ActionWithRelations} from "./action.model";

@model({settings: {}})
export class Sample extends Entity {

    @property({
        type: 'string',
        id: true,
        generated: true
    })
    id?: string;

    @property({
        type: 'date',
    })
    reportdate?: string;

    @property({
        type: 'string',
    })
    description?: string;

    @property({
        type: 'number',
        default: 0
    })
    state: number;

    @property({
        type: 'string',
    })
    type: string;

    @property({
        number: 'string',
    })
    number: string;

    @property({
        type: 'string',
    })
    amount?: string;

    @property({
        type: 'string',
    })
    article?: string;

    @property({
        type: 'string',
    })
    transportation?: string;

    @property({
        type: 'date',
    })
    deliverydate?: string;

    @property({
        type: 'date',
    })
    deliverydatestart?: string;

    @property({
        type: 'date',
    })
    deliverydateend?: string;

    @property({
        type: 'string',
    })
    supplierId?: string;

    @property({
        type: 'string',
    })
    user?: string;

    @property({
        type: 'array',
        itemType: 'string',
    })
    documentIds?: string[];

    @property({
        number: 'number',
    })
    gvo: number;

    @property({
        type: 'array',
        itemType: 'object',
    })
    substances?: {
        substancename: string,
        substancevalue: number
    }[];

    @property({
        type: 'boolean',
        default: false
    })
    quarantine?: boolean;

    @property({
        type: 'boolean',
        default: false
    })
    silopart?: boolean;

    @property({
        type: 'boolean',
        default: false
    })
    partlydelivered?: boolean;

    @property({
        type: 'boolean',
        default: false
    })
    singlefeed?: boolean;

    @property({
        type: 'string',
    })
    deliveredAs?: string;

    @property({
        type: 'string',
    })
    deliveredTo?: string;

    @belongsTo(() => Company)
    companyId: string;

    @hasMany(() => Action)
    actions?: Action[];

    constructor(data?: Partial<Sample>) {
        super(data);
    }
}

export interface SampleRelations {
    company?: CompanyWithRelations;
    actions?: ActionWithRelations[];
}

export type SampleWithRelations = Sample & SampleRelations;
