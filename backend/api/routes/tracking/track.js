import express from 'express';
import { db } from '../../db/db.js';


const router = express.Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(403).json({ message: 'Missing fields'});
    }

    try {
        const [results] = await db.query(`SELECT ESTADO FROM trackItems WHERE ID = $1`, [id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'item not found' });
        }

        res.status(200).json({ results: results[0] });
    } catch (err) {
        console.error('Transaction failed:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;