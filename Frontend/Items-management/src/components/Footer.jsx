import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>© Maseru 2024 TechStore. All rights reserved.</p>
            <div>
                <a href="/home">Maseru Tech Store</a> | <a href="/contact">Contact Manager</a>
            </div>
        </footer>
    );
};

export default Footer;
