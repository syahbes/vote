import React from "react";
import logo from "../assets/logo.png";
import mail from "../assets/mail.png";
import vector from "../assets/vector.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="tomi" className="logo" />
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
            <img src={mail} alt="mail" />
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

const styles = `
  .footer {
    color: #fff;
    padding: 40px 20px;
    font-family: Arial, sans-serif;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-logo .logo {
    width: 100px;
  }

  .footer-links {
    display: flex;
    gap: 40px;
  }

  .link-column {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .link-column a {
    color: #fff;
    text-decoration: none;
    font-size: 14px;
  }

 .email-us {
    padding: 20px;
    max-width: 300px;
    position: relative;
    text-align: start;
  }

  .email-us::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 5px;
    border: 2px solid transparent;
    background: linear-gradient(135deg, var(--primary-color) 30%, var(--background-color) 45%) border-box;
    
    -webkit-mask: 
      linear-gradient(#fff 0 0) padding-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    pointer-events: none;
  }

  .mail-logo {
    width: 50px;
    height: 50px;
    background-color: #FF1493;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    padding: 5px;
  }


  .email-us h3 {
    margin: 10px 0;
  }
.email-text {
 display: flex;
 flex-direction: row;
 gap: 10px;
}

  .email-us p {
    font-size: 14px;
    margin-bottom: 20px;
  }

  .vector-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 20px auto 0;
    padding-top: 20px;
    border-top: 1px solid #333;
    font-size: 12px;
  }

  .footer-legal {
    display: flex;
    gap: 10px;
  }

  .footer-legal a {
    color: #fff;
    text-decoration: none;
  }

  .separator {
    color: #333;
  }

  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      gap: 30px;
    }

    .footer-links {
      flex-direction: column;
    }

    .email-us {
      max-width: 100%;
    }

    .footer-bottom {
      flex-direction: column;
      gap: 10px;
      text-align: center;
    }
  }
`;

export default () => (
  <>
    <style>{styles}</style>
    <Footer />
  </>
);
