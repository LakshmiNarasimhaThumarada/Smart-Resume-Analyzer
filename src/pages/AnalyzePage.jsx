// src/pages/AnalyzePage.jsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import './AnalyzePage.css';

function AnalyzePage() {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
    } else {
      setResume(null);
      alert('Please upload a PDF file.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
    // If you have a state for this, you can set it here
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
    } else {
      setResume(null);
      alert('Please drop a PDF file.');
    }
  };

  const clearResume = () => {
    setResume(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const clearJobDesc = () => {
    setJobDesc('');
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitting) return;
  if (!resume || !jobDesc) {
    alert('Please upload a resume and enter a job description.');
    return;
  }
  setIsSubmitting(true);

  const formData = new FormData();
  formData.append('resume', resume);
  formData.append('jobDescription', jobDesc);

  try {
    const response = await axios.post('http://localhost:8080/api/match', formData);
    
    // Extract ALL necessary fields from the response data
    const { 
      message, 
      matchScore, 
      matchedSkills, 
      unmatchedSkills 
    } = response.data;
    
    // Pass ALL the data in the state object
    navigate('/result', {
      state: { 
        result: message,
        matchScore: matchScore,
        matchedSkills: matchedSkills,
        unmatchedSkills: unmatchedSkills,
        jobDescription: jobDesc
      },
    });
  } catch (error) {
    console.error('Submission Error:', error);
    alert('Error: Could not connect to backend or process request.');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="analyze-page-wrapper">
      <NavBar />
      <div className="analyze-page-content">
        <motion.div
          className="analyze-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="analyze-title">Smart Resume Analyzer</h1>
          <form className="analyze-form" onSubmit={handleSubmit}>
            <div className="form-field-group">
              <div
                className={`drag-drop-area ${false ? 'drag-over' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                {resume ? (
                  <div className="file-info">
                    📄 {resume.name}
                    <button type="button" onClick={(e) => { e.stopPropagation(); clearResume(); }} className="clear-file-btn">
                      &times;
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <span className="upload-icon">⬆️</span>
                    <p>Drag & Drop your resume (PDF) here, or click to upload</p>
                  </div>
                )}
                <input
                  type="file"
                  id="resume"
                  accept=".pdf"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  required
                />
              </div>
              <div className="job-description-field">
                <label htmlFor="jobDesc" className="sr-only">Enter Job Description</label>
                <textarea
                  id="jobDesc"
                  rows="10"
                  placeholder="Paste the job description here for analysis..."
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  required
                />
                {jobDesc && (
                  <button type="button" onClick={clearJobDesc} className="clear-jobdesc-btn">
                    &times;
                  </button>
                )}
              </div>
            </div>
            <motion.button
              type="submit"
              className="analyze-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Analyzing...' : 'Analyze'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default AnalyzePage;