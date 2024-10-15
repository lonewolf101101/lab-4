import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    navigate('/'); // Redirect to the login page after logout
  };

  const handleLogin = () => {
    navigate('/login'); // Redirect to the login page after
  }
  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo512.png" alt="Website Logo" />
        <h1 className="website-name">Laboratory-4</h1>
      </div>
      {user ? (
        <div className="user-info">
          <span className="username">{user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
      <div className="user-info">
      <button onClick={handleLogin}>login</button>
    </div> )}
    </header>
  );
};

export default Header;
