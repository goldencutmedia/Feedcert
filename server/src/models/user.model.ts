import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Company} from "./company.model";

@model({settings: {}})
export class User extends Entity {
    @property({
        type: 'string',
        id: true,
    })
    id?: string;

    @property({
        type: 'string',
        required: true,
    })
    username: string;

    @property({
        type: 'string',
    })
    firstname?: string;

    @property({
        type: 'string',
    })
    lastname?: string;

    @property({
        type: 'string',
    })
    email?: string;

    @property({
        type: 'string',
        required: true,
    })
    password: string;

    @property({
        type: 'array',
        itemType: 'string'
    })
    roles: string[];

    @belongsTo(() => Company)
    companyId: string;

    constructor(data?: Partial<User>) {
        super(data);
    }
}

export interface UserRelations {
    // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
