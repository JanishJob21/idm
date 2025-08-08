// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const navLinks = [
  { href: '/', label: 'Ex-1', key: 'home' },
  { href: '#profile', label: 'Ex-2', key: 'profile' },
  { href: '/calculator', label: 'Ex-3', key: 'login' },
  { href: '/products', label: 'Ex-4', key: 'cart' } // goes to Products page
];

const Header = ({ isAuth, onShowAuth }) => (
  <div className="sidebar-area">
    <nav className="sidebar-nav">
      <div className="sidebar-title">Nellai Raja Store</div>

      {navLinks.map((link) => {
        if (link.key === 'profile') {
          return (
            <a key={link.key} href="#profile" className="sidebar-nav-link" onClick={(e) => {
              e.preventDefault();
              if (!isAuth) {
                if (typeof onShowAuth === 'function') onShowAuth();
              } else {
                const el = document.querySelector('.user-profile');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              {link.label}
            </a>
          );
        }

        return (
          <Link
            to={link.href}
            key={link.key}
            className="sidebar-nav-link"
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  </div>
);

export default Header;
