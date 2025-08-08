// Cart.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, onRemove }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const navigate = useNavigate();

  return (
    <div className="page-content">
      <h2>🧺 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, idx) => (
              <li key={idx}>
                {item.name} — ₹{item.price}
                <button onClick={() => onRemove(idx)} className="remove-btn">Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{total}</h3>
        </>
      )}

      {/* Button Group */}
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => navigate('/')}
          className="go-back-btn"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#388e3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ⬅ Go to Home Page
        </button>

        <button
          onClick={() => navigate('/products')}
          className="go-to-products-btn"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#1565c0',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🛒 Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Cart;
