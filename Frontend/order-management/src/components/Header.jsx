import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>Order Management</h1>
      <nav className="header-nav">
        <Link to="/orders" className="header-link">
          Orders
        </Link>
        <Link to="/" className="header-link">
          Create Order
        </Link>
        <Link to="/manage-orders" className="header-link">
          Manage Orders
        </Link>
      </nav>
    </header>
  );
};

export default Header;
