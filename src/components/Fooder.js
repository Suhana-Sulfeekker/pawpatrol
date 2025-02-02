import React from "react";
import "./Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Emergency Helplines</h3>
        <p>Animal Rescue: <strong>0471-2302283</strong></p>
        <p>Contact Mail: <strong>directorah.ker@nic.in</strong></p>
        <p>Municipal Corporation: <strong>+91 87654 32109</strong></p>
        <p>Police Helpline: <strong>100</strong></p>

        <h3>Important Links</h3>
        <ul>
          <li><a href="https://www.ndtv.com/" target="_blank" rel="noopener noreferrer">NDTV News</a></li>
          <li><a href="https://www.bbc.com/" target="_blank" rel="noopener noreferrer">BBC News</a></li>
          <li><a href="https://timesofindia.indiatimes.com/" target="_blank" rel="noopener noreferrer">Times of India</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
