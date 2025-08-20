import React from 'react';
import './Footer.css';

const Footer = () =>
  React.createElement(
    'footer',
    { className: 'footer' },
    React.createElement(
      'div',
      null,
      `© ${new Date().getFullYear()} Nellai Raja Store. All rights reserved.`
    )
  );

export default Footer;
