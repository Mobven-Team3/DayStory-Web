import React, { useState } from 'react';
import './footer-scss/footer.css';

// images

// icons


const Footer = () => {
    const [activePage, setActivePage] = useState('Galeri');

    const handlePageChange = (page) => {
        setActivePage(page);
    };

    return (

        <footer className='footer'>
            aysu
        </footer>

    );
};

export default Footer;

