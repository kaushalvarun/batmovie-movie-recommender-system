import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import TechStack from './pages/TechStack/TechStack';
import Footer from './components/Footer/Footer';

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/about", element: <About/> },
    { path: "/tech-stack", element: <TechStack /> }
  ]);
  return (
    <div className="App">
      <div className="main-content-body">
        <RouterProvider router={router}>
        </RouterProvider>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
