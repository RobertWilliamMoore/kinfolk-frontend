import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/kinfolk-logo.jpg';
import './Navigation.css';

function Navigation() {
  const navigate = useNavigate();
  
  const storedUser = localStorage.getItem('currentUser');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <header className="kinfolk-navbar">
      <div className="nav-brand-group" onClick={() => navigate('/home')}>
        <img src={logo} alt="Kinfolk Logo" className="nav-logo" />
        <span className="nav-title">KINFOLK</span>
      </div>
      
      {user && (
        <div className="nav-user-container">
          <div className="nav-user-info">
            <span className="welcome-label">Signed in as</span>
            <span className="username-display">{user.username}</span>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Navigation;