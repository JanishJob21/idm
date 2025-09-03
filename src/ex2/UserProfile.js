import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = ({ user = {}, onLogout }) => {
  const localAvatar = 'https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?semt=ais_hybrid&w=740';
  const navigate = useNavigate();
  
  // Default to guest user if no user data
  const { name, email, avatar } = user || {};
  let displayName = name || 'Guest User';
  
  if (!name && email) {
    displayName = email.split('@')[0];
  }

  const handleLogout = () => {
    if (onLogout) onLogout();
    localStorage.removeItem('ex2User');
    navigate('/ex2');
  };

  return (
    <div className="user-profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>Welcome! {displayName}</h2>
        </div>
        
        <div className="profile-avatar-container">
          <img 
            src={avatar || localAvatar} 
            alt={displayName} 
            className="profile-avatar"
          />
          {email && <p className="profile-email">{email}</p>}
        </div>
        
        <div className="profile-details">
          <div className="profile-field">
            <span className="field-label">Name:</span>
            <span className="field-value">{displayName}</span>
          </div>
          
          {email && (
            <div className="profile-field">
              <span className="field-label">Email:</span>
              <span className="field-value">{email}</span>
            </div>
          )}
          
          <button 
            className="logout-button"
            onClick={handleLogout}
          >
            {email ? 'Log Out' : 'Back to Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
