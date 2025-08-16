// src/pages/ResultPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // useLocation to get passed state
import { motion } from 'framer-motion'; // For animations

// Import common components for page structure
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../components/ResultCard.css'; // Import ResultCard component for consistent styling
// New CSS file for this page

// Framer Motion variants for staggered animation (consistent with other pages)
const containerVariants = {
  hidden: { opacity: 0 }, // Initial state: invisible
  visible: {
    opacity: 1, // Final state: visible
    transition: {
      staggerChildren: 0.1, // Delay between each child animation (e.g., each section)
      delayChildren: 0.2 // Initial delay before the first child starts animating
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 }, // Initial state for each individual item (e.g., section)
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } } // Final state for each item
};


function ResultPage() {
  // useLocation hook allows us to access state passed via navigate('/result', { state: ... })
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure the state. Provide default empty values if state is null or missing parts.
  // 'rawResult' holds whatever comes from AnalyzePage (string or object)
  const { result: rawResult, matchScore } = location.state || {};

  // For redesign, assume 'result' could be a structured object from backend.
  // If rawResult is just a string, we'll use it as the overallSummary.
  const parsedResult = typeof rawResult === 'string'
    ? {
        overallSummary: rawResult, // If backend only sends a string message
        matchedSkills: [],        // Default empty arrays
        missingSkills: [],
        actionItems: []
      }
    : rawResult; // If backend sends a structured object, use it directly

  // Helper function to get color based on match score
  const getScoreColor = (score) => {
    if (score >= 80) return '#28a745'; // Green for excellent
    if (score >= 60) return '#ffc107'; // Yellow for good
    return '#dc3545'; // Red for needs improvement
  };

  // Navigation handlers for buttons
  const handleAnalyzeAnotherClick = () => {
    navigate('/analyze'); // Go back to the analyze page
  };

  const handleGoHomeClick = () => {
    navigate('/'); // Go back to the home page
  };

  return (
    <div className="result-page-wrapper">
      <NavBar /> {/* Include NavBar for consistent page header */}
      <div className="result-page-content">
        <motion.div
          className="result-card-container"
          variants={containerVariants}
          initial="hidden" // Sets initial state for container
          animate="visible" // Animates container and its children into view
        >
          {/* Page Title */}
          <motion.h1 className="result-title" variants={itemVariants}>
            Your Resume Analysis
          </motion.h1>

          {/* Match Score Section */}
          {matchScore !== null && (
            <motion.div className="match-score-section" variants={itemVariants}>
              <div className="score-circle" style={{ borderColor: getScoreColor(matchScore) }}>
                <span className="score-value" style={{ color: getScoreColor(matchScore) }}>{matchScore}%</span>
              </div>
              <p className="score-label">Match Score</p>
            </motion.div>
          )}

          {/* Overall Summary Section */}
          {parsedResult.overallSummary && (
            <motion.div className="result-section" variants={itemVariants}>
              <h3>Overall Summary</h3>
              <p>{parsedResult.overallSummary}</p>
            </motion.div>
          )}

          {/* Matched Skills Section (conditionally rendered) */}
          {parsedResult.matchedSkills && parsedResult.matchedSkills.length > 0 && (
            <motion.div className="result-section" variants={itemVariants}>
              <h3>Matched Skills 💪</h3>
              <div className="skill-tags">
                {parsedResult.matchedSkills.map((skill, index) => (
                  <span key={index} className="skill-tag matched">{skill}</span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Missing Skills Section (conditionally rendered) */}
          {parsedResult.missingSkills && parsedResult.missingSkills.length > 0 && (
            <motion.div className="result-section" variants={itemVariants}>
              <h3>Skills to Develop 🤔</h3>
              <p className="section-description">Consider gaining experience or highlighting these skills:</p>
              <div className="skill-tags">
                {parsedResult.missingSkills.map((skill, index) => (
                  <span key={index} className="skill-tag missing">{skill}</span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Actionable Advice Section (conditionally rendered) */}
          {parsedResult.actionItems && parsedResult.actionItems.length > 0 && (
            <motion.div className="result-section" variants={itemVariants}>
              <h3>Actionable Advice 🚀</h3>
              <ul className="action-items-list">
                {parsedResult.actionItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Action Buttons - Show if any result data is present */}
          {(parsedResult.overallSummary || matchScore !== null) && (
            <motion.div className="result-actions" variants={itemVariants}>
              <button className="action-btn primary" onClick={handleAnalyzeAnotherClick}>
                Analyze Another Resume
              </button>
              <button className="action-btn secondary" onClick={handleGoHomeClick}>
                Go Home
              </button>
            </motion.div>
          )}

          {/* Fallback message if no result data is found */}
          {(!parsedResult.overallSummary && matchScore === null) && (
            <motion.div className="no-result-message" variants={itemVariants}>
              <p>No analysis results found. Please go back to the analyze page and try again.</p>
              <button className="action-btn primary" onClick={handleAnalyzeAnotherClick}>
                Go to Analyze Page
              </button>
            </motion.div>
          )}

        </motion.div> {/* Closes result-card-container */}
      </div> {/* Closes result-page-content */}
      <Footer /> {/* Include Footer for consistency */}
    </div> // Closes result-page-wrapper
  );
}

export default ResultPage;