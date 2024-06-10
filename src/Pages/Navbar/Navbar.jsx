// import React, { useEffect, useState } from 'react';
// import { FaUserCircle } from 'react-icons/fa';
// import { useLocation, useNavigate } from 'react-router-dom';
// import logo from '../../assets/images/daystory-logo.png';
// import './navbar-scss/_navbar.scss';

// const NavigationBar = () => {
//     const [activePage, setActivePage] = useState('');
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         if (location.pathname.startsWith('/gallery')) {
//             setActivePage('gallery');
//         } else if (location.pathname === '/note') {
//             setActivePage('note');
//         } else if (location.pathname === '/profile') {
//             setActivePage('profile');
//         } else if (/\/gallery\/\d{2}-\d{2}-\d{4}/.test(location.pathname)) {
//             setActivePage('note');
//         }
//     }, [location.pathname]);

//     const handlePageChange = (page, route) => {
//         setActivePage(page);
//         navigate(route);
//     };

//     return (
//         <div className='navigation'>
//             <nav className="nav">
//                 <div className="nav__logo">
//                     <img className="nav__logo-img" src={logo} alt="daystory-logo" />
//                     <p className="nav__logo-text">Day<span>Story</span></p>
//                 </div>
//                 <div className="nav__items">
//                     <p
//                         className={`nav__item ${activePage === 'gallery' ? 'active' : ''}`}
//                         onClick={() => handlePageChange('gallery', '/gallery')}
//                     >
//                         Galeri
//                     </p>
//                     <p
//                         className={`nav__item ${activePage === 'note' ? 'active' : ''}`}
//                         onClick={() => handlePageChange('note', '/note')}
//                     >
//                         Bugün
//                     </p>
//                     <p
//                         className={`nav__item ${activePage === 'profile' ? 'active' : ''}`}
//                         onClick={() => handlePageChange('profile', '/profile')}
//                     >
//                         <FaUserCircle size={30} />
//                     </p>
//                 </div>
//             </nav>
//         </div>
//     );
// };

// export default NavigationBar;



// import { Avatar, Card, CardContent, Grid, Popover, Typography } from '@mui/material';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { FaUserCircle } from 'react-icons/fa';
// import { useLocation, useNavigate } from 'react-router-dom';
// import logo from '../../assets/images/daystory-logo.png';
// import './navbar-scss/_navbar.scss';

// const NavigationBar = () => {
//     const [activePage, setActivePage] = useState('');
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [user, setUser] = useState(null);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         if (location.pathname.startsWith('/gallery')) {
//             setActivePage('gallery');
//         } else if (location.pathname === '/note') {
//             setActivePage('note');
//         } else if (location.pathname === '/profile') {
//             setActivePage('profile');
//         } else if (/\/gallery\/\d{2}-\d{2}-\d{4}/.test(location.pathname)) {
//             setActivePage('note');
//         }
//     }, [location.pathname]);

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             setError('Token not found');
//             return;
//         }

//         axios.get('https://talent.mobven.com:5043/api/Users', {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         .then(response => {
//             setUser(response.data.data);
//         })
//         .catch(error => {
//             setError('User not found');
//         });
//     }, []);

//     const handlePageChange = (page, route) => {
//         setActivePage(page);
//         navigate(route);
//     };

//     const handleProfileClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const open = Boolean(anchorEl);
//     const id = open ? 'profile-popover' : undefined;

//     return (
//         <div className='navigation'>
//             <nav className="nav">
//                 <div className="nav__logo">
//                     <img className="nav__logo-img" src={logo} alt="daystory-logo" />
//                     <p className="nav__logo-text">Day<span>Story</span></p>
//                 </div>
//                 <div className="nav__items">
//                     <p
//                         className={`nav__item ${activePage === 'gallery' ? 'active' : ''}`}
//                         onClick={() => handlePageChange('gallery', '/gallery')}
//                     >
//                         Galeri
//                     </p>
//                     <p
//                         className={`nav__item ${activePage === 'note' ? 'active' : ''}`}
//                         onClick={() => handlePageChange('note', '/note')}
//                     >
//                         Bugün
//                     </p>
//                     <p
//                         className={`nav__item ${activePage === 'profile' ? 'active' : ''}`}
//                         onClick={handleProfileClick}
//                     >
//                         <FaUserCircle size={30} />
//                     </p>
//                 </div>
//             </nav>
//             <Popover
//                 id={id}
//                 open={open}
//                 anchorEl={anchorEl}
//                 onClose={handleClose}
//                 anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'right',
//                 }}
//             >
//                 <div style={{ padding: '20px', width: '300px' }}>
//                     {error ? (
//                         <Typography>{error}</Typography>
//                     ) : !user ? (
//                         <Typography>Loading...</Typography>
//                     ) : (
//                         <Card>
//                             <CardContent>
//                                 <Grid container spacing={2} alignItems="center">
//                                     <Grid item xs={12} sm={4}>
//                                         <Avatar alt={user.firstName} src="/static/images/avatar/1.jpg" style={{ width: '80px', height: '80px' }} />
//                                     </Grid>
//                                     <Grid item xs={12} sm={8}>
//                                         <Typography variant="h6">{`${user.firstName} ${user.lastName}`}</Typography>
//                                         <Typography variant="body2">Username: {user.username}</Typography>
//                                         <Typography variant="body2">Email: {user.email}</Typography>
//                                         <Typography variant="body2">Birth Date: {user.birthDate}</Typography>
//                                         <Typography variant="body2">Gender: {user.gender}</Typography>
//                                     </Grid>
//                                 </Grid>
//                             </CardContent>
//                         </Card>
//                     )}
//                 </div>
//             </Popover>
//         </div>
//     );
// };

// export default NavigationBar;


import { Avatar, Card, CardContent, Grid, Popover, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/daystory-logo.png';
import './navbar-scss/_navbar.scss';

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

    const open = Boolean(anchorEl);
    const id = open ? 'profile-popover' : undefined;

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
                <div style={{ padding: '20px', width: '300px' }}>
                    {error ? (
                        <Typography>{error}</Typography>
                    ) : !user ? (
                        <Typography>Loading...</Typography>
                    ) : (
                        <Card>
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={4}>
                                        <Avatar alt={user.firstName} src="/static/images/avatar/1.jpg" style={{ width: '80px', height: '80px' }} />
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant="h6">{`${user.firstName} ${user.lastName}`}</Typography>
                                        <Typography variant="body2">Username: {user.username}</Typography>
                                        <Typography variant="body2">Email: {user.email}</Typography>
                                        <Typography variant="body2">Birth Date: {user.birthDate}</Typography>
                                        <Typography variant="body2">Gender: {user.gender}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </Popover>
        </div>
    );
};

export default NavigationBar;
