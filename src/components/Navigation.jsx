import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navigation.css';  

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/leads" className="navbar-link navbar-brand">
          Lead Management
        </Link>
        <Link to="/leads" className="navbar-link">
          Leads
        </Link>
        <Link to="/leads/new" className="navbar-link">
          New Lead
        </Link>
      </div>

      <div className="navbar-right">
        {user && (
          <span className="navbar-user">
            Hi, {user.email}
          </span>
        )}
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
