import { useState, useRef } from "react";
import axios from "axios";
// Assuming you have a style.css file for basic styling
import './style.css'; // Don't forget to import your CSS

function ResumeAnalyzer() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [matchScore, setMatchScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Renamed from isSubmitting
  const [error, setError] = useState(""); // State for displaying specific errors

  const resultRef = useRef(null); // Ref for scrolling to result

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setResult(""); // Clear previous result
    setMatchScore(null); // Clear previous score

    if (!resume || !jobDescription.trim()) { // .trim() to catch empty strings with only whitespace
      setError("Please upload a resume and enter a job description.");
      // alert("Please upload a resume and enter job description."); // Prefer UI message over alert
      return;
    }

    setIsLoading(true); // Set loading true
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await axios.post("http://localhost:8080/api/match", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Your backend returns 'message' and 'matchScore'
      // Use response.data.message for 'result' as per your backend
      setResult(response.data.message || "Analysis complete."); // Fallback message
      setMatchScore(response.data.matchScore);

      // Smooth scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Error uploading:", error);
      // More detailed error feedback
      if (error.response) {
        // Server responded with an error (e.g., 400, 500)
        setError(error.response.data.error || `Server error: ${error.response.status}`);
      } else if (error.request) {
        // Request was made but no response received (e.g., network down, backend not running)
        setError("Network error: No response from server. Is the backend running?");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(`Error: ${error.message}`);
      }
      setResult(""); // Ensure result is clear on error
      setMatchScore(null);
    } finally {
      setIsLoading(false); // Set loading false regardless of success or error
    }
  };

  return (
    <div className="container">
      <h2>Smart Resume Analyzer</h2>
      <form onSubmit={handleSubmit} className="analyzer-form"> {/* Added class for styling */}
        <div className="form-group"> {/* Added for better layout/styling */}
          <label htmlFor="resumeFile">Upload Resume (PDF):</label>
          <input
            type="file"
            id="resumeFile" // Use a more specific ID than just "resume"
            name="resume" // Good practice to include name
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
            required // Add HTML5 required validation
          />
        </div>
        <div className="form-group"> {/* Added for better layout/styling */}
          <label htmlFor="jobDescription">Job Description:</label>
          <textarea
            id="jobDescription" // Use the same ID as the state name for clarity
            name="jobDescription" // Good practice to include name
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows="5"
            required // Add HTML5 required validation
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Analyzing...' : 'Analyze'} {/* Show loading state on button */}
        </button>

        {error && <p className="error-message">{error}</p>} {/* Display specific error messages */}
      </form>

      {/* Result Display */}
      {(result || (matchScore !== null && typeof matchScore === 'number')) && ( // Only show if there's a result or score
        <div
          ref={resultRef}
          className="result-box" 
        >
          {result && (
            <>
              <strong>Result:</strong> {result}
              <br />
            </>
          )}
          {matchScore !== null && typeof matchScore === 'number' && ( // Defensive check for matchScore
            <>
              <strong>Match Score:</strong> {matchScore.toFixed(2)}%
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ResumeAnalyzer;