// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './ex10/AuthContext';
import Header from './Header';

// Exercise Components
import Home from './ex1/Home';
import UserProfile from './ex2/UserProfile';
import LoginSignup from './ex2/LoginSignup';
import Calculator from './ex3/Calculator';
import Products from './ex4/Products';
import Cart from './ex4/Cart';
import GroceryCounter from './ex5/GroceryCounter';
import ItemList from './ex6/ItemList';
import WeatherApp from './ex7/WeatherApp';
import TodoList from './ex9/TodoList';

// Ex-8 CRUD App
import CrudApp from './ex8/components/CrudApp';
import ItemForm from './ex8/components/ItemForm';

// Ex-10 Authentication
import AuthCard from './ex10/components/AuthCard';
import Dashboard from './ex10/components/Dashboard';
import PrivateRoute from './ex10/components/PrivateRoute';

import './App.css';

function AppContent() {
  const { currentUser } = useAuth();
  const isAuth = !!currentUser;
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cart') || '[]';
    return JSON.parse(stored);
  });

  const handleLogout = () => {
    // This is just a placeholder, actual logout is handled in Header
  };

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
    <div className="App">
      <Header isAuth={isAuth} onLogout={handleLogout} />
      <main className="main-content">
        <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={
                isAuth ? (
                  <UserProfile
                    name={currentUser?.name}
                    email={currentUser?.email}
                    avatar={currentUser?.avatar}
                    onLogout={handleLogout}
                  />
                ) : (
                  <Navigate to="/ex10" replace />
                )
              } />
              <Route path="/ex2">
                <Route index element={
                  localStorage.getItem('ex2User') ? (
                    <Navigate to="/ex2/profile" replace />
                  ) : (
                    <LoginSignup />
                  )
                } />
                <Route path="login" element={<Navigate to="/ex2" replace />} />
              </Route>
              <Route path="/ex2/profile" element={
                localStorage.getItem('ex2User') ? (
                  <UserProfile 
                    key="ex2-profile"
                    user={JSON.parse(localStorage.getItem('ex2User'))} 
                    onLogout={() => {
                      localStorage.removeItem('ex2User');
                      window.location.href = '/ex2';
                    }} 
                  />
                ) : (
                  <Navigate to="/ex2" replace />
                )
              } />
              <Route path="/ex3" element={<Calculator />} />
              <Route path="/ex4">
                <Route index element={<Products onAddToCart={addToCart} />} />
                <Route path="cart" element={<Cart cartItems={cartItems} onRemove={removeFromCart} />} />
              </Route>
              <Route path="/ex5" element={<GroceryCounter />} />
              <Route path="/ex6" element={<ItemList />} />
              <Route path="/ex7" element={<WeatherApp />} />
              <Route path="/ex8">
                <Route index element={<CrudApp />} />
                <Route path="items" element={<CrudApp />} />
                <Route path="items/new" element={<ItemForm />} />
                <Route path="items/:id/edit" element={<ItemForm />} />
              </Route>
              <Route path="/ex9" element={<TodoList />} />
            
            {/* Exercise 10 Routes */}
              <Route path="/ex10" element={<AuthCard />} />
              <Route path="/ex10/login" element={<Navigate to="/ex10" replace />} />
              <Route path="/ex10/dashboard" element={
                <PrivateRoute>
                  <Dashboard currentUser={currentUser} onLogout={handleLogout} />
                </PrivateRoute>
              } />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
