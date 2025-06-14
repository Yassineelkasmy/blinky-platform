import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

// Entrypoint by drizzle-kit commands

const host = process.env.DATABASE_HOST;
const port = process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : undefined;
const user = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_NAME;
const certificate = process.env.DATABASE_CA;

if (!host || !port || !user || !password || !database) {
    throw new Error('Missing or incomplete environment variables');
}

export default defineConfig({
    dialect: 'postgresql',
    out: './src/database/migrations',
    schema: './src/**/*.schema.ts',
    migrations: {
        table: '_migrations',
        schema: 'public',
    },
    dbCredentials: {
        host,
        port,
        user,
        password,
        database,
        ssl: certificate
            ? {
                rejectUnauthorized: true,
                ca: certificate,
            }
            : false,
    },
});