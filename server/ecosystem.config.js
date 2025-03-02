module.exports = {
    apps: [
        {
            name: 'FEEDCERT-API',
            script: 'index.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
                PROTOCOL: 'http',
                HOST: 'localhost',
                PORT: '3000',
                MONGO_USER: 'feedcert',
                MONGO_PASS: 'NEXD9mF7!',
                MONGO_DB: 'feedcert',
                MONGO_HOST: 'localhost',
                MONGO_PORT: '27017'
            },
            env_production: {
                NODE_ENV: 'production',
                PROTOCOL: 'https',
                HOST: 'goeteplus-zert.de',
                PORT: '3000',
                CERT: './ssl/Lets_Encrypt_goeteplus-zert.de.pem',
                MONGO_USER: 'feedcert',
                MONGO_PASS: 'NEXD9mF7!',
                MONGO_DB: 'feedcert',
                MONGO_HOST: 'localhost',
                MONGO_PORT: '27017'
            }
        }
    ]
};
