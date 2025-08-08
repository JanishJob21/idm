// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Content from './Content';
import AuthForm from './AuthForm';
import List from './List';
import UserProfile from './UserProfile';
import Calculator from './Calculator';            // if already exists
import Products from './Products';
import Cart from './Cart';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cart') || '[]';
    return JSON.parse(stored);
  });

  const handleAuth = (profile) => {
    setUser(profile);
    setIsAuth(true);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuth(false);
    setShowAuth(false);
  };

  const handleShowAuth = () => setShowAuth(true);
  const handleCloseAuth = () => setShowAuth(false);

  const addToCart = (product) => {
    const updated = [...cartItems, product];
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeFromCart = (idx) => {
    const updated = cartItems.filter((_, i) => i !== idx);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  return (
    <Router>
      <div className="App">
        <Header isAuth={isAuth} onShowAuth={handleShowAuth} cartCount={cartItems.length} />

        {showAuth && !isAuth && <AuthForm onAuth={handleAuth} onClose={handleCloseAuth} />}

        <Routes>
          <Route
            path="/"
            element={
              <>
                {isAuth && (
                  <UserProfile
                    name={user?.name}
                    email={user?.email}
                    avatar={user?.avatar}
                    address={user?.address}
                    phone={user?.phone}
                    city={user?.city}
                    state={user?.state}
                    zip={user?.zip}
                    onLogout={handleLogout}
                  />
                )}
                <Content />
                <List />
              </>
            }
          />

          <Route path="/calculator" element={<Calculator />} />
          <Route path="/products" element={<Products onAddToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} onRemove={removeFromCart} />} />

          {/* Fallback */}
          <Route path="*" element={<div style={{ padding: '2rem' }}>Use Ex‑4 to jump in!</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
