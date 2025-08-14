import express from 'express';
import { db } from '../../db/db.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter' });
  }

  try {
    const { rows } = await db.query(
      `SELECT ESTADO FROM trackItems WHERE ID = $1`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ results: rows[0] });
  } catch (err) {
    console.error('Transaction failed:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
