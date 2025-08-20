import React from 'react';
import './Content.css';

const Content = () =>
  React.createElement(
    'main',
    { className: 'content' },
    React.createElement('h1', null, 'Welcome to Nellai Raja Store'),
    React.createElement(
      'p',
      null,
      'Nellai Raja Store is your one-stop shop for fresh produce, organic groceries, and daily essentials. Enjoy a healthy lifestyle with our wide range of fruits, vegetables, and pantry items delivered to your doorstep.'
    ),
    React.createElement('img', {
      src: 'https://theacsi.org/wp-content/uploads/2022/01/acsi-supermarket-industry-scaled.jpg',
      alt: 'Grocery Store',
      className: 'content-image',
      style: {
        width: '100%',
        maxWidth: '600px',
        height: 'auto',
        display: 'block',
        margin: '1.5rem auto',
        borderRadius: '12px',
      },
    }),
    React.createElement(
      'button',
      {
        className: 'content-btn',
        onClick: () => alert('Thank you for choosing Nellai Raja Store!'),
      },
      'Shop Now'
    )
  );

export default Content;
