// src/pages/LandingPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import LightRays from '../components/LightRays';
import Footer from '../components/Footer';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Light Rays Background (FIXED) */}
      <div className="light-rays-fixed-background">
        <LightRays
          raysOrigin="top-center"
          raysColor="#6495ED"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />
      </div>

      {/* Main Content Wrapper (THIS WILL BE THE SCROLLING PART) */}
      <div className="landing-page-content-wrapper">

        <header className="header">
          <div className="header-inner">
           
            <h1>Smart Resume Analyzer</h1>
          </div>
        </header>

        <main className="main-section"> {/* This main-section now contains all central content blocks */}
          <section className="hero-card">
            <h2 className="hero-heading">Optimize Your Resume with AI</h2>
            {/* NEW: Sub-Headline */}
            <p className="hero-subheadline">
              Unleash the power of AI to match your resume with top job roles instantly. Get personalized feedback and actionable insights tailored to your skills.
            </p>
            <button className="cta-button" onClick={() => navigate('/analyze')}>
              Get Started
            </button>
            {/* NEW: Optional CTA Supporting Line */}
            <p className="cta-supporting-line">
              Trusted by students, job seekers, and professionals to land interviews faster.
            </p>
          </section>

          {/* NEW & EXPANDED: Additional Features Section */}
          <section className="features-section">
            <h3 className="section-heading">Key Features</h3> {/* Add a heading for features */}
            <div className="features-grid"> {/* Grid container for features */}
                <div className="feature-card">
                <div className="feature-icon">🧠</div>
                <h3>AI-Powered Matching</h3>
                <p>Analyze your resume using AI to match with job roles instantly.</p>
                </div>

                <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Skill-Based Scoring</h3>
                <p>Get a detailed match score based on your technical and project skills.</p>
                </div>

                {/* NEW: Feature 3 */}
                <div className="feature-card">
                    <div className="feature-icon">📊</div>
                    <h3>In-Depth Resume Analysis</h3>
                    <p>Discover missing skills, keyword gaps, and optimization tips that improve your job match rate.</p>
                </div>

                {/* NEW: Feature 4 */}
                <div className="feature-card">
                    <div className="feature-icon">🔍</div>
                    <h3>Real-Time Job Role Matching</h3>
                    <p>Instantly compare your resume against trending job descriptions and see how well you fit.</p>
                </div>

                {/* NEW: Feature 5 */}
                <div className="feature-card">
                    <div className="feature-icon">🗂️</div>
                    <h3>Track & Compare Resume Results</h3>
                    <p>Access your previous analyses, track improvements, and compare match scores over time.</p>
                </div>

                {/* NEW: Feature 6 */}
                <div className="feature-card">
                    <div className="feature-icon">🤖</div>
                    <h3>Powered by Machine Learning</h3>
                    <p>Our backend uses TF-IDF + Cosine Similarity and keyword prioritization to analyze your skills deeply.</p>
                </div>
            </div> {/* End features-grid */}
          </section>

          {/* NEW: How It Works Section */}
          <section className="how-it-works-section">
            <h3 className="section-heading">🚀 How It Works</h3>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <h4>Upload Your Resume</h4>
                <p>Drag and drop your resume or upload it directly from your device.</p>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <h4>Enter Desired Job Role</h4>
                <p>Example: Frontend Developer, Data Analyst, DevOps Engineer etc.</p>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <h4>Get Match Score & Suggestions</h4>
                <p>View how well your resume fits and get suggestions to improve instantly.</p>
              </div>
            </div>
          </section>

          {/* NEW: Testimonials Section */}
          <section className="testimonials-section">
            <h3 className="section-heading">What Our Users Say</h3>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <p className="quote">“Helped me optimize my resume before applying for internships!”</p>
                <p className="author">— Anjali R., B.Tech Final Year</p>
              </div>
              <div className="testimonial-card">
                <p className="quote">“I landed two interviews after fixing skill gaps using Smart Resume Analyzer.”</p>
                <p className="author">— Rahul M., Backend Developer</p>
              </div>
              {/* Add more testimonials if desired */}
            </div>
          </section>

        </main> {/* Closes main-section */}

       

      </div> {/* Closes .landing-page-content-wrapper */}
    </>
  );
};

export default LandingPage;