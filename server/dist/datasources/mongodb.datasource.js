"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongodbDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = tslib_1.__importStar(require("./mongodb.datasource.json"));
let MongodbDataSource = class MongodbDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
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
};
exports.MongodbDataSource = MongodbDataSource;
MongodbDataSource.dataSourceName = 'mongodb';
exports.MongodbDataSource = MongodbDataSource = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.config.mongodb', {
        optional: true
    })),
    tslib_1.__metadata("design:paramtypes", [Object])
], MongodbDataSource);
//# sourceMappingURL=mongodb.datasource.js.map