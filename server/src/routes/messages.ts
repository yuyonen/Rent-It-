import express from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../db/pool';
import { AuthRequest, verifyToken } from '../middleware/auth';

const router = express.Router();

// Get all messages for a user (protected)
router.get('/', verifyToken, async (req: AuthRequest, res) => {
  try {
    const result = await pool.query(
      `SELECT m.*, u.username as sender_username, s.title as service_title 
       FROM messages m 
       JOIN users u ON m.sender_id = u.id 
       LEFT JOIN services s ON m.service_id = s.id 
       WHERE m.receiver_id = $1 
       ORDER BY m.created_at DESC`,
      [req.userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get conversation between two users
router.get('/conversation/:userId', verifyToken, async (req: AuthRequest, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      `SELECT * FROM messages 
       WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)
       ORDER BY created_at ASC`,
      [req.userId, userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Send message (protected)
router.post(
  '/',
  verifyToken,
  [
    body('receiverId').isInt().withMessage('Receiver ID required'),
    body('content').trim().isLength({ min: 1 }).withMessage('Message content required'),
  ],
  async (req: AuthRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { receiverId, content, serviceId } = req.body;

    try {
      const result = await pool.query(
        'INSERT INTO messages (sender_id, receiver_id, content, service_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [req.userId, receiverId, content, serviceId || null]
      );

      res.status(201).json({
        message: 'Message sent successfully',
        data: result.rows[0],
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Mark message as read (protected)
router.patch('/:messageId/read', verifyToken, async (req: AuthRequest, res) => {
  try {
    const { messageId } = req.params;

    const result = await pool.query('UPDATE messages SET is_read = true WHERE id = $1 RETURNING *', [messageId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json({
      message: 'Message marked as read',
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;