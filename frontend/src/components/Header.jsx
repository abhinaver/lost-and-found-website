import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ setSearchQuery }) => {
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
            placeholder="Search by name, location, description, or date..."
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
        </div>

        <div className="nav-container">
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/list-item">List an Item</Link>
          </nav>
          <Link to="/login" className="login-btn">Login</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
