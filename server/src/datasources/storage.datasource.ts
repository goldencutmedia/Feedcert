import {inject} from '@loopback/core';
import {juggler} from '@loopback/service-proxy';
import * as config from './storage.datasource.json';


export class StorageDatasource extends juggler.DataSource {
    static dataSourceName = 'Storage';

    constructor(
        @inject('datasources.config.Storage', {optional: true})
            dsConfig: object = config,
    ) {
        super(dsConfig);
    }
}