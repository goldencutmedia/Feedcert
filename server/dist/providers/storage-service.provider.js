"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageServiceProvider = void 0;
const service_proxy_1 = require("@loopback/service-proxy");
const storage_datasource_1 = require("../datasources/storage.datasource");
class StorageServiceProvider {
    constructor(dataSource = new storage_datasource_1.StorageDatasource()
    /* I try to change the line above in the same way that documentation show,
    as follows:

    @inject('datasources.StorageGC')
    protected dataSource: juggler.DataSource = new StorageGCDataSource()

    and also, in the same way that repositories

    @inject('datasources.StorageGC')
    protected dataSource: StorageGCDataSource

    but always return:

    `Error: Cannot resolve injected arguments for StorageGCServiceProvider.[0]:
    The arguments[0] is not decorated for dependency injection, but a value is
    not supplied`
     */
    ) {
        this.dataSource = dataSource;
    }
    value() {
        return (0, service_proxy_1.getService)(this.dataSource);
    }
}
exports.StorageServiceProvider = StorageServiceProvider;
//# sourceMappingURL=storage-service.provider.js.map