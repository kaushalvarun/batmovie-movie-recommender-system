import React from 'react';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';
import './App.css';

function Home() {

  return (
    <div className="App">
        <Header />
        <Body />
        <Navbar />
        <Footer />
    </div>
  );
}

export default Home;
