import { juggler } from '@loopback/service-proxy';
import { Provider } from '@loopback/core';
import { IStorageService } from '../interfaces';
export declare class StorageServiceProvider implements Provider<IStorageService> {
    protected dataSource: juggler.DataSource;
    constructor(dataSource?: juggler.DataSource);
    value(): Promise<IStorageService>;
}
