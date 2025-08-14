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
      INSERT INTO trackItems (
                        ID, TIPO_MOVIMIENTO, CODIGO_MOVIMIENTO, CENTRO_EMISOR,
                        NUMERO_MOVIMIENTO, NUMERO_SEQUENCIA, NOMBRE,
                        DESCRIPCION_ARTICULO, CANTIDAD, ESTADO
                    ) VALUES (
                        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
                    )
                    ON CONFLICT (ID) DO UPDATE SET
                        TIPO_MOVIMIENTO = EXCLUDED.TIPO_MOVIMIENTO,
                        CODIGO_MOVIMIENTO = EXCLUDED.CODIGO_MOVIMIENTO,
                        CENTRO_EMISOR = EXCLUDED.CENTRO_EMISOR,
                        NUMERO_MOVIMIENTO = EXCLUDED.NUMERO_MOVIMIENTO,
                        NUMERO_SEQUENCIA = EXCLUDED.NUMERO_SEQUENCIA,
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

    res.status(201).json({ message: 'Item inserted or updated successfully' });

  } catch (err) {
    console.error(`Error uploading data`, err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


export default router;