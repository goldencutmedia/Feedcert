import { Entity } from '@loopback/repository';
export declare class Container extends Entity {
    id?: string;
    name: string;
    constructor(data?: Partial<Container>);
}
