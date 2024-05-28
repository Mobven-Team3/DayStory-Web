import React, { useState } from 'react';
import './navbar-scss/nabvar.css';

// images
import logo from '../../../src/assets/images/daystory-logo.png';

// icons
import { FaUserCircle } from 'react-icons/fa';


const NavigationBar = () => {
    const [activePage, setActivePage] = useState('Galeri');

    const handlePageChange = (page) => {
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
                        className={`nav__item ${activePage === 'Galeri' ? 'active' : ''}`}
                        onClick={() => handlePageChange('Galeri')}
                    >
                        Galeri
                    </p>
                    <p
                        className={`nav__item ${activePage === 'Bu Gün' ? 'active' : ''}`}
                        onClick={() => handlePageChange('Bu Gün')}
                    >
                        Bu Gün
                    </p>
                    <p
                        className={`nav__item ${activePage === 'Profile' ? 'active' : ''}`}
                        onClick={() => handlePageChange('Profile')}
                    >
                        <FaUserCircle size={30} />
                    </p>
                </div>
            </nav>
        </div>
    );
};

export default NavigationBar;

