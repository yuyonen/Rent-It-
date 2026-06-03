import express from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../db/pool';
import { AuthRequest, verifyToken } from '../middleware/auth';

const router = express.Router();

// Get reviews for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      `SELECT r.*, u.username as reviewer_username, s.title as service_title 
       FROM reviews r 
       JOIN users u ON r.reviewer_id = u.id 
       LEFT JOIN services s ON r.service_id = s.id 
       WHERE r.reviewee_id = $1 
       ORDER BY r.created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get reviews for a service
router.get('/service/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;
    const result = await pool.query(
      `SELECT r.*, u.username as reviewer_username 
       FROM reviews r 
       JOIN users u ON r.reviewer_id = u.id 
       WHERE r.service_id = $1 
       ORDER BY r.created_at DESC`,
      [serviceId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create review (protected)
router.post(
  '/',
  verifyToken,
  [
    body('revieweeId').isInt().withMessage('Reviewee ID required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').trim().isLength({ min: 1 }).withMessage('Comment required'),
  ],
  async (req: AuthRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { revieweeId, rating, comment, serviceId } = req.body;

    try {
      // Check if review already exists
      const existingReview = await pool.query(
        'SELECT * FROM reviews WHERE reviewer_id = $1 AND reviewee_id = $2 AND service_id = $3',
        [req.userId, revieweeId, serviceId || null]
      );

      if (existingReview.rows.length > 0) {
        return res.status(400).json({ error: 'You have already reviewed this' });
      }

      const result = await pool.query(
        'INSERT INTO reviews (reviewer_id, reviewee_id, rating, comment, service_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [req.userId, revieweeId, rating, comment, serviceId || null]
      );

      // Update user rating
      await pool.query(
        'UPDATE users SET rating = (SELECT AVG(rating) FROM reviews WHERE reviewee_id = $1) WHERE id = $1',
        [revieweeId]
      );

      res.status(201).json({
        message: 'Review created successfully',
        review: result.rows[0],
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

export default router;