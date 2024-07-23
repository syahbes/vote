import React from "react";
import "./index.css";

import logo from "/icons/logo.png";
import vector from "/icons/vector.png";
import mail from "/icons/mail.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <a href="https://tomi.com">
            <img src={logo} alt="tomi" className="logo" />
          </a>
        </div>
        <div className="footer-links">
          <div className="link-column">
            <span className="link-title">Solutions</span>
            <a href="https://tomi.com/browser" target="_blank" rel="noreferrer">
              Browser
            </a>
            <a
              href="https://domains.tomi.com/"
              target="_blank"
              rel="noreferrer">
              Domains
            </a>
            <a href="https://tomi.com/wallet" target="_blank" rel="noreferrer">
              Wallet
            </a>
            <a href="https://dao.tomi.com/" target="_blank" rel="noreferrer">
              DAO
            </a>
          </div>
          <div className="link-column">
            <span className="link-title">Community</span>
            <a href="https://twitter.com/tomipioneers">X</a>
            <a href="https://t.me/tomipioneers">TG Announcement</a>
            <a href="https://t.me/tomi_official_chat">TG Group</a>
            <a href="https://discord.com/invite/tomipioneers">Discord</a>
            <a href="https://www.reddit.com/r/tomipioneers/?rdt=51853">
              Reddit
            </a>
            <a href="https://tomiarmy.com/">TomiArmy</a>
          </div>
          <div className="link-column">
            <span className="link-title">Education</span>
            <a href="https://tomi.com/news">Blog</a>
            <a href="https://medium.com/tomipioneers">Medium</a>
            <a href="https://www.youtube.com/@tomipioneers">Youtube</a>
          </div>
        </div>
        <div className="email-us">
          <div className="mail-logo">
            <a href="mailto:tomiteam@proton.me">
              <img src={mail} alt="mail" />
            </a>
          </div>
          <h3>Email Us</h3>
          <div className="email-text">
            <p>
              Send your questions or suggestions securely via our encrypted
              email for prompt support and feedback.
            </p>
            <div className="vector-logo">
              <img src={vector} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 tomi, all rights reserved.</p>
        <div className="footer-legal">
          <a href="https://tomi.com/useragreement">Terms Of Use</a>
          <span className="separator">|</span>
          <a href="https://tomi.com/privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
