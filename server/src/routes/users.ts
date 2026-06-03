import express from 'express';
import pool from '../db/pool';
import { AuthRequest, verifyToken } from '../middleware/auth';

const router = express.Router();

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      'SELECT id, username, email, first_name, last_name, profile_picture_url, bio, rating, created_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update profile (protected)
router.put('/:userId', verifyToken, async (req: AuthRequest, res) => {
  try {
    const { userId } = req.params;

    // Check if user is updating their own profile
    if (req.userId !== parseInt(userId)) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const { firstName, lastName, bio, profilePictureUrl } = req.body;

    const result = await pool.query(
      'UPDATE users SET first_name = $1, last_name = $2, bio = $3, profile_picture_url = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING id, username, email, first_name, last_name, profile_picture_url, bio, rating',
      [firstName || null, lastName || null, bio || null, profilePictureUrl || null, userId]
    );

    res.json({
      message: 'Profile updated successfully',
      user: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get current user profile (protected)
router.get('/', verifyToken, async (req: AuthRequest, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email, first_name, last_name, profile_picture_url, bio, rating, created_at FROM users WHERE id = $1',
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;