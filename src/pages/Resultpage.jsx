import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import './ResultPage.css';

// Framer Motion variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};
const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

function ResultPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { matchScore, matchedSkills, unmatchedSkills, jobDescription } = location.state || {};

    if (!location.state) {
        return (
            <div className="result-page-wrapper">
                <div className="result-page-content">
                    <h1>No Results Found</h1>
                    <p>Please go back and upload a resume to get a score.</p>
                    <button className="action-btn primary" onClick={() => navigate('/analyze')}>
                        Upload a Resume
                    </button>
                </div>
            </div>
        );
    }
    
    // New function to handle the LinkedIn search
    const handleFindJobsOnLinkedIn = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/find-linkedin-jobs', {
                jobDescription: jobDescription
            });
            const linkedinUrl = response.data;
            window.open(linkedinUrl, '_blank');
        } catch (error) {
            console.error("Error generating LinkedIn URL:", error);
            alert("Failed to generate LinkedIn search link. Please try again.");
        }
    };

    const handleAnalyzeAnotherClick = () => navigate('/analyze');
    const handleGoHomeClick = () => navigate('/');

    return (
        <div className="result-page-wrapper">
            <div className="result-page-content">
                <motion.div
                    className="result-card-container"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 className="result-title" variants={itemVariants}>
                        Your Resume Analysis
                    </motion.h1>

                    {matchScore !== null && (
                        <motion.div className="match-score-section" variants={itemVariants}>
                            <div className="score-circle" style={{ "--score": `${matchScore}%` }}>
                                <span className="score-value">{matchScore}%</span>
                            </div>
                            <p className="score-label">Match Score</p>
                        </motion.div>
                    )}

                    {matchedSkills && matchedSkills.length > 0 && (
                        <motion.div className="result-section" variants={itemVariants}>
                            <h3>Matched Skills </h3>
                            <div className="skill-tags">
                                {matchedSkills.map((skill, index) => (
                                    <span key={index} className="skill-tag matched">{skill}</span>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {unmatchedSkills && unmatchedSkills.length > 0 && (
                        <motion.div className="result-section" variants={itemVariants}>
                            <h3>Missing Skills</h3>
                            <div className="skill-tags">
                                {unmatchedSkills.map((skill, index) => (
                                    <span key={index} className="skill-tag missing">{skill}</span>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* New button for the LinkedIn search */}
                    <motion.div className="result-section job-search-section" variants={itemVariants}>
                        <h3>Find Opportunities on LinkedIn</h3>
                        <p>Search for jobs and internships on LinkedIn based on your job title.</p>
                        <button className="action-btn primary" onClick={handleFindJobsOnLinkedIn}>
                            Search on LinkedIn
                        </button>
                    </motion.div>

                    <motion.div className="result-actions" variants={itemVariants}>
                        <button className="action-btn primary" onClick={handleAnalyzeAnotherClick}>
                            Upload Another Resume
                        </button>
                        <button className="action-btn secondary" onClick={handleGoHomeClick}>
                            Go to Home
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default ResultPage;