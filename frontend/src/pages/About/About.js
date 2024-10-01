import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './About.css';

function About() {
  return (
    <div className="About">
      <div className="about-container">
        <div className="left-side">
          <h1>About Me</h1>
          <section className="description">
            <p>
              Hello Everyone,
            </p>
            <p>
              I'm Varun Kaushal,
            </p>
            <p>
              I'm in my third year of studying Computer Science and Engineering at VIT University in Vellore.
            </p>
            <p>
              I'm currently exploring full-stack development with this app, using Flask and React. Having previously made apps with Flutter like todo app, food delivery app, with more projects in the works.
            </p>

          </section>
        </div>
        <div className="right-side">
          <h2>Inspiration for this project</h2>
          <p>
            I watch a lot of movies and TV shows, especially mysteries like Sherlock, Batman, and the Avengers. I've always wanted a good recommendation system, and this project will definitely be a real help.
          </p>
          <h2>My Portfolio</h2>
          <p>
            Check out my work at <a href="https://kaushalvarun.github.io/my-portfolio" target="_blank" rel="noopener noreferrer">my portfolio</a>.
          </p>
          <h2>Let's Connect!</h2>
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
