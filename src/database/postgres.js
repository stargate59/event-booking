import { Pool } from 'pg';

let pool;

// Check if a pool instance already exists to prevent creating multiple connections.
if (!global.pool) {
  global.pool = new Pool({
    connectionString: process.env.POSTGRES_DB_TRANSACTION_POOLER_CONNECTION_STRING
  });
}

pool = global.pool;

export default pool;
