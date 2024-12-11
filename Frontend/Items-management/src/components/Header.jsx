// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Import CSS for Header

const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
         <h>Items Stock Management System</h>
        <nav className="header__nav">
          <ul className="header__nav-list">
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
