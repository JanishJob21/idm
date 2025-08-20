import React from 'react';
import './List.css';

const products = [
  {
    name: 'Fresh Apples',
    description: 'Crisp, juicy apples sourced from local farms. Perfect for snacking and baking.',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80',
    price: '₹120/kg',
  },
  {
    name: 'Organic Bananas',
    description: 'Naturally ripened organic bananas, rich in potassium and flavor.',
    image: 'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/08/bananas-1354785_1920-1024x683.jpg',
    price: '₹60/dozen',
  },
  {
    name: 'Fresh Carrots',
    description: 'Crunchy and sweet carrots, ideal for salads and cooking.',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80',
    price: '₹50/kg',
  },
  {
    name: 'Green Spinach',
    description: 'Leafy green spinach packed with nutrients for a healthy diet.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    price: '₹40/bunch',
  },
  {
    name: 'Fresh Tomatoes',
    description: 'Ripe, red tomatoes perfect for salads, sandwiches, and sauces.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAoPgxN-wLRzvKbuzAznLTqtIFVIkleUqBXg&s',
    price: '₹80/kg',
  },
];

const h = React.createElement;

export default function List() {
  return h(
    'section',
    { className: 'list-section' },
    h('h2', null, 'Our Fresh Products'),
    h(
      'div',
      { className: 'product-list' },
      products.map((product, idx) =>
        h(
          'div',
          { className: 'product-card', key: idx },
          h('img', {
            src: product.image,
            alt: product.name,
            className: 'product-image',
          }),
          h('h3', null, product.name),
          h('p', { className: 'product-description' }, product.description),
          h('p', { className: 'product-price' }, product.price),
          h('button', { className: 'add-to-cart' }, 'Add to Cart')
        )
      )
    )
  );
}
