import React from 'react';
import './footer-scss/footer.css';

// images
import logo from '../../../src/assets/images/daystory-logo.png';

// icons


const Footer = () => {


    return (

        <footer className='footer'>
            <div className="footer__logo">
                    <img className="footer__logo-img" src={logo} alt="daystory-logo" />
                    <p className="footer__logo-text">Day<span>Story</span></p>
            </div>
            <div className="footer__mobil">
                    <p className="footer__mobil-text"/>
                    <p className="footer__mobil-images"></p>
            </div>
        </footer>

    );
};

export default Footer;

