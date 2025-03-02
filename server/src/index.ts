import {FeedcertApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import {StorageServiceProvider} from './providers';
import fs from 'fs';

export {FeedcertApplication};

export async function main(options: ApplicationConfig = {}) {
    let cert;
    if(process.env.CERT) {
        cert = fs.readFileSync(process.env.CERT);
    }
    const config = {
        rest: {
            ...options,
            protocol: process.env.PROTOCOL || 'http',
            key: cert,
            cert: cert,
            port: +(process.env.PORT || 3000),
            host: process.env.HOST,
            openApiSpec: {
                setServersFromRequest: true,
                disabled: true
            },
            apiExplorer: {
                disabled: true
            }
        },
    };

    const app = new FeedcertApplication(config);

    app.serviceProvider(StorageServiceProvider);

    await app.boot();
    await app.start();

    const url = app.restServer.url;
    console.log(`Server is running at ${url}`);

    return app;
}
