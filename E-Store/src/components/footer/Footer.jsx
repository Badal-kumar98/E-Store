// Footer.js
import React from "react";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="website-name">
          <strong>E-Shopping</strong>
        </p>
        <div className="social-icons">
          <a
            href="https://www.facebook.com/profile.php?id=100088962691591"
            target="_blank"
            rel="noopener noreferrer"
            className="icon icon-facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com/mr_badal_3997/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon icon-instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://github.com/Badal-kumar98/Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="icon icon-github"
          >
            <FaGithub />
          </a>
        </div>
        <p className="copyright">
          &copy; 2024 Badal Kumar, E-Shopping. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
