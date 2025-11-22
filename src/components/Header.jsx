/* Header.jsx */
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import logo from "../assets/Logo.png";
import dropdownIcon from "../assets/dropdown.png";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    alert("Logged out successfully!");
    navigate("/login");
  };

  const loggedIn = !!localStorage.getItem("userId");

  return (
    <header className="header">
      <div className="logo-section">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo" className="logo" />
        </Link>

        <img
          src={dropdownIcon}
          alt="menu"
          className={`dropdown-icon ${showMenu ? "rotate" : ""}`}
          onClick={toggleMenu}
        />

        {showMenu && (
          <div className="dropdown-menu">
            <Link to="/upload" onClick={() => setShowMenu(false)}>
              Color Palette Extractor
            </Link>
            <Link to="/custom" onClick={() => setShowMenu(false)}>
              Create Your Own Palette
            </Link>
            <Link to="/save" onClick={() => setShowMenu(false)}>
              Saved Palettes
            </Link>
          </div>
        )}
      </div>

      <nav className="nav">
        <ul>
          {localStorage.getItem("userId") ? (
            <>
              <li>
                <button
                  className="btn primary"
                  onClick={() => {
                    localStorage.removeItem("userId");
                    alert("Logged out successfully!");
                    window.location.href = "/login"; // refresh + redirect
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="login-link">
                  <button className="btn">Login</button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <button className="btn primary">Sign Up</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

    </header>
  );
}

export default Header;
