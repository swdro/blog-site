import pg from 'pg';
import dotenv from 'dotenv';

const env = dotenv.config();

const pool = new pg.Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

export default pool;