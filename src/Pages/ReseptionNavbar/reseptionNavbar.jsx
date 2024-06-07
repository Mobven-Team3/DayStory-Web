import { Button } from '@mui/base';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/daystory-logo.png';
import '../Navbar/navbar-scss/_navbar.scss';



const NavigationBar = () => {

    const navigate = useNavigate();

    const handleLoginPageClick = () => {
        navigate('/login');
    };
    
    const handleRegisterPageClick = () => {
        navigate('/register');
    };

    return (
        <div className='navigation'>
            <nav className="nav">
                <div className="nav__logo">
                    <img className="nav__logo-img" src={logo} alt="daystory-logo" />
                    <p className="nav__logo-text">Day<span>Story</span></p>
                </div>
                <div className='landingpage__buttons'>
                    <Button className="signin"
                        variant="submit"
                        onClick={handleRegisterPageClick}
                    >
                        Kayıt Ol
                    </Button>
                    <Button className="login"
                        variant="submit"
                        onClick={handleLoginPageClick}
                    >
                        Giriş Yap
                    </Button>
                </div>
            </nav>
        </div>
    );
};

export default NavigationBar;

