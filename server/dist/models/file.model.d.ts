import { Entity } from '@loopback/repository';
export declare class File extends Entity {
    id?: string;
    name: string;
    type?: string;
    url?: string;
    constructor(data?: Partial<File>);
}
