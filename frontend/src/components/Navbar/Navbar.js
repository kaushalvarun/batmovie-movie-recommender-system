import React from 'react';
import './Navbar.css';
import BeltCompartment from './BeltCompartment';

function Navbar() {
  return (
    <nav className="utility-belt">
      <BeltCompartment page="Home" link="/" />
      <BeltCompartment page={<>About<br/>Me</>}  link="/about" />
      <BeltCompartment page={<>Tech<br/>Stack</>} link="/tech-stack" />
    </nav>
  );
}

export default Navbar;
