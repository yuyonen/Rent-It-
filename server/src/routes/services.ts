import express from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../db/pool';
import { AuthRequest, verifyToken } from '../middleware/auth';

const router = express.Router();

// Get all services with optional search
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = 'SELECT s.*, u.username, u.rating FROM services s JOIN users u ON s.user_id = u.id WHERE s.is_available = true';
    const params: any[] = [];

    if (search) {
      query += ' AND (s.title ILIKE $1 OR s.description ILIKE $1)';
      params.push(`%${search}%`);
    }

    if (category) {
      query += ` AND s.category ILIKE $${params.length + 1}`;
      params.push(`%${category}%`);
    }

    query += ' ORDER BY s.created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single service
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT s.*, u.username, u.rating FROM services s JOIN users u ON s.user_id = u.id WHERE s.id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create service (protected)
router.post(
  '/',
  verifyToken,
  [
    body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
    body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
    body('category').trim().notEmpty().withMessage('Category required'),
    body('pricePerHour').isFloat({ min: 0.01 }).withMessage('Price must be greater than 0'),
  ],
  async (req: AuthRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, category, pricePerHour, imageUrl } = req.body;

    try {
      const result = await pool.query(
        'INSERT INTO services (user_id, title, description, category, price_per_hour, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [req.userId, title, description, category, pricePerHour, imageUrl || null]
      );

      res.status(201).json({
        message: 'Service created successfully',
        service: result.rows[0],
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Update service (protected)
router.put('/:id', verifyToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, pricePerHour, imageUrl, isAvailable } = req.body;

    // Check if user owns the service
    const serviceResult = await pool.query('SELECT user_id FROM services WHERE id = $1', [id]);

    if (serviceResult.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    if (serviceResult.rows[0].user_id !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const result = await pool.query(
      'UPDATE services SET title = $1, description = $2, category = $3, price_per_hour = $4, image_url = $5, is_available = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
      [title, description, category, pricePerHour, imageUrl, isAvailable, id]
    );

    res.json({
      message: 'Service updated successfully',
      service: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete service (protected)
router.delete('/:id', verifyToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Check if user owns the service
    const serviceResult = await pool.query('SELECT user_id FROM services WHERE id = $1', [id]);

    if (serviceResult.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    if (serviceResult.rows[0].user_id !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await pool.query('DELETE FROM services WHERE id = $1', [id]);

    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's services (protected)
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query('SELECT * FROM services WHERE user_id = $1 ORDER BY created_at DESC', [userId]);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;