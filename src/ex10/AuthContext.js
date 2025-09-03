import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check for existing session on initial load
  useEffect(() => {
    const user = localStorage.getItem('ex10_user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Sign up function
  const signup = async (email, password, name) => {
    try {
      setError(null);
      
      // Get existing users or initialize empty array
      const users = JSON.parse(localStorage.getItem('ex10_users') || '[]');
      
      // Check if email already exists
      if (users.some(user => user.email === email)) {
        throw new Error('Email already registered. Please use a different email or log in.');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Date.now().toString(),
        email,
        name,
        password: password, // In a real app, this should be hashed
        token: `fake-jwt-token-${Date.now()}`,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      // Add new user to users array and save
      const updatedUsers = [...users, newUser];
      localStorage.setItem('ex10_users', JSON.stringify(updatedUsers));
      localStorage.setItem('ex10_user', JSON.stringify(newUser));
      
      setCurrentUser(newUser);
      navigate('/ex10/dashboard');
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      const errorMsg = error.message || 'Failed to create an account';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Login function - Only allows users who have signed up through Ex-10
  const login = async (email, password) => {
    try {
      setError(null);
      
      // Check if any users exist in the system
      const users = JSON.parse(localStorage.getItem('ex10_users') || '[]');
      
      // Find user by email
      const user = users.find(u => u.email === email);
      
      if (!user) {
        throw new Error('No account found. Please sign up first.');
      }
      
      // In a real app, verify password here
      // For now, we'll just check if password is not empty
      if (!password || password.length < 6) {
        throw new Error('Invalid email or password');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set current user and update last login
      const updatedUser = {
        ...user,
        lastLogin: new Date().toISOString()
      };
      
      // Update the user in the users array
      const updatedUsers = users.map(u => 
        u.email === email ? updatedUser : u
      );
      
      localStorage.setItem('ex10_users', JSON.stringify(updatedUsers));
      localStorage.setItem('ex10_user', JSON.stringify(updatedUser));
      
      setCurrentUser(updatedUser);
      navigate('/ex10/dashboard');
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      const errorMsg = error.message || 'Invalid email or password';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('ex10_user');
    setCurrentUser(null);
    navigate('/ex10/login');
  };

  const value = {
    currentUser,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!currentUser,
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
