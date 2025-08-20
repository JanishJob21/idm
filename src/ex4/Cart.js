import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const h = React.createElement;

export default function Cart({ cartItems, onRemove }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const navigate = useNavigate();

  return h(
    'div',
    { className: 'page-content' },
    h('h2', null, '🧺 Your Cart'),
    cartItems.length === 0
      ? h('p', null, 'Your cart is empty.')
      : h(
          React.Fragment,
          null,
          h(
            'ul',
            { className: 'cart-list' },
            ...cartItems.map((item, idx) =>
              h(
                'li',
                { key: idx },
                `${item.name} — ₹${item.price}`,
                h(
                  'button',
                  { onClick: () => onRemove(idx), className: 'remove-btn' },
                  'Remove'
                )
              )
            )
          ),
          h('h3', null, `Total: ₹${total}`)
        ),
    h(
      'div',
      { style: { marginTop: '2rem', display: 'flex', gap: '1rem' } },
      h(
        'button',
        {
          onClick: () => navigate('/'),
          className: 'go-back-btn',
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
      ),
      h(
        'button',
        {
          onClick: () => navigate('/products'),
          className: 'go-to-products-btn',
          style: {
            padding: '0.5rem 1rem',
            backgroundColor: '#1565c0',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          },
        },
        '🛒 Continue Shopping'
      )
    )
  );
}
