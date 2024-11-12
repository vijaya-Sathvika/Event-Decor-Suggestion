import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); 
    return () => {
      clearTimeout(handler); 
    };
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (debouncedSearchTerm.trim()) {
      onSearch(debouncedSearchTerm); 
      setSearchTerm(''); 
    }
  };

  return (
    <header className="header">
      <div className="header-flex-container">
        <div className="logo">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJKSgDrXGCXUJB2i7WUSaG4gH6vcOruJVEtGDCE6tKmoM9T_pFketlLuYasSQMb27t-c0&usqp=CAU"
            alt="Logo"
          />
        </div>

        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search Decorations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button" type="submit">Search</button>
          </form>
        </div>

        <div className="icons">
          <div className="pin">
            <img
              src="https://illustoon.com/photo/12199.png"
              alt="Pin Icon"
            />
            <span>Pin</span>
          </div>
          <div className="login">
            <img
              src="https://t3.ftcdn.net/jpg/02/61/90/28/360_F_261902858_onbxqSHf193X4w7e8fdRH8vjjoT3vOVZ.jpg"
              alt="Login Icon"
            />
            <span>Login</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;