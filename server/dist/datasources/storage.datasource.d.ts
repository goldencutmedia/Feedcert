import { juggler } from '@loopback/service-proxy';
export declare class StorageDatasource extends juggler.DataSource {
    static dataSourceName: string;
    constructor(dsConfig?: object);
}
