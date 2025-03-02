import { Entity } from '@loopback/repository';
export declare class Credentials extends Entity {
    id: string;
    password: string;
    userId: string;
    constructor(data?: Partial<Credentials>);
}
export interface CredentialsRelations {
}
export type CredentialsWithRelations = Credentials & CredentialsRelations;
