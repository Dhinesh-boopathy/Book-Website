import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Navbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/books');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  // Hide dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowDropdown(false); // Hide dropdown if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar mb-5 fixed-top">
      <div className="navbar-container">
        <Link className="navbar-brand"><i className="bi bi-book"></i></Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="navbar-link">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/books" className="navbar-link">Explore</Link>
          </li>
        </ul>
      </div>
      <ul className="nav-menu loginLink">
        {user ? (
          <>
            <li className="nav-item mt-1 dropdown-container">
              <span className="navbar-link user" onClick={toggleDropdown}>
                {user.username || 'Guest'}
                <i className="bi bi-caret-down-fill mx-1"></i>
              </span>
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/favorites" className="dropdown-item">Favorites</Link>
                  <Link to="/newbook" className="dropdown-item">Add new book</Link>
                  <Link to="/myfiles" className='dropdown-item'>My Files</Link>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </button>
                  
                </div>
              )}
            </li>
          </>
        ) : (
          <li className="nav-item">
            <Link to="/login" className="navbar-link mx-2">
              <i className="bi bi-box-arrow-in-left"></i> Login
            </Link>|
            <Link to="/signup" className="navbar-link mx-2">Signup</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
