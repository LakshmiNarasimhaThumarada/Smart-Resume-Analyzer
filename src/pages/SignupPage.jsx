// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import './SignupPage.css'; // We'll create this CSS file

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        setMessage(''); // Clear previous messages
        setMessageType('');

        if (!email || !password || !confirmPassword) {
            setMessage('All fields are required.');
            setMessageType('error');
            return;
        }

        if (password.length < 6) {
            setMessage('Password must be at least 6 characters long.');
            setMessageType('error');
            return;
        }

        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            setMessageType('error');
            return;
        }

        // In a real application, you would send this data to your backend API
        console.log('Signup data:', { email, password });

        // Simulate an API call
        setTimeout(() => {
            // Replace with actual backend call and response handling
            const isSignupSuccessful = Math.random() > 0.3; // Simulate success/failure

            if (isSignupSuccessful) {
                setMessage('Signup successful! Redirecting to login...');
                setMessageType('success');
                // In a real app, you'd redirect:
                // navigate('/login'); // If using useNavigate from react-router-dom
            } else {
                setMessage('Signup failed. Please try again.');
                setMessageType('error');
            }
        }, 1000);
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2>Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-label="Email Address"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            aria-label="Password"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            aria-label="Confirm Password"
                        />
                    </div>
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
                {message && (
                    <p className={`signup-message ${messageType === 'error' ? 'error-message' : 'success-message'}`}>
                        {message}
                    </p>
                )}
                <p className="login-link">
                Already have an account? <Link to="/login">Log In</Link> {/* This is line 102 */}
            </p>
            </div>
        </div>
    );
}

export default SignupPage;