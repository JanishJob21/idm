// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const navLinks = [
  { href: '/', label: 'Ex-1', key: 'home' },
  { href: '/profile', label: 'Ex-2', key: 'profile' },
  { href: '/calculator', label: 'Ex-3', key: 'calculator' },
  { href: '/products', label: 'Ex-4', key: 'products' },
  { href: '/counter', label: 'Ex-5', key: 'counter' }
];

const Header = () => (
  <div className="sidebar-area">
    <nav className="sidebar-nav">
      <div className="sidebar-title">Nellai Raja Store</div>

      {navLinks.map((link) => (
        <Link
          to={link.href}
          key={link.key}
          className="sidebar-nav-link"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  </div>
);

export default Header;
