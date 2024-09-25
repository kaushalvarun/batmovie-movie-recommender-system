import React from 'react';
import './Footer.css';
function Footer() {
    const currYear = new Date().getFullYear();
    console.log(currYear);
    return (
        <footer className='footer'>
            <p>Created by Varun Kaushal,  &copy; {currYear}</p>
        </footer>
    );
}
export default Footer;