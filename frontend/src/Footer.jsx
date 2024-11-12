import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h3>POLICY INFO</h3>
          <ul>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Disclaimer</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>ABOUT COMPANY</h3>
          <ul>
            <li>About Us</li>
            <li>Event Decor Team</li>
            <li>Careers</li>
            <li>Testimonials</li>
            <li>News Room</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Event Decor BUSINESS</h3>
          <ul>
            <li>Decoration Services</li>
            <li>Corporate Service</li>
            <li>Affiliate Program</li>
            <li>Franchise</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>NEED HELP?</h3>
          <ul>
            <li>Contact Us</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>USEFUL LINKS</h3>
          <ul>
            <li>Quotes N Wishes</li>
            <li>Flower Astrology</li>
            <li>Article Hub</li>
            <li>Care Guide</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="footer-column subscribe">
          <h3>SUBSCRIBE</h3>
          <div className="subscribe-box">
            <input type="email" placeholder="Email" />
            <button>SUBMIT</button>
          </div>
          <p>Get updates on promotions and offers coupons.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          © 1994-2024 All rights reserved.
        </div>
        <div className="social-media">
          <span>Keep in touch</span>
          <div className="icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-pinterest"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;