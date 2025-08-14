import { db } from "./api/db/db.js";

async function testDbConnection() {
  try {
    const client = await db.connect(); // get a client from the pool
    console.log('Connected to PostgreSQL successfully!');

    // Optional: test a simple query
    const res = await client.query('SELECT NOW()');
    console.log('Current time from DB:', res.rows[0].now);

    client.release(); // release the client back to the pool
    return true;
  } catch (err) {
    console.error('Error connecting to PostgreSQL:', err);
    return false;
  }
}

testDbConnection()