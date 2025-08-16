// src/components/AINewsPage.jsx
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import './AINewsPage.css'; // We'll create this CSS file too

const AINewsPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // IMPORTANT: For production, you should NOT expose your API_KEY directly in client-side code.
    // Use a proxy server or environment variables configured at build time.
    // For this example, we'll use a placeholder.
    // You'd typically use process.env.REACT_APP_NEWS_API_KEY if using create-react-app
    // or import.meta.env.VITE_NEWS_API_KEY if using Vite.
    const NEWS_API_KEY = ''; // <<== REPLACE WITH YOUR ACTUAL KEY
    const API_BASE_URL = 'https://newsapi.org/v2/everything'; // For searching
    const QUERY = 'artificial intelligence OR machine learning OR generative AI'; // Keywords for AI news
    const LANGUAGE = 'en';
    const SORT_BY = 'publishedAt'; // Sort by most recent
    const PAGE_SIZE = 12; // Number of articles per page
    useEffect(() => {
        const fetchAINews = async () => {
            try {
                // Construct the URL for NewsAPI.org's /everything endpoint
                // NewsAPI.org's free tier requires 'q' parameter for /everything endpoint
                // and might have limitations on past articles.
                // For trending, 'top-headlines' is also an option but less specific to AI.
                const url = `${API_BASE_URL}?q=${encodeURIComponent(QUERY)}&language=${LANGUAGE}&sortBy=${SORT_BY}&pageSize=${PAGE_SIZE}&apiKey=${NEWS_API_KEY}`;

                const response = await fetch(url);

                if (!response.ok) {
                    // Check for HTTP errors (e.g., 401 Unauthorized, 404 Not Found, 429 Rate Limit)
                    if (response.status === 401) {
                        throw new Error('API Key invalid or missing. Please check your NewsAPI.org key.');
                    } else if (response.status === 429) {
                        throw new Error('Too many requests. You have hit your NewsAPI.org rate limit. Try again later.');
                    } else {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                }

                const data = await response.json();

                if (data.articles) {
                    setArticles(data.articles);
                } else {
                    setArticles([]); // No articles found
                }
            } catch (err) {
                console.error("Failed to fetch AI news:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAINews();
    }, []); // Empty dependency array means this effect runs once after the initial render

    if (loading) {
        return <div className="ai-news-container">Loading trending AI news...</div>;
    }

    if (error) {
        return <div className="ai-news-container error-message">Error: {error}</div>;
    }

    if (articles.length === 0) {
        return <div className="ai-news-container no-results">No trending AI news found at the moment. Please try again later.</div>;
    }

    return (
        <div className="ai-news-container">
            <NavBar/>
            <h1>Trending AI News</h1>
            <div className="ai-news-list">
                {articles.map((article, index) => (
                    <div key={article.url || index} className="ai-news-item">
                        {article.urlToImage && (
                            <img src={article.urlToImage} alt={article.title} className="ai-news-image" />
                        )}
                        <div className="ai-news-content">
                            <h2>{article.title}</h2>
                            {article.author && <p className="ai-news-author">By: {article.author}</p>}
                            {article.publishedAt && (
                                <p className="ai-news-date">
                                    Published: {new Date(article.publishedAt).toLocaleDateString()}
                                </p>
                            )}
                            <p className="ai-news-description">{article.description}</p>
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ai-news-read-more"
                            >
                                Read Full Article (Source: {article.source?.name || 'Unknown'})
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AINewsPage;