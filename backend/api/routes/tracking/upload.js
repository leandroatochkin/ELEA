import express from 'express';
import {db} from '../../db/db.js'
import { parseFileData } from './parser.js';


const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const items = parseFileData(req.body.data);


    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No data provided or data is invalid' });
    }

for (const item of items) {
  const {
    ID,
    NUMERO_CLIENTE,
    TIPO_MOVIMIENTO,
    CODIGO_MOVIMIENTO,
    CENTRO_EMISOR,
    NUMERO_MOVIMIENTO,
    NUMERO_SECUENCIA,
    NOMBRE,
    DESCRIPCION_ARTICULO,
    CANTIDAD,
    ESTADO
  } = item;

  console.log("About to insert:", { id: ID, allData: item });

  await db.query(`
    INSERT INTO trackItems (
      ID, NUMERO_CLIENTE, TIPO_MOVIMIENTO, CODIGO_MOVIMIENTO, CENTRO_EMISOR,
      NUMERO_MOVIMIENTO, NUMERO_SECUENCIA, NOMBRE,
      DESCRIPCION_ARTICULO, CANTIDAD, ESTADO
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
    )
    ON CONFLICT (ID) DO UPDATE SET
      NUMERO_CLIENTE = EXCLUDED.NUMERO_CLIENTE,
      TIPO_MOVIMIENTO = EXCLUDED.TIPO_MOVIMIENTO,
      CODIGO_MOVIMIENTO = EXCLUDED.CODIGO_MOVIMIENTO,
      CENTRO_EMISOR = EXCLUDED.CENTRO_EMISOR,
      NUMERO_MOVIMIENTO = EXCLUDED.NUMERO_MOVIMIENTO,
      NUMERO_SECUENCIA = EXCLUDED.NUMERO_SECUENCIA,
      NOMBRE = EXCLUDED.NOMBRE,
      DESCRIPCION_ARTICULO = EXCLUDED.DESCRIPCION_ARTICULO,
      CANTIDAD = EXCLUDED.CANTIDAD,
      ESTADO = EXCLUDED.ESTADO;
  `, [
    ID,
    TIPO_MOVIMIENTO,
    CODIGO_MOVIMIENTO,
    CENTRO_EMISOR,
    NUMERO_MOVIMIENTO,
    NUMERO_SECUENCIA,
    NOMBRE,
    DESCRIPCION_ARTICULO,
    CANTIDAD,
    ESTADO
  ]);
}

res.status(201).json({ message: 'Items inserted or updated successfully' });

  } catch (err) {
    console.error(`Error uploading data`, err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


export default router;