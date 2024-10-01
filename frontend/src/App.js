import React from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './About';
import Home from './Home';
import TechStack from './TechStack';

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/about", element: <About/> },
    { path: "/tech-stack", element: <TechStack /> }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router}>
      </RouterProvider>
    </div>
  );
}

export default App;
