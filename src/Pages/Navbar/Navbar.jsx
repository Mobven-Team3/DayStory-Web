import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/daystory-logo.png'; // Düzeltilmiş yol
import './navbar-scss/_navbar.scss';

const NavigationBar = ({ showFullMenu }) => {
    const [activePage, setActivePage] = useState('');
    const navigate = useNavigate();

    const handlePageChange = (page, route) => {
        setActivePage(page);
        navigate(route);
    };

    return (
        <div className='navigation'>
            <nav className="nav">
                <div className="nav__logo">
                    <img className="nav__logo-img" src={logo} alt="daystory-logo" />
                    <p className="nav__logo-text">Day<span>Story</span></p>
                </div>
                <div className="nav__items">
                    {showFullMenu && (
                        <>
                            <p
                                className={`nav__item ${activePage === 'gallery' ? 'active' : ''}`} 
                                onClick={() => handlePageChange('gallery', '/gallery')}
                            >
                                Galeri
                            </p>
                            <p
                                className={`nav__item ${activePage === 'today' ? 'active' : ''}`} 
                                onClick={() => handlePageChange('today', '/today')}
                            >
                                Bu Gün
                            </p>
                        </>
                    )}
                    <p
                        className={`nav__item ${activePage === 'login' ? 'active' : ''}`} 
                        onClick={() => handlePageChange('login', '/login')}
                    >
                        Giriş Yap
                    </p>
                    <p
                        className={`nav__item ${activePage === 'register' ? 'active' : ''}`} 
                        onClick={() => handlePageChange('register', '/register')}
                    >
                        Kaydol
                    </p>
                    {showFullMenu && (
                        <p
                            className={`nav__item ${activePage === 'profile' ? 'active' : ''}`} 
                            onClick={() => handlePageChange('profile', '/profile')}
                        >
                            <FaUserCircle size={30} />
                        </p>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default NavigationBar;
