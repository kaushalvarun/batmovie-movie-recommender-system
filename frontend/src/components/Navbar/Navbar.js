import React from 'react';
import './Navbar.css';

function Navbar() {
  const handleCompartmentClick = (event, url) => {
    event.preventDefault(); // Prevent default link behavior
    window.location.href = url; // Redirect to the specified URL
  };

  return (
    <nav className="utility-belt">
      <div 
        className="belt-compartment" 
        onClick={(e) => handleCompartmentClick(e, '/')}
      >
        <div className="rectangle first-rectangle"></div>
        <div className="rectangle second-rectangle"></div>
        <a href="/" className="belt-link">Home</a>
      </div>
      <div 
        className="belt-compartment" 
        onClick={(e) => handleCompartmentClick(e, '/about')}
      >
        <div className="rectangle first-rectangle"></div>
        <div className="rectangle second-rectangle"></div>
        <a href="/about" className="belt-link">About<br/>Me</a>
      </div>
      <div 
        className="belt-compartment" 
        onClick={(e) => handleCompartmentClick(e, '/tech-stack')}
      >
        <div className="rectangle first-rectangle"></div>
        <div className="rectangle second-rectangle"></div>
        <a href="/tech-stack" className="belt-link">Tech<br/>Stack</a>
      </div>
      <div 
        className="belt-compartment" 
        onClick={(e) => handleCompartmentClick(e, '/movies')}
      >
        <div className="rectangle first-rectangle"></div>
        <div className="rectangle second-rectangle"></div>
        <a href="/movies" className="belt-link">Movies</a>
      </div>
      <div 
        className="belt-compartment" 
        onClick={(e) => handleCompartmentClick(e, '/contact')}
      >
        <div className="rectangle first-rectangle"></div>
        <div className="rectangle second-rectangle"></div>
        <a href="/contact" className="belt-link">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;
