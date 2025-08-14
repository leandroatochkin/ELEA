import { db } from "./api/db/db.js";

export async function runQuery() {
  const client = await db.connect();
  try {
    const res = await client.query(`
        ALTER TABLE trackItems
ALTER COLUMN ID DROP DEFAULT,
ALTER COLUMN ID TYPE VARCHAR(36) USING id::text;

        `);
    return res;
  } catch (err) {
    console.error('Error running query:', err);
    throw err;
  } finally {
    client.release();
  }
}

runQuery()

