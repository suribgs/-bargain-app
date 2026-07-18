const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const { vendor_id, name, description, price, stock } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO products (vendor_id, name, description, price, stock) VALUES (?, ?, ?, ?, ?)',
      [vendor_id, name, description, price, stock]
    );
    res.status(201).json({ message: 'Product added', productId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error adding product', error: err.message });
  }
});

router.get('/vendor/:vendorId', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE vendor_id = ?', [req.params.vendorId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
});

module.exports = router;