 /* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "../Css/Sidebar.css";
import "../Css/Navbar.css";
import Image from "../Images/promotion.gif";
import Cart from "../Images/cart.gif";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [closing, setClosing] = useState(false);
  const [moveSearch, setMoveSearch] = useState(false);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  const handleSetActive = (index) => {
    setActiveLink(index);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleSearch = () => {
    if (showSearch) {
      setClosing(true);
      setTimeout(() => {
        setShowSearch(false);
        setClosing(false);
      }, 600);
    } else {
      setShowSearch(true);
      setClosing(false);
    }
    setMoveSearch(!moveSearch);
  };

  const handleSearchClick = (e) => {
    
    e.stopPropagation();
  };

  return (  
    <div className={`Navbar ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar">
        <a
          href="/"
          className={`sidebar-link ${activeLink === 1 ? "active" : ""}`}
          onClick={() => handleSetActive(1)}
        >
          Home
        </a>
        <a
          href="/Categories"
          className={`sidebar-link ${activeLink === 2 ? "active" : ""}`}
          onClick={() => handleSetActive(2)}
        >
          Categories
        </a>
        <a
          href="/Cart"
          className={`sidebar-link ${activeLink === 3 ? "active" : ""}`}
          onClick={() => handleSetActive(3)}
        >
          Cart
        </a>
        <a
          href="/Help"
          className={`sidebar-link ${activeLink === 4 ? "active" : ""}`}
          onClick={() => handleSetActive(4)}
        >
          Help Center
        </a>
        <a
          href="/FAQ"
          className={`sidebar-link ${activeLink === 5 ? "active" : ""}`}
          onClick={() => handleSetActive(5)}
        >
          FAQ
        </a>
        <a
          href="/Orders"
          className={`sidebar-link ${activeLink === 5 ? "active" : ""}`}
          onClick={() => handleSetActive(6)}
        >
          ORDERS
        </a>
      </div>
      <div className="left-section">
        <div className="menu-icon">
          <div
            href="#"
            className={`menu ${isSidebarOpen ? "open" : ""}`}
            onClick={toggleSidebar}
          >
            <span></span>
          </div>
        </div>
        <div className="logo">
          <img src={Image} alt="Logo" />
        </div>
      </div>

      <div className="right-section">
        <div
          className={`search-icon ${moveSearch ? "active" : ""}`}
          onClick={toggleSearch}
        >
          <span className="search-line main-line"></span>
          <span className="search-circle"></span>
          <span className="search-line second-line"></span>
          <div
            className={`search-container ${showSearch ? "show" : ""} ${closing ? "closing" : ""}`}
            onClick={handleSearchClick}  
          >
            {showSearch && (
              <input
                type="text"
                className="search-input"
                placeholder="Search for products..."
              />
            )}
          </div>
        </div>
        <div className="nav-links">
          <a
            href="#"
            className={`nav-link ${activeLink === 5 ? "active" : ""}`}
            onClick={() => handleSetActive(5)}
          >
            Home
          </a>
          <a
            href="/Categories"
            className={`nav-link ${activeLink === 6 ? "active" : ""}`}
            onClick={() => handleSetActive(6)}
          >
            Categories
          </a>
          <a
            href="/Orders"
            className={`nav-link ${activeLink === 7 ? "active" : ""}`}
            onClick={() => handleSetActive(7)}
          >
            Orders
          </a>
        </div>
        <div className="cart">
          <a href="/cart">
            <img src={Cart} alt="Cart" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
