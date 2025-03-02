import { Entity } from '@loopback/repository';
export declare class Company extends Entity {
    id?: string;
    number?: string;
    tempNumber?: number;
    name: string;
    person?: string;
    countrycode?: string;
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
    firstAudit?: Date;
    certification?: Date;
    nextAudit?: Date;
    control?: Date;
    constructor(data?: Partial<Company>);
}
export interface CompanyRelations {
}
export type CompanyWithRelations = Company & CompanyRelations;
