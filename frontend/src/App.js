import React, { useState } from 'react';
import './App.css';

function App() {
  const validCategories = [
    'business',
    'technology',
    'sports',
    'entertainment',
    'health',
    'science',
    'general',
    'politics'
  ];

  const [keyword, setKeyword] = useState('');
  const [newsItems, setNewsItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCategoryClick = (category) => {
    setKeyword(category);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const normalizedKeyword = keyword.toLowerCase().trim();
    if (!validCategories.includes(normalizedKeyword)) {
      setError('Please select a valid category from the list');
      return;
    }
    
    setLoading(true);
    setError('');
    setNewsItems(null);
    
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/news-summary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword: normalizedKeyword }),
      });
      
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setNewsItems(data);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error fetching news summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-content">
          <h1>
            <span className="nav-icon">📰</span>
            NewsAI Summary
            <span className="beta-tag">BETA</span>
          </h1>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#categories">Categories</a>
            <a href="#news" className="nav-button">Latest News</a>
          </div>
        </div>
      </nav>
      
      <main className="main-content">
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-icon-container">
              <div className="hero-icon">🤖</div>
              <div className="hero-icon-bg"></div>
            </div>
            <h2>Stay Informed with <span className="highlight">AI-Powered</span> News</h2>
            <p className="subtitle">Experience news differently with our AI-driven summaries from trusted global sources</p>
            <div className="hero-features" id="features">
              <div className="feature">
                <span className="feature-icon">⚡</span>
                <span>Real-time Updates</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🎯</span>
                <span>Smart Filtering</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🌐</span>
                <span>Global Coverage</span>
              </div>
            </div>
          </div>
          <div className="hero-decoration"></div>
        </div>

        <div className="container">
          <section id="categories" className="categories-section">
            <h3 className="section-title">Select a Category</h3>
            <div className="categories-container">
              {validCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`category-button ${keyword === category ? 'active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          <form onSubmit={handleSubmit} className="search-form">
            <div className="input-group">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter a category (e.g., technology, sports, business)"
                required
                className="input-field"
              />
              <button type="submit" disabled={loading} className="submit-button">
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    <span>Generate Summary</span>
                    <span className="button-icon">→</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}
          
          {loading && (
            <div className="loader">
              <div className="loader-spinner"></div>
              <span>Fetching latest news...</span>
            </div>
          )}
          
          {newsItems && newsItems.length > 0 && (
            <div className="news-container" id="news">
              <div className="news-header">
                <h3>Latest News</h3>
                <span className="category-tag">{keyword}</span>
              </div>
              <div className="news-items">
                {newsItems.map((item, index) => (
                  <div key={index} className="news-item">
                    <h4 className="news-title">{item.title}</h4>
                    <p className="news-description">{item.description}</p>
                    <div className="news-item-footer">
                      <span className="news-number">#{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="nav-icon">📰</span>
            NewsAI Summary
          </div>
          <p>Transforming News Consumption with AI • © 2024</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
