import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Company extends Entity {

    @property({
        type: 'string',
        id: true,
        generated: true
    })
    id?: string;

    @property({
        type: 'string',
        id: true
    })
    number?: string;

    @property({
        type: 'number',
    })
    tempNumber?: number;

    @property({
        type: 'string',
        id: true
    })
    name: string;

    @property({
        type: 'string',
    })
    person?: string;

    @property({
        type: 'string',
    })
    countrycode?: string;

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
        type: 'date',
    })
    firstAudit?: Date;

    @property({
        type: 'date',
    })
    certification?: Date;

    @property({
        type: 'date',
    })
    nextAudit?: Date;

    @property({
        type: 'date',
    })
    control?: Date;


    constructor(data?: Partial<Company>) {
        super(data);
    }
}

export interface CompanyRelations {
    // describe navigational properties here
}

export type CompanyWithRelations = Company & CompanyRelations;
