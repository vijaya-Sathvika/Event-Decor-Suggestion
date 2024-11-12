import React from 'react';
import './NavBar.css';

const NavBar = ({ onCategorySelect }) => {
  const categories = [
    'Wedding', 'Birthday', 'Anniversary', 
    'Festival', 'Baby Shower', 'House Warming'
  ];

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <a href="#" onClick={() => onCategorySelect('')}>Home</a> 
        </li>
        {categories.map((category) => (
          <li key={category} className="navbar-item">
            <a href="#" onClick={() => onCategorySelect(category)}>{category.charAt(0).toUpperCase() + category.slice(1)}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;