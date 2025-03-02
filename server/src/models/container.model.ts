import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Container extends Entity {

    @property({
        type: 'string',
        id: true,
        generated: true
    })
    id?: string;

    @property({
        type: 'string',
        required: true,
    })
    name: string;


    constructor(data?: Partial<Container>) {
        super(data);
    }
}
