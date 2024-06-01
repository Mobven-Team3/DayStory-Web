import React from 'react';
import './footer-scss/_footer.scss';

// images
import logo from '../../../src/assets/images/daystory-logo.png';
import apple from '../../assets/images/apple.png';
import google from '../../assets/images/google.png';

// icons


const Footer = () => {


    return (

        <footer className='footer'>
        <div className="footer__logo">
            <img className="footer__logo-img" src={logo} alt="daystory-logo" />
            <p className="footer__logo-text">Day<span>Story</span></p>
        </div>
        <div className="footer__mobil">
            <p className="footer__mobil-text">Mobil Uygulama İndir</p>
            <div className="footer__mobil-images">
                <img src={google} alt="googleplay"/>
                <img src={apple} alt="appleplay" />
            </div>
        </div>
        <div className='footer__contact'>
                <div className='footer__contact-text'> İletişim
                <div className='footer__contact-phone'>+90 000 000 00 00</div> 
                <div className='footer__contact-mail'>daystory@mail.com</div>  
            </div>

        </div>
    </footer>

    );
};

export default Footer;





