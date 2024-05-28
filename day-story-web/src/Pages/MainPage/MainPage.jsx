import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../../../src/assets/images/daystory-logo.png';
import GallaryPage from '../GalleryPage/GalleryPage';
import TodayPage from '../NotePage/NotePage';
import './mainpage-scss/MainPage.css';

const MainPage = () => {
    const [activePage, setActivePage] = useState('gallery'); // Değişiklik: Başlangıçta "gallery" sayfası aktif

    const handlePageChange = (page) => { 
        setActivePage(page);
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
                            onClick={() => handlePageChange('gallery')} 
                        >
                            Galeri
                        </p>
                        <p
                            className={`nav__item ${activePage === 'todaypage' ? 'active' : ''}`} 
                            onClick={() => handlePageChange('todaypage')}
                        >
                            Bu Gün
                        </p>
                        <p
                            className={`nav__item ${activePage === 'profile' ? 'active' : ''}`} 
                            onClick={() => handlePageChange('profile')} 
                        >
                            <FaUserCircle size={30} />
                        </p>
                    </div>
                </nav>
            </div>

            {activePage === 'gallery' && <GallaryPage />}
            {activePage === 'todaypage' && <TodayPage />}
        </>
    );
};

export default MainPage;
