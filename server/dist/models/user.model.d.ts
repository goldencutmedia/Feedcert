import { Entity } from '@loopback/repository';
export declare class User extends Entity {
    id?: string;
    username: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    password: string;
    roles: string[];
    companyId: string;
    constructor(data?: Partial<User>);
}
export interface UserRelations {
}
export type UserWithRelations = User & UserRelations;
