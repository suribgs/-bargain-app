import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [vendorId, setVendorId] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    // For now, using vendorId = 1 since we created it manually earlier.
    // Later we'll fetch the real vendor profile linked to this user.
    const storedVendorId = localStorage.getItem('vendorId') || 1;
    setVendorId(storedVendorId);

    api.get(`/products/vendor/${storedVendorId}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Welcome, {user?.name || 'Vendor'}</h2>
        <button onClick={handleLogout}>Log Out</button>
      </div>

      <h3>Your Products</h3>
      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              {p.name} — ₹{p.price} ({p.stock} in stock)
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => navigate('/add-product')} style={{ marginTop: '20px', padding: '10px 20px' }}>
        + Add Product
      </button>
      <button onClick={() => navigate('/offers')} style={{ marginTop: '20px', marginLeft: '10px', padding: '10px 20px' }}>
        View Offers
      </button>
    </div>
  );
}

export default Dashboard;