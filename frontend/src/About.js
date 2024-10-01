import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './About.css';

function About() {
  return (
    <div className="App">
      <div className="about-container">
        <div className="left-side">
          <h1>About Me</h1>
          <section className="description">
            <h2>Description</h2>
            <p>
              I interned at Copperbell Tech Solutions, and I'm currently in my third year of studying Computer Science and Engineering at VIT University in Vellore.
            </p>
            <p>
              As a Senior Core Committee member of ACM, I help organize various competitions and events. I'm passionate about software development, especially building apps.
            </p>
            <p>
              I'm currently exploring full-stack development with this app, using Flask and React. I've created a chatting app and a food delivery app, with more projects in the works.
            </p>
            <p>
              I also have a strong interest in cloud computing and emerging technologies, holding certifications in AWS Cloud Practitioner and Microsoft Azure AI Fundamentals.
            </p>
          </section>
        </div>
        <div className="right-side">
          <h2>Fun Fact</h2>
          <p>
            I watch a lot of movies and TV shows, especially mysteries like Sherlock, Batman, and the Avengers. I wanted recommendations, and this project will be a real help in that regard.
          </p>
          <h2>Portfolio</h2>
          <p>
            Check out my work at <a href="https://kaushalvarun.github.io/my-portfolio" target="_blank" rel="noopener noreferrer">my portfolio</a>.
          </p>
          <h2>Let's Talk!</h2>
          <p>
            Follow me on <a href="https://www.linkedin.com/in/kaushal-varun" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
          </p>
        </div>
      </div>
      <Navbar />
      <Footer />
    </div>
  );
}

export default About;
