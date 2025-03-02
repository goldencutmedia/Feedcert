import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { User } from '../models';
export type UserCredentials = {
    id: string;
    password: string;
};
export declare class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id> {
    protected datasource: juggler.DataSource;
    constructor(datasource: juggler.DataSource);
}
