import React from 'react';
import './UserProfile.css';

const UserProfile = (props) => {
  const {
    name,
    email,
    avatar,
    address,
    phone,
    city,
    state,
    zip,
    onLogout
  } = props;
  // Use provided avatar, else use the given screenshot, else fallback
  // const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  const localAvatar = 'https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?semt=ais_hybrid&w=740';
  // const avatarSrc = avatar || localAvatar || defaultAvatar;
  // Use the part before @ in email as fallback username
  let displayName = name;
  if (!displayName && email) {
    displayName = email.split('@')[0];
  }
  if (!displayName) {
    displayName = 'Guest User';
  }
  return React.createElement(
    'div',
    { className: 'user-profile' },
    React.createElement('div', { style: { fontSize: 22, fontWeight: 700, color: '#27ae60', marginBottom: 8 } },
      `Welcome, ${displayName}!`
    ),
    React.createElement('img', {
      src: avatar || localAvatar,
      alt: displayName + ' avatar',
      className: 'user-avatar',
      style: { width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', marginBottom: 16 }
    }),
    React.createElement('h2', null, displayName),
    React.createElement('p', { className: 'user-email' }, email || ''),
    React.createElement('button', {
      className: 'logout-btn',
      style: { margin: '16px 0', padding: '8px 24px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 20, fontWeight: 600, cursor: 'pointer', fontSize: 16 },
      onClick: onLogout
    }, 'Log Out'),
    phone && React.createElement('p', { className: 'user-phone' }, phone),
    (address || city || state || zip) && React.createElement('p', { className: 'user-address' },
      [address, city, state, zip].filter(Boolean).join(', ')
    )
  );
};

export default UserProfile;
