import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../../../src/assets/images/daystory-logo.png';
import './navbar-scss/nabvar.css';

const NavigationBar = () => {
    const [activePage, setActivePage] = useState('');

    const handlePageChangeGallary = (page) => { 
        setActivePage(page);
    };

    return (
        <div className='navigation'>
            <nav className="nav">
                <div className="nav__logo">
                    <img className="nav__logo-img" src={logo} alt="daystory-logo" />
                    <p className="nav__logo-text">Day<span>Story</span></p>
                </div>
                <div className="nav__items">
                    <p
                        to="/gallary"
                        className={`nav__item ${activePage === 'gallery' ? 'active' : ''}`} 
                        onClick={() => handlePageChangeGallary('gallery')} 
                    >
                        Galeri
                    </p>
                    <p
                        to="/deneme" 
                        className={`nav__item ${activePage === 'bugun' ? 'active' : ''}`} 
                        onClick={() => handlePageChangeGallary('bugun')}
                    >
                        Bu Gün
                    </p>
                    <p
                        to="/profile" 
                        className={`nav__item ${activePage === 'profile' ? 'active' : ''}`} 
                        onClick={() => handlePageChangeGallary('profile')} 
                    >
                        <FaUserCircle size={30} />
                    </p>
                </div>
            </nav>
        </div>
    );
};

export default NavigationBar;


