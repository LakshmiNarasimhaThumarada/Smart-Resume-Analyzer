// src/components/NavBar.jsx
import { Link } from 'react-router-dom';
import './NavBar.css'; // We will create this CSS file next

// Assuming your logo is in the public folder and named 'smart-resume-logo.png'
const LOGO_PATH = '/logo.png'; // Make sure this path matches your logo file

function NavBar() {
  // Placeholder for actual login status/user data
  const isLoggedIn = false; // You'll integrate actual auth logic here later
  const userName = "User"; // Placeholder

  return (
    <nav className="navbar">
      {/* Left Section: Logo */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo-link">
          <img src={LOGO_PATH} alt="Smart Resume Analyzer Logo" className="navbar-logo" />
        </Link>
      </div>

      {/* Middle Section: Navigation Links */}
      <ul className="navbar-middle">
        <li><Link to="/" className="navbar-link">Home</Link></li>
        <li><Link to="/job-descriptions" className="navbar-link">Job Roles</Link></li>
        <li><Link to="/ai-news-page" className="navbar-link">Trending AI News</Link></li>
      </ul>

      {/* Right Section: Login Details */}
 
    </nav>
  );
}

export default NavBar;