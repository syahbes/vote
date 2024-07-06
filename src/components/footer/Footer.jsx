import React from "react";
import './index.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src='/icons/logo.png' alt="tomi" className="logo" />
        </div>
        <div className="footer-links">
          <div className="link-column">
            <a href="#">Browser</a>
            <a href="#">Domains</a>
            <a href="#">Wallet</a>
            <a href="#">DAO</a>
          </div>
          <div className="link-column">
            <a href="#">X</a>
            <a href="#">TG Announcement</a>
            <a href="#">TG Group</a>
            <a href="#">Discord</a>
            <a href="#">Reddit</a>
            <a href="#">Linkedin</a>
            <a href="#">tomiArmy</a>
          </div>
          <div className="link-column">
            <a href="#">Blog</a>
            <a href="#">Medium</a>
            <a href="#">Youtube</a>
          </div>
        </div>
        <div className="email-us">
          <div className="mail-logo">
            <img src='/icons/mail.png' alt="mail" />
          </div>
          <h3>Email Us</h3>
          <div className="email-text">
            <p>
              Send your questions or suggestions securely via our encrypted
              email for prompt support and feedback.
            </p>
            <div className="vector-logo">
              <img src='/icons/vector.png' alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2023 tomi, all rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Terms Of Use</a>
          <span className="separator">|</span>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;