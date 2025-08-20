// Products.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';

const productList = [
  { name: 'Apple', price: 30, image: 'https://assets.clevelandclinic.org/transform/LargeFeatureImage/cd71f4bd-81d4-45d8-a450-74df78e4477a/Apples-184940975-770x533-1_jpg' },
  { name: 'Banana', price: 10, image: 'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/08/bananas-1354785_1920.jpg' },
  { name: 'Milk', price: 25, image: 'https://mydiagnostics.in/cdn/shop/articles/img-1748326586409_1200x.jpg?v=1748327918' },
  { name: 'Bread', price: 20, image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/paul_hollywoods_crusty_83536_16x9.jpg' }
];

const Products = ({ onAddToCart }) => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAdd = (product) => {
    onAddToCart(product);
    setMessage(`${product.name} added successfully! ✅`);
    setTimeout(() => setMessage(''), 2000);
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="products-page">
      <h2>🛒 Available Products</h2>

      {message && <div className="success-message">{message}</div>}

      <div className="product-card-grid">
        {productList.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button onClick={() => handleAdd(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <button className="cart-btn" onClick={goToCart}>Go to Cart</button>
        <button
          className="home-btn"
          onClick={goToHome}
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
      </div>
    </div>
  );
};

export default Products;
