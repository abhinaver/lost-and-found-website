import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ setSearchQuery }) => {
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">
          <Link to="/">Lost & Found</Link>
        </h1>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search by name, location, or date..."
            onChange={(e) => setSearchQuery(e.target.value)} // ✅ Updates search query
          />
        </div>

        <div className="nav-container">
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/list-item">List an Item</Link>
          </nav>

          {username ? (
            <div className="profile-container">
              <div className="profile-icon" onClick={toggleDropdown}>
                {username.charAt(0).toUpperCase()}
              </div>

              {showDropdown && (
                <div className="profile-dropdown">
                  <div className="dropdown-username">{username}</div>
                  <Link to="/my-items">My Items</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
