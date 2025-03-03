import { FeedcertApplication } from './application';
import { ApplicationConfig } from '@loopback/core';
import { StorageServiceProvider } from './providers';
import fs from 'fs';

export { FeedcertApplication };

export async function main(options: ApplicationConfig = {}) {
    let cert;
    if (process.env.CERT) {
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

    const app = new FeedcertApplication(config);

    await app.boot();
    await app.start();
  
    const url = app.restServer.url;
    console.log(`Server is running at ${url}`);
    console.log(`Try ${url}/ping`);

    return app;
}
