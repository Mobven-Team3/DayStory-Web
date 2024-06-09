import React from 'react';
import './footer-scss/_footer.scss';
import { Email, Phone } from '@mui/icons-material'; // Material-UI'den gerekli ikonları ekliyoruz

// images
import logo from '../../../src/assets/images/daystory-logo.png';
import apple from '../../../src/assets/images/apple.png';
import google from '../../../src/assets/images/google.png';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer__logo">
                <img className="footer__logo-img" src={logo} alt="Daystory logo" />
                <p className="footer__logo-text">Day<span>Story</span></p>
            </div>
            <div className="footer__mobil">
                <p className="footer__mobil-text">Mobil Uygulama İndir</p>
                <div className="footer__mobil-images">
                    <img src={google} alt="Google Play'den indir" />
                    <img src={apple} alt="Apple Store'dan indir" />
                </div>
            </div>
            <div className='footer__contact'>
                <div className='footer__contact-text'>
                    İletişim
                </div>
                <div className='footer__contact-phone'>
                    <Phone /> 
                    +90 000 000 00 00
                </div>

                <div className='footer__contact-mail'>
                    <Email />
                    daystory@mail.com
                </div>
            </div>
        </footer>
    );
};

export default Footer;
