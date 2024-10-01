import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './TechStack.css'; 

function TechStack() {
  return (
    <div className="App">
      <Navbar />
      <div className="tech-stack-container">
        <h1>Tech Stack</h1>
        <p><b>Frontend: </b> React.js, HTML, CSS</p>
        <p><b>Backend:</b> Flask</p>
        <p><b>Machine Learning:</b> Cosine Similarity for content based filtering</p>
      </div>
      <Footer />
    </div>
  );
}

export default TechStack;
