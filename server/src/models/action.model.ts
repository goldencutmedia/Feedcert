import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {Sample} from "./sample.model";
import {User} from "./user.model";

@model({settings: {}})
export class Action extends Entity {
    @property({
        type: 'string',
        id: true,
        generated: true
    })
    id?: string;

    @property({
        type: 'string',
    })
    creationDate: Date;

    @property({
        type: 'string',
        required: true,
    })
    description: string;

    @property({
        type: 'string',
    })
    state?: number;

    @belongsTo(() => Sample)
    sampleId: string;


    constructor(data?: Partial<Action>) {
        super(data);
    }
}

export interface ActionRelations {
    // describe navigational properties here
}

export type ActionWithRelations = Action & ActionRelations;
