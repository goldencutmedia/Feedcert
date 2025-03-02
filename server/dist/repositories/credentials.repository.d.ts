import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Credentials } from '../models';
export declare class CredentialsRepository extends DefaultCrudRepository<Credentials, typeof Credentials.prototype.id, Credentials> {
    constructor(dataSource: juggler.DataSource);
}
