import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser, FiHome } from 'react-icons/fi';
import './Auth.css';

const Dashboard = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/ex10/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div className="user-avatar">
            <FiUser size={40} />
          </div>
          <h2>Welcome back, {currentUser?.name || 'User'}!</h2>
        </div>
        
        <div className="dashboard-content">
          <div className="dashboard-card-item">
            <FiHome className="dashboard-icon" />
            <div>
              <h3>Dashboard</h3>
              <p>You are now logged in to your personal dashboard</p>
            </div>
          </div>
          
          <div className="dashboard-actions">
            <button 
              onClick={handleLogout}
              className="auth-button logout-button"
            >
              <FiLogOut className="button-icon" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
