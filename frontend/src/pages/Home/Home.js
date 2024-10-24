import React from 'react';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Body from '../../components/Body/Body';
import '../../App.css';

function Home() {

  return (
    <div className="main-content-body">
        <Header />
        <Body />
        <Navbar />
    </div>
  );
}

export default Home;
