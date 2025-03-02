import { Entity } from '@loopback/repository';
import { CompanyWithRelations } from "./company.model";
import { Action, ActionWithRelations } from "./action.model";
export declare class Sample extends Entity {
    id?: string;
    reportdate?: string;
    description?: string;
    state: number;
    type: string;
    number: string;
    amount?: string;
    article?: string;
    transportation?: string;
    deliverydate?: string;
    deliverydatestart?: string;
    deliverydateend?: string;
    supplierId?: string;
    user?: string;
    documentIds?: string[];
    gvo: number;
    substances?: {
        substancename: string;
        substancevalue: number;
    }[];
    quarantine?: boolean;
    silopart?: boolean;
    partlydelivered?: boolean;
    singlefeed?: boolean;
    deliveredAs?: string;
    deliveredTo?: string;
    companyId: string;
    actions?: Action[];
    constructor(data?: Partial<Sample>);
}
export interface SampleRelations {
    company?: CompanyWithRelations;
    actions?: ActionWithRelations[];
}
export type SampleWithRelations = Sample & SampleRelations;
