import { db } from "./api/db/db.js";

export async function runQuery() {
  const client = await db.connect();
  try {
    const res = await client.query(`
        CREATE TABLE trackItems (
    ID UUID PRIMARY KEY,
    TIPO_MOVIMIENTO VARCHAR(100),
    CODIGO_MOVIMIENTO VARCHAR(100),
    CENTRO_EMISOR VARCHAR(100),
    NUMERO_MOVIMIENTO VARCHAR(100),
    NUMERO_SEQUENCIA VARCHAR(100),
    NOMBRE VARCHAR(255),
    DESCRIPCION_ARTICULO TEXT,
    CANTIDAD INT,
    ESTADO VARCHAR(100)
);
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

