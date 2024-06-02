import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../../../src/assets/images/daystory-logo.png';
import Footer from '../Footer/footer';
import GallaryPage from '../GalleryPage/GalleryPage';
import TodayPage from '../NotePage/NotePage';
import ProfilePage from '../ProfilePage/ProfilePage';
import './mainpage-scss/_mainPage.scss';

const MainPage = () => {
    const [activePage, setActivePage] = useState('gallery');

    const handlePageChange = (page) => { 
        setActivePage(page);
    };

    return (
        <center>
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
                            Bugün
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
            {activePage === 'profile' && <ProfilePage />}

            <Footer  /> 
        </center>
    );
};

export default MainPage;
