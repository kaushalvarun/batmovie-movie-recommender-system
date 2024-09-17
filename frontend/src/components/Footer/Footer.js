import React from 'react';
import './Footer.css';
function Footer() {
    const currYear = new Date().getFullYear();
    console.log(currYear);
    return (
        <header className='footer'>
            <p>Copyright @{currYear}</p>
        </header>
    );
}
export default Footer;