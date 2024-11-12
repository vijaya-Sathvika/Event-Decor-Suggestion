import React, { useState, useEffect } from 'react';
import Header from './Header';
import MainContent from './MainContent';
import NavBar from './NavBar';
import Footer from './Footer';
import './App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to check if the user is authenticated (you can use session or a JWT token for this)
  const checkAuthentication = async () => {
    try {
      const response = await fetch('https://event-decor-suggestion-backend.onrender.com/api/check-auth'); // Create this API endpoint in your backend
      // const response = await fetch('/api/check-auth'); // Create this API endpoint in your backend
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      setIsAuthenticated(false);
    }
  };

  // Use useEffect to check authentication when the component mounts
  useEffect(() => {
    checkAuthentication();
  }, []);

  const fetchImages = async (searchTerm) => {
    const apiKey = 'iW8KYQUreCy5Bv4UreXPBmvADX1L3nFUVXtPsu5SX58J08arPznjvhmr';
    setLoading(true);
    setError(null);

    try {
      console.log(`Fetching images for: ${searchTerm}`);
      const response = await fetch(`https://api.pexels.com/v1/search?query=${searchTerm}&per_page=5`, {
        headers: {
          Authorization: apiKey,
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      setImages(data.photos);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch images. Please try again.');
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSelectedCategory('');
    fetchImages(term);
  };

  const handleCategorySelect = (category) => {
    console.log(`Category selected: ${category}`);
    setSelectedCategory(category);
    fetchImages(category);
  };

  if (!isAuthenticated) {
    return (
      <div>
        <h2>Please log in to access the application.</h2>
        <a href="/">Go to Sign In</a>
      </div>
    );
  }

  return (
    <div className="App">
      <Header onSearch={handleSearch} />
      <NavBar onCategorySelect={handleCategorySelect} />
      {error && <div className="error-message">{error}</div>}
      <MainContent 
        images={images} 
        loading={loading} 
        selectedCategory={selectedCategory} 
        onCategorySelect={handleCategorySelect}
      />
      <Footer />
    </div>
  );
};

export default App;
