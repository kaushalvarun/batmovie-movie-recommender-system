import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './TechStack.css'; 

function TechStack() {
  return (
    <div className="main-content-body">
      <Navbar />
      <div className="tech-stack-container">
        <h1>🔧 Tech Stack</h1>
        <p><b>Frontend: </b> React.js, delivering a smooth and dynamic user experience with fast rendering and component-based architecture.</p>
        <p><b>Backend:</b> Flask, to handle HTTP requests from the React frontend, provide API endpoints for movie recommendations</p>
        <p><b>Machine Learning:</b> Cosine Similarity for content based filtering</p>
        <p><b>API:</b> TMDB API for rich movie data</p>
        <p><b>Deployment:</b> Cloud-hosted on Render </p>
      </div>
    </div>
  );
}

export default TechStack;
