import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function BeltCompartment(props) {
    return (
        <Link to={props.link} className="belt-link">
            <div className="belt-compartment">
                <div className="rectangle first-rectangle"></div>
                <div className="rectangle second-rectangle"></div>
                <div>{props.page}</div>
            </div>
        </Link>
    );
}

export default BeltCompartment;
