import { Avatar, Card, CardContent, Grid, Popover, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/daystory-logo.png';
import './navbar-scss/_navbar.scss';
import calendericon from '../../assets/images/icons/calendar.png';
import gendericon from '../../assets/images/icons/gender.png';
import maillicon from '../../assets/images/icons/maill.png';
import profileicon from '../../assets/images/icons/personalcard.png';


const updateActivePage = (pathname) => {
    if (pathname.startsWith('/gallery')) {
        setActivePage('gallery');
    } else if (pathname === '/note') {
        setActivePage('note');
    } else if (pathname === '/profile') {
        setActivePage('profile');
    } else if (/\/gallery\/\d{2}-\d{2}-\d{4}/.test(pathname)) {
        setActivePage('note');
    } else {
        setActivePage('');
    }
};

const NavigationBar = () => {
    const [activePage, setActivePage] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const updateActivePage = (pathname) => {
        if (pathname.startsWith('/gallery')) {
            setActivePage('gallery');
        } else if (pathname === '/note') {
            setActivePage('note');
        } else if (pathname === '/profile') {
            setActivePage('profile');
        } else if (/\/gallery\/\d{2}-\d{2}-\d{4}/.test(pathname)) {
            setActivePage('note');
        } else {
            setActivePage('');
        }
    };

    useEffect(() => {
        updateActivePage(location.pathname);
    }, [location.pathname]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Token not found');
            return;
        }

        axios.get('https://talent.mobven.com:5043/api/Users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setUser(response.data.data);
        })
        .catch(error => {
            setError('User not found');
        });
    }, []);

    const handlePageChange = (page, route) => {
        setActivePage(page);
        navigate(route);
    };

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
        setActivePage('profile');
    };

    const handleClose = () => {
        setAnchorEl(null);
        updateActivePage(location.pathname);
    };
    const handleMain = () => {
        navigate('/');
    };



    const open = Boolean(anchorEl);
    const id = open ? 'profile-popover' : undefined;
    const translateGender = (gender) => {
        switch (gender) {
            case 'NotSpecified':
                return 'Belirtmek İstemiyorum';
            case 'Male':
                return 'Erkek';
            case 'Female':
                return 'Kadın';
            case 'Other':
                return 'Diğer';
            default:
                return gender;
        }
    };

    const formatBirthDate = (birthDate) => {
        return birthDate.replace(/-/g, '/');
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
                        onClick={handleProfileClick}
                    >
                        <FaUserCircle size={30} />
                    </p>
                </div>
            </nav>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                  <div className='profile'>
                    {error ? (
                        <div>{error}</div>
                    ) : !user ? (
                        <div>Loading...</div>
                    ) : (
                        <div className='profile'>
                            <div className='profile__avatar'>
                                <img className='profile__avatar-img' src={profile} />
                                <p>{user.username}</p>
                            </div>
                            <div className='profile__body'>
                                <p><img src={profileicon} alt='profile-icon'></img>{`${user.firstName} ${user.lastName}`}</p>
                                <p><img src={maillicon} alt='profile-icon'></img>{user.email}</p>
                                <p><img src={calendericon} alt='profile-icon'></img>{formatBirthDate(user.birthDate)}</p>
                                <p><img src={gendericon} alt='profile-icon'></img>{translateGender(user.gender)}</p>
                            </div>

                            <div className='profile__logout'
                                onClick={handleMain}>
                                Çıkış Yap
                            </div>
                        </div>
                    )}
                </div>
            </Popover>
        </div>
    );
};

export default NavigationBar;
             