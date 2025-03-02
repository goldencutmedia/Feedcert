import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Credentials} from '../models';
import {inject} from '@loopback/core';

export class CredentialsRepository extends DefaultCrudRepository<Credentials,
  typeof Credentials.prototype.id,
  Credentials> {
  constructor(@inject('datasources.mongodb') dataSource: juggler.DataSource) {
    super(Credentials, dataSource);
  }
}
