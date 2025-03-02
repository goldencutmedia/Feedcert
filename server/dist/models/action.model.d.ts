import { Entity } from '@loopback/repository';
export declare class Action extends Entity {
    id?: string;
    creationDate: Date;
    description: string;
    state?: number;
    sampleId: string;
    constructor(data?: Partial<Action>);
}
export interface ActionRelations {
}
export type ActionWithRelations = Action & ActionRelations;
