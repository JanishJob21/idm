import React, { useState } from 'react';
import './LoginSignup.css';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

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
      // Handle login
      if (!formData.email || !formData.password) {
        setMessage('Please fill in all fields');
        return;
      }
      
      // Simulate successful login
      const user = {
        name: formData.email.split('@')[0],
        email: formData.email
      };
      
      // Store user data in localStorage
      localStorage.setItem('ex2User', JSON.stringify(user));
      
      // Redirect to profile
      window.location.href = '/ex2/profile';
      
    } else {
      // Handle signup
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setMessage('Please fill in all fields');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setMessage('Passwords do not match');
        return;
      }
      
      // Simulate successful signup
      const user = {
        name: formData.name,
        email: formData.email
      };
      
      // Store user data in localStorage
      localStorage.setItem('ex2User', JSON.stringify(user));
      
      // Redirect to profile
      window.location.href = '/ex2/profile';
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>{isLogin ? 'Login to Your Account' : 'Create an Account'}</h2>
        {message && (
          <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <button type="submit" className="submit-btn">
            {isLogin ? 'LOGIN' : 'SIGN UP'}
          </button>
        </form>
        <p className="toggle-text">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button 
            className="toggle-link"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
