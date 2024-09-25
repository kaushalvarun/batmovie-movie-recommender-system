import React from 'react'
import './Navbar.css'
function BeltCompartment(props) {
    // Ensure click to belt compartment reflected to link contained inside it
    const handleCompartmentClick = (event, url) => {
        event.preventDefault();
        // Redirect to the specified URL
        window.location.href = url;
    };
    return (
        <div
            className="belt-compartment"
            onClick={(e) => handleCompartmentClick(e, props.link)}
        >
            <div className="rectangle first-rectangle"></div>
            <div className="rectangle second-rectangle"></div>
            <a href="/" className="belt-link">{props.page}</a>
        </div>
    );
}
export default BeltCompartment;