import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function AddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const vendorId = localStorage.getItem('vendorId') || 1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/products', {
        vendor_id: vendorId,
        name,
        description,
        price,
        stock,
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding product');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', fontFamily: 'sans-serif' }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label>Name</label><br />
          <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '8px' }} required />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label>Description</label><br />
          <input value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label>Price</label><br />
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: '100%', padding: '8px' }} required />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label>Stock</label><br />
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} style={{ width: '100%', padding: '8px' }} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ padding: '10px 20px' }}>Add Product</button>
        <button type="button" onClick={() => navigate('/dashboard')} style={{ padding: '10px 20px', marginLeft: '10px' }}>Cancel</button>
      </form>
    </div>
  );
}

export default AddProduct;