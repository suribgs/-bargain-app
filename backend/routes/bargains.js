const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const auth = require('../middleware/auth');

// Customer sends an offer
router.post('/', auth, async (req, res) => {
  const { product_id, offered_price } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO bargain_requests (product_id, customer_id, offered_price) VALUES (?, ?, ?)',
      [product_id, req.user.id, offered_price]
    );
    res.status(201).json({ message: 'Offer sent', requestId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error sending offer', error: err.message });
  }
});

// Vendor responds
router.put('/:id', auth, async (req, res) => {
  const { status, counter_price } = req.body; // status: accepted, rejected, countered
  try {
    await pool.query(
      'UPDATE bargain_requests SET status = ?, counter_price = ? WHERE id = ?',
      [status, counter_price || null, req.params.id]
    );
    res.json({ message: 'Offer updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating offer', error: err.message });
  }
});

// Get all offers for a vendor's products
router.get('/vendor/:vendorId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT br.*, p.name AS product_name
       FROM bargain_requests br
       JOIN products p ON br.product_id = p.id
       WHERE p.vendor_id = ?`,
      [req.params.vendorId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching offers', error: err.message });
  }
});

module.exports = router;