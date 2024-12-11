import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "../styles/Navbar.css";

const App = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>
              We are your one-stop shop for all your tech accessories needs. We
              offer the best gadgets at the best prices!
            </p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">New Releases</a></li>
              <li><a href="#">Today's Deals</a></li>
              <li><a href="#">Customer Service</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: support@maserustore.com</p>
            <p>Phone: +266 22340</p>
          </div>
          
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <FaFacebookF size={24} />
              </a>
              <a href="#" className="social-icon">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="social-icon">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="social-icon">
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Maseru Tech Store. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
