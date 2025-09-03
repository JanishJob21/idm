// Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './ex10/AuthContext';
import './Header.css';

const navLinks = [
  { href: '/', label: 'Ex-1', key: 'home' },
  { href: '/ex2', label: 'Ex-2', key: 'profile' },
  { href: '/ex3', label: 'Ex-3', key: 'calculator' },
  { href: '/ex4', label: 'Ex-4', key: 'products' },
  { href: '/ex5', label: 'Ex-5', key: 'counter' },
  { href: '/ex6', label: 'Ex-6', key: 'items' },
  { href: '/ex7', label: 'Ex-7', key: 'weather' },
  { href: '/ex8', label: 'Ex-8', key: 'crud' },
  { href: '/ex9', label: 'Ex-9', key: 'todo' },
  { href: '/ex10', label: 'Ex-10', key: 'auth' }
];

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/ex10/login');
  };

  return (
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
      
      {user && (
        <div className="user-section">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      )}
    </nav>
  </div>
  );
};

export default Header;
