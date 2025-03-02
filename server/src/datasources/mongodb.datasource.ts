import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './mongodb.datasource.json';

export class MongodbDataSource extends juggler.DataSource {
    static dataSourceName = 'mongodb';

    constructor(
        @inject('datasources.config.mongodb', {
            optional: true
        })
            dsConfig: object = config,
    ) {
        dsConfig = {
            ...config,
            host: process.env.MONGO_HOST,
            port: process.env.MONGO_PORT,
            user: process.env.MONGO_USER,
            password: process.env.MONGO_PASS,
            database: process.env.MONGO_DB || 'feedcert'
        };
        super(dsConfig);
    }
}
