import express from 'express';
import {db} from '../../db/db.js'
import { parseFileData } from './parser.js';


const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const item = parseFileData(req.body.data);
    console.log('item', item);

    if (!item || item.length === 0) {
      return res.status(400).json({ message: 'No data provided or data is invalid' });
    }

    const {
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
    } = item;

    await db.query(`
      INSERT INTO trackingItems (
        ID,
        TIPO_MOVIMIENTO,
        CODIGO_MOVIMIENTO,
        CENTRO_EMISOR,
        NUMERO_MOVIMIENTO,
        NUMERO_SEQUENCIA,
        NOMBRE,
        DESCRIPCION_ARTICULO,
        CANTIDAD,
        ESTADO
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        TIPO_MOVIMIENTO = VALUES(TIPO_MOVIMIENTO),
        CODIGO_MOVIMIENTO = VALUES(CODIGO_MOVIMIENTO),
        CENTRO_EMISOR = VALUES(CENTRO_EMISOR),
        NUMERO_MOVIMIENTO = VALUES(NUMERO_MOVIMIENTO),
        NUMERO_SECUENCIA = VALUES(NUMERO_SEQUENCIA),
        NOMBRE = VALUES(NOMBRE),
        DESCRIPCION_ARTICULO = VALUES(DESCRIPCION_ARTICULO),
        CANTIDAD = VALUES(CANTIDAD),
        ESTADO = VALUES(ESTADO)
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

    res.status(201).json({ message: 'Item inserted or updated successfully' });

  } catch (err) {
    console.error(`Error uploading data`, err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


export default router;