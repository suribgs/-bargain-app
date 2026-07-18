const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const auth = require('../middleware/auth');

// Create vendor profile
router.post('/', auth, async (req, res) => {
  const { shop_name, category, latitude, longitude, address } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO vendors (user_id, shop_name, category, latitude, longitude, address) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, shop_name, category, latitude, longitude, address]
    );
    res.status(201).json({ message: 'Vendor profile created', vendorId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating vendor', error: err.message });
  }
});

// Get nearby vendors (Haversine formula, distance in km)
router.get('/nearby', async (req, res) => {
  const { lat, lng, radius = 5 } = req.query;
  try {
    const [rows] = await pool.query(
      `SELECT *, (
        6371 * acos(
          cos(radians(?)) * cos(radians(latitude)) *
          cos(radians(longitude) - radians(?)) +
          sin(radians(?)) * sin(radians(latitude))
        )
      ) AS distance
      FROM vendors
      HAVING distance < ?
      ORDER BY distance`,
      [lat, lng, lat, radius]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching vendors', error: err.message });
  }
});

module.exports = router;