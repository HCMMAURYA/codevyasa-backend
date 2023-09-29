// src/db.ts
import { Pool } from 'pg';

const pool = new Pool({
    user: 'armyharish786',        
    host: 'ep-winter-cloud-52596744',         // Replace with your PostgreSQL host
    database: 'neondb',           // Replace with your PostgreSQL database name
    password: '4jvoDTB5tGIO',     // Replace with your PostgreSQL password
    port: 5432,
});

export default pool;

// postgres://armyharish786:4jvoDTB5tGIO@ep-winter-cloud-52596744.us-east-2.aws.neon.tech/neondb
