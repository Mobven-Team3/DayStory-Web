import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/daystory-logo.png';
import './navbar-scss/_navbar.scss';


const NavigationBar = ({ showFullMenu }) => {
    const [activePage, setActivePage] = useState('gallery');
    const navigate = useNavigate();

    const handlePageChange = (page, route) => {
        setActivePage(page);
        navigate(route);
    };

    return (
        <>
            <div className='navigation'>
                <nav className="nav">
                    <div className="nav__logo">
                        <img className="nav__logo-img" src={logo} alt="daystory-logo" />
                        <p className="nav__logo-text">Day<span>Story</span></p>
                    </div>
                    <div className="nav__items">

                        <p
                            className={`nav__item ${activePage === 'gallery' ? 'active' : ''}`}
                            onClick={() => handlePageChange('gallery', '/gallery')}
                        >
                            Galeri
                        </p>
                        <p
                            className={`nav__item ${activePage === 'note' ? 'active' : ''}`}
                            onClick={() => handlePageChange('note', '/note')}
                        >
                            Bugün
                        </p>
                        <p
                            className={`nav__item ${activePage === 'profile' ? 'active' : ''}`}
                            onClick={() => handlePageChange('profile', '/profile')}
                        >
                            <FaUserCircle size={30} />
                        </p>

                    </div>
                </nav>
            </div>

        </>
    );
};

export default NavigationBar;
