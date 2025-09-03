import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';

const productList = [
  { name: 'Apple', price: 30, image: 'https://assets.clevelandclinic.org/transform/LargeFeatureImage/cd71f4bd-81d4-45d8-a450-74df78e4477a/Apples-184940975-770x533-1_jpg' },
  { name: 'Banana', price: 10, image: 'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/08/bananas-1354785_1920.jpg' },
  { name: 'Milk', price: 25, image: 'https://mydiagnostics.in/cdn/shop/articles/img-1748326586409_1200x.jpg?v=1748327918' },
  { name: 'Bread', price: 20, image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/paul_hollywoods_crusty_83536_16x9.jpg' }
];

const h = React.createElement;

export default function Products({ onAddToCart }) {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAdd = (product) => {
    if (typeof onAddToCart === 'function') {
      onAddToCart(product);
    }
    setMessage(`${product.name} added successfully! ✅`);
    setTimeout(() => setMessage(''), 2000);
  };

  const goToCart = () => navigate('/ex4/cart');
  const goToHome = () => navigate('/');

  return h(
    'div',
    { className: 'products-page' },
    h('h2', null, '🛒 Available Products'),
    message && h('div', { className: 'success-message' }, message),
    h(
      'div',
      { className: 'product-card-grid' },
      ...productList.map((product, index) =>
        h(
          'div',
          { key: index, className: 'product-card' },
          h('img', { src: product.image, alt: product.name }),
          h('h3', null, product.name),
          h('p', null, `₹${product.price}`),
          h('button', { onClick: () => handleAdd(product) }, 'Add to Cart')
        )
      )
    ),
    h(
      'div',
      { style: { textAlign: 'center', marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' } },
      h('button', { className: 'cart-btn', onClick: goToCart }, 'Go to Cart'),
      h(
        'button',
        {
          className: 'home-btn',
          onClick: goToHome,
          style: {
            padding: '0.5rem 1rem',
            backgroundColor: '#388e3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          },
        },
        '⬅ Go to Home Page'
      )
    )
  );
}
