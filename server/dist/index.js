"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedcertApplication = void 0;
exports.main = main;
const tslib_1 = require("tslib");
const application_1 = require("./application");
Object.defineProperty(exports, "FeedcertApplication", { enumerable: true, get: function () { return application_1.FeedcertApplication; } });
const fs_1 = tslib_1.__importDefault(require("fs"));
async function main(options = {}) {
    let cert;
    if (process.env.CERT) {
        cert = fs_1.default.readFileSync(process.env.CERT);
    }
    const config = {
        rest: {
            ...options,
            protocol: process.env.PROTOCOL || 'http',
            key: cert,
            cert: cert,
            port: +(process.env.PORT || 3000),
            host: process.env.HOST,
            gracePeriodForClose: 5000,
            openApiSpec: {
                setServersFromRequest: true,
                disabled: true
            },
            apiExplorer: {
                disabled: true
            }
        },
    };
    const app = new application_1.FeedcertApplication(config);
    await app.boot();
    await app.start();
    const url = app.restServer.url;
    console.log(`Server is running at ${url}`);
    console.log(`Try ${url}/ping`);
    return app;
}
//# sourceMappingURL=index.js.map