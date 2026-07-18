import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Offers() {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();
  const vendorId = localStorage.getItem('vendorId') || 1;

  const fetchOffers = () => {
    api.get(`/bargains/vendor/${vendorId}`)
      .then((res) => setOffers(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const respond = async (id, status) => {
    try {
      await api.put(`/bargains/${id}`, { status });
      fetchOffers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <button onClick={() => navigate('/dashboard')}>← Back</button>
      <h2>Incoming Offers</h2>
      {offers.length === 0 ? (
        <p>No offers yet.</p>
      ) : (
        offers.map((o) => (
          <div key={o.id} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px' }}>
            <p><strong>{o.product_name}</strong> — Offered: ₹{o.offered_price}</p>
            <p>Status: {o.status}</p>
            {o.status === 'pending' && (
              <div>
                <button onClick={() => respond(o.id, 'accepted')}>Accept</button>
                <button onClick={() => respond(o.id, 'rejected')} style={{ marginLeft: '8px' }}>Reject</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Offers;