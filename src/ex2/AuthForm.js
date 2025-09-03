import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

const AuthModal = ({ onClose, onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Simple login validation
      if (formData.email && formData.password) {
        setMessage('Login successful!');
        if (onAuth) onAuth({ name: 'User', email: formData.email });
        if (onClose) onClose();
        navigate('/');
      } else {
        setMessage('Please enter email and password');
      }
    } else {
      // Signup validation
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setMessage('Please fill in all fields');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setMessage('Passwords do not match');
        return;
      }
      
      setMessage('Account created successfully!');
      if (onAuth) onAuth({ name: formData.name, email: formData.email });
      if (onClose) onClose();
      navigate('/');
    }
  };

  return (
    <div className="auth-form-container">
      <h2>{isLogin ? 'Welcome Back to Nellai Raja Store' : 'Create Your Grocery Account'}</h2>
      {message && <p className="auth-message">{message}</p>}
      
      <form className="auth-form" onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            className="auth-input"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required={!isLogin}
          />
        )}
        
        <input
          type="email"
          name="email"
          className="auth-input"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="password"
          className="auth-input"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            className="auth-input"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required={!isLogin}
          />
        )}
        
        <button type="submit" className="auth-btn">
          {isLogin ? 'Login to Store' : 'Create Account'}
        </button>
      </form>
      
      <p className="auth-toggle">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <span onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', color: '#4caf50' }}>
          {isLogin ? 'Sign up' : 'Log in'}
        </span>
      </p>
      
      {onClose && (
        <button 
          onClick={onClose} 
          className="auth-close"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default AuthModal;
