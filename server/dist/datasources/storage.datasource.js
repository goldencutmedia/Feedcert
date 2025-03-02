"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageDatasource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const service_proxy_1 = require("@loopback/service-proxy");
const config = tslib_1.__importStar(require("./storage.datasource.json"));
let StorageDatasource = class StorageDatasource extends service_proxy_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
exports.StorageDatasource = StorageDatasource;
StorageDatasource.dataSourceName = 'Storage';
exports.StorageDatasource = StorageDatasource = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.config.Storage', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], StorageDatasource);
//# sourceMappingURL=storage.datasource.js.map