// src/components/Footer.jsx

import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Smart Resume Analyzer. All rights reserved.</p>
      <p className="company-info">
        Built with <span role="img" aria-label="React">⚛️</span> React, <span role="img" aria-label="Spring Boot">🍃</span> Spring Boot, & <span role="img" aria-label="AI">🤖</span> AI
      </p>
      <div className="footer-links">
        <a href="mailto:your.email@example.com">Contact Us</a> |
        <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">GitHub</a> |
        <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
      <div className="footer-small-links">
        <a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a>
      </div>
    </footer>
  );
}

export default Footer;