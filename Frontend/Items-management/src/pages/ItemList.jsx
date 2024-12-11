import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Import CSS for Header

const Header = () => {
    return ( <
        header className = "header" >
        <
        div className = "header__content" >
        <
        h1 > Items Stock Management System < /h1> {/ * Corrected the < h > tag * /} <
        nav className = "header__nav" >
        <
        ul className = "header__nav-list" > { /* Example navigation links */ } <
        li >
        <
        Link to = "/" > Home < /Link> <
        /li> <
        li >
        <
        Link to = "/about" > About < /Link> <
        /li> <
        li >
        <
        Link to = "/contact" > Contact < /Link> <
        /li> <
        /ul> <
        /nav> <
        /div> <
        /header>
    );
};

export default Header;