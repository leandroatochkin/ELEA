import { db } from "./api/db/db.js";

export async function runQuery() {
  const client = await db.connect();
  try {
    const res = await client.query(`
        ALTER TABLE trackitems ALTER COLUMN id TYPE VARCHAR(50);
        `);
        console.log(res)
    return res;
  } catch (err) {
    console.error('Error running query:', err);
    throw err;
  } finally {
    client.release();
  }
}

runQuery()

