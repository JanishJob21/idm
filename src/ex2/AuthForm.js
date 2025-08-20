import React, { useState } from 'react';

const googleLogo = 'https://static.dezeen.com/uploads/2025/05/sq-google-g-logo-update_dezeen_2364_col_0-852x852.jpg';
const appleLogo = 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg';
const groceryImage = 'https://cdn.pixabay.com/photo/2016/03/02/20/13/grocery-1232944_1280.jpg';

const AuthModal = ({ onClose, onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', name: '', confirmPassword: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isLogin) {
      if (form.email && form.password) {
        setMessage('Login successful!');
        if (typeof onAuth === 'function') {
          onAuth({ name: form.name || 'Grocery User', email: form.email });
        }
        if (typeof onClose === 'function') onClose();
      } else {
        setMessage('Enter email and password.');
      }
    } else {
      if (!form.name || !form.email || !form.password || !form.confirmPassword) {
        setMessage('Please fill all fields.');
        return;
      }
      if (form.password !== form.confirmPassword) {
        setMessage('Passwords do not match.');
        return;
      }
      setMessage('Signup successful!');
      if (typeof onAuth === 'function') {
        onAuth({ name: form.name, email: form.email });
      }
      if (typeof onClose === 'function') onClose();
    }
  };

  const h = React.createElement;
  return h(
    'div',
    { style: modalOverlay },
    h(
      'div',
      { style: modalBox },
      // Left image panel
      h(
        'div',
        { style: leftPanel },
        h('img', {
          src: groceryImage,
          alt: 'Grocery Store',
          style: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px 0 0 16px' }
        })
      ),
      // Right form panel
      h(
        'div',
        { style: rightPanel },
        h(
          'button',
          { onClick: onClose, style: closeBtn },
          '\u00D7'
        ),
        h(
          'h2',
          { style: { color: '#2c3e50', marginBottom: 16 } },
          isLogin ? 'Welcome Back to Nellai Raja Store' : 'Create Your Grocery Account'
        ),
        h(
          'div',
          { style: socialBtns },
          h(
            'button',
            { style: socialBtn },
            h('img', { src: googleLogo, alt: 'Google', style: icon }),
            ' Google'
          ),
          h(
            'button',
            { style: socialBtn },
            h('img', { src: appleLogo, alt: 'Apple', style: icon }),
            ' Apple'
          )
        ),
        h(
          'form',
          { onSubmit: handleSubmit },
          !isLogin &&
            h('input', {
              type: 'text',
              name: 'name',
              placeholder: 'Full Name',
              value: form.name,
              onChange: handleChange,
              required: true,
              style: inputStyle,
            }),
          h('input', {
            type: 'email',
            name: 'email',
            placeholder: 'Email address',
            value: form.email,
            onChange: handleChange,
            required: true,
            style: inputStyle,
          }),
          h('input', {
            type: 'password',
            name: 'password',
            placeholder: 'Password',
            value: form.password,
            onChange: handleChange,
            required: true,
            style: inputStyle,
          }),
          !isLogin &&
            h('input', {
              type: 'password',
              name: 'confirmPassword',
              placeholder: 'Confirm Password',
              value: form.confirmPassword,
              onChange: handleChange,
              required: true,
              style: inputStyle,
            }),
          isLogin && h('div', { style: forgotStyle }, 'Forgot Password?'),
          message && h('div', { style: messageStyle }, message),
          h(
            'button',
            { type: 'submit', style: submitBtn },
            isLogin ? 'Login to Store' : 'Create Account'
          )
        ),
        h(
          'div',
          { style: toggleText },
          isLogin ? "Don't have an account?" : 'Already have an account?',
          h(
            'span',
            { style: toggleLink, onClick: () => setIsLogin(!isLogin) },
            isLogin ? ' Sign up' : ' Log in'
          )
        )
      )
    )
  );
}
;

// ---------- Inline Styles ----------

const modalOverlay = {
  position: 'fixed',
  top: 0, left: 0,
  width: '100vw', height: '100vh',
  background: 'rgba(0,0,0,0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const modalBox = {
  width: '800px',
  maxWidth: '95%',
  height: '520px',
  display: 'flex',
  borderRadius: 16,
  overflow: 'hidden',
  background: '#fff',
  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
};

const leftPanel = {
  width: '50%',
  backgroundColor: '#f2f2f2',
};

const rightPanel = {
  width: '50%',
  padding: '30px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const closeBtn = {
  position: 'absolute',
  top: 10,
  right: 14,
  fontSize: 24,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  color: '#888'
};

const socialBtns = {
  display: 'flex',
  gap: 10,
  marginBottom: 20
};

const socialBtn = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: 6,
  cursor: 'pointer',
  background: '#fff'
};

const icon = {
  width: 18
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '12px',
  borderRadius: '6px',
  border: '1px solid #ccc'
};

const submitBtn = {
  background: '#27ae60',
  color: '#fff',
  border: 'none',
  padding: '12px',
  width: '100%',
  borderRadius: 6,
  fontWeight: 600,
  cursor: 'pointer',
  marginBottom: 10
};

const forgotStyle = {
  textAlign: 'right',
  fontSize: '12px',
  color: '#777',
  marginBottom: 10
};

const messageStyle = {
  color: 'red',
  marginBottom: 10,
  fontWeight: 500
};

const toggleText = {
  textAlign: 'center',
  fontSize: 14,
  color: '#444'
};

const toggleLink = {
  color: '#27ae60',
  fontWeight: 600,
  marginLeft: 6,
  cursor: 'pointer'
};

export default AuthModal;
