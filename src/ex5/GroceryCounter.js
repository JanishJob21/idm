import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GroceryCounter.css';

const h = React.createElement;

export default function GroceryCounter() {
  const navigate = useNavigate();

  const products = [
    { name: 'Apples', price: 50 },
    { name: 'Bananas', price: 30 },
    { name: 'Bread', price: 40 },
    { name: 'Milk', price: 25 },
  ];

  const [counts, setCounts] = useState(Array(products.length).fill(0));

  const increment = (index) => {
    const newCounts = [...counts];
    newCounts[index] += 1;
    setCounts(newCounts);
  };

  const decrement = (index) => {
    const newCounts = [...counts];
    if (newCounts[index] > 0) {
      newCounts[index] -= 1;
      setCounts(newCounts);
    }
  };

  const totalQuantity = counts.reduce((sum, q) => sum + q, 0);
  const totalPrice = counts.reduce((sum, q, i) => sum + q * products[i].price, 0);

  return h(
    'div',
    { className: 'app' },
    h('h1', null, '🛒 Grocery Counter'),
    h(
      'div',
      { className: 'product-list' },
      ...products.map((p, i) =>
        h(
          'div',
          { className: 'counter-card', key: p.name },
          h('h2', null, p.name),
          h('p', { className: 'price' }, `₹${p.price}`),
          h(
            'div',
            { className: 'counter-controls' },
            h('button', { onClick: () => decrement(i) }, '-'),
            h('span', null, String(counts[i])),
            h('button', { onClick: () => increment(i) }, '+')
          )
        )
      )
    ),
    h(
      'div',
      { className: 'summary' },
      h('h2', null, 'Bill Details:'),
      ...products.map((p, i) =>
        counts[i] > 0
          ? h('p', { key: p.name }, `${p.name} ${counts[i]} kg = ₹${p.price * counts[i]}`)
          : null
      ),
      h('hr'),
      h('h3', null, `Total Quantity: ${totalQuantity} kg`),
      h('h3', null, `Total Price: ₹${totalPrice}`)
    ),
    h(
      'div',
      { className: 'home-btn-wrapper' },
      h(
        'button',
        {
          onClick: () => navigate('/'),
          style: {
            marginTop: '24px',
            padding: '10px 22px',
            backgroundColor: '#2e8b57',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
          },
        },
        '← Go to Home Page'
      )
    )
  );
}
