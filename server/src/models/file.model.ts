import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class File extends Entity {
    @property({
        type: 'string',
        id: true,
        generated: true,
    })
    id?: string;

    @property({
        type: 'string',
        required: true,
    })
    name: string;

    @property({
        type: 'string',
    })
    type?: string;

    @property({
        type: 'string',
    })
    url?: string;


    constructor(data?: Partial<File>) {
        super(data);
    }
}