import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../AuthContext';
import './Auth.css';

const LoginForm = ({ onSwitch, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const { login, error, clearError } = useAuth();
  
  const validateForm = () => {
    if (!email || !email.includes('@')) {
      setFormError('Please enter a valid email address');
      return false;
    }
    if (!password) {
      setFormError('Please enter your password');
      return false;
    }
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    clearError();
    setFormError('');
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login error:', error);
      setFormError(error.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (formError) setFormError('');
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (formError) setFormError('');
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to continue to your dashboard</p>
      </div>
      
      {(error || formError) && (
        <div className="error-message">{error || formError}</div>
      )}
      
      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <div className="form-group">
          <label htmlFor="email" className="input-label">Email Address</label>
          <div className="input-with-icon">
            <FaEnvelope className="input-icon" />
            <input
              id="email"
              type="email"
              className="auth-input"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading}
              autoComplete="username"
              aria-required="true"
              aria-invalid={!!formError}
              aria-describedby={formError ? 'email-error' : undefined}
            />
          </div>
        </div>
        
        <div className="form-group">
          <div className="form-group-header">
            <label htmlFor="password" className="input-label">Password</label>
          </div>
          <div className="input-with-icon">
            <FaLock className="input-icon" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="auth-input"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              disabled={isLoading}
              autoComplete="current-password"
              aria-required="true"
              aria-invalid={!!formError}
              aria-describedby={formError ? 'password-error' : undefined}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => !isLoading && setShowPassword(!showPassword)}
              disabled={isLoading}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-controls="password"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="auth-button" 
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading"></span>
              Signing in...
            </>
          ) : 'Sign In'}
        </button>
        
        <div className="forgot-password-container">
          <button
            type="button"
            className="text-button"
            onClick={onForgotPassword}
            disabled={isLoading}
            aria-label="Forgot password?"
          >
            Forgot password?
          </button>
        </div>
      </form>
      
      <div className="auth-footer">
        Don't have an account?{' '}
        <button 
          type="button" 
          className="text-button"
          onClick={() => onSwitch('signup')}
          disabled={isLoading}
          aria-disabled={isLoading}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

const SignupForm = ({ onSwitch }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const { signup, login, error, clearError } = useAuth();
  
  const validatePassword = (pass) => {
    if (pass.length < 8) return 'Password must be at least 8 characters long';
    if (!/[A-Z]/.test(pass)) return 'Include at least one uppercase letter';
    if (!/[a-z]/.test(pass)) return 'Include at least one lowercase letter';
    if (!/[0-9]/.test(pass)) return 'Include at least one number';
    return '';
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    clearError();
    
    const pwdError = validatePassword(password);
    if (pwdError) {
      setPasswordError(pwdError);
      return;
    }
    
    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // First sign up the user
      await signup(email, password, name);
      
      // Then automatically log them in
      try {
        await login(email, password);
        // The AuthContext will handle the redirection to dashboard
      } catch (loginError) {
        console.error('Auto-login after signup failed:', loginError);
        // Even if auto-login fails, the user can still log in manually
        onSwitch('login');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setPasswordError(error.message || 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value && e.target.value !== confirmPassword) {
      setPasswordError("Passwords don't match");
    } else {
      setPasswordError('');
    }
  };
  
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value && e.target.value !== password) {
      setPasswordError("Passwords don't match");
    } else {
      setPasswordError('');
    }
  };

  return (
    <div className="auth-card">
      <button 
        type="button" 
        className="back-button"
        onClick={() => onSwitch('login')}
        disabled={isLoading}
      >
        <FaArrowLeft /> Back to Login
      </button>
      
      <div className="auth-header">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Get started with your account</p>
      </div>
      
      {(error || passwordError) && (
        <div className="error-message">{error || passwordError}</div>
      )}
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label className="input-label">Full Name</label>
          <div className="input-with-icon">
            <FaUser className="input-icon" />
            <input
              type="text"
              className="auth-input"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label className="input-label">Email Address</label>
          <div className="input-with-icon">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              className="auth-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label className="input-label">Password</label>
          <div className="input-with-icon">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              className="auth-input"
              placeholder="Create a password"
              value={password}
              onChange={handlePasswordChange}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => !isLoading && setShowPassword(!showPassword)}
              disabled={isLoading}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        
        <div className="form-group">
          <label className="input-label">Confirm Password</label>
          <div className="input-with-icon">
            <FaLock className="input-icon" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="auth-input"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => !isLoading && setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="auth-button" 
          disabled={isLoading || !name || !email || !password || !confirmPassword || passwordError}
        >
          {isLoading ? (
            <>
              <span className="loading"></span>
              Creating Account...
            </>
          ) : 'Sign Up'}
        </button>
      </form>
      
      <div className="auth-footer">
        Already have an account?{' '}
        <button 
          type="button" 
          className="text-button"
          onClick={() => onSwitch('login')}
          disabled={isLoading}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

const ForgotPasswordForm = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setMessage('If an account exists with this email, you will receive a password reset link.');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-card">
      <button 
        type="button" 
        className="back-button"
        onClick={onBack}
      >
        <FaArrowLeft /> Back to Login
      </button>
      
      <div className="auth-header">
        <h2>Reset Password</h2>
        <p className="auth-subtitle">Enter your email to receive a reset link</p>
      </div>
      
      {message && <div className="success-message">{message}</div>}
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <div className="input-with-icon">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              className="auth-input"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          className="auth-button primary"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
};

const AuthCard = () => {
  const [view, setView] = useState('login');
  
  return (
    <div className="auth-container">
      {view === 'login' && (
        <LoginForm 
          onSwitch={setView}
          onForgotPassword={() => setView('forgot-password')}
        />
      )}
      
      {view === 'signup' && (
        <SignupForm onSwitch={setView} />
      )}
      
      {view === 'forgot-password' && (
        <ForgotPasswordForm onBack={() => setView('login')} />
      )}
    </div>
  );
};

export default AuthCard;
