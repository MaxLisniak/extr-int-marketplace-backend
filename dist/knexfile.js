"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Update with your config settings.
const config = {
    development: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: process.env.MYSQL_PASSWORD || "password",
            database: 'marketplace'
        }
    },
};
exports.default = config;
//# sourceMappingURL=knexfile.js.map