import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Logo from '../assets/Logo.png';
import DefaultAvatar from '../assets/default-avatar.png'; // Import default avatar

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown state
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      let userData = localStorage.getItem('userData');
      userData = JSON.parse(userData);
      setUser(userData);
    }
    else {
      setUser(null);
    }
  }, [isAuthenticated]);


  const handleLogout = () => {
    onLogout();
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={Logo} alt="PayTrack Logo" />
        <span>PayTrack</span>
      </div>
      <div className={`navbar-link ${menuOpen ? 'active' : ''}`}>
        {isAuthenticated ? (
          <>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/all-payments" onClick={() => setMenuOpen(false)}>All Payments</Link>
            <Link to="/breakout" onClick={() => setMenuOpen(false)}>Breakout</Link>
            <button className="logoutbtn" onClick={handleLogout}>Log Out</button>
            <div className="avatar-container" onClick={toggleDropdown}>
              <img
                src={DefaultAvatar}
                alt="User Avatar"
                className="user-avatar"
              />
              {isDropdownOpen && (
                <div className="profile-dropdown">
                  <p>Name: <strong>{user?.originalname || 'Guest'}</strong></p>
                  <p>Username: <strong>{user?.username || 'guest_user'}</strong></p>
                  <p>Email: <strong>{user?.email || 'guest@example.com'}</strong></p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          </>
        )}
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;
