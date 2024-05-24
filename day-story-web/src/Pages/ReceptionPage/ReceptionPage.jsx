import '@material/web/all';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const ReceptionPage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login'); // 'login' rotasına yönlendirme yapar
    };
    const handleRegisterClick = () => {
        navigate('/register'); // 'register' rotasına yönlendirme yapar
    };



    return (
        <>
            <button onClick={handleRegisterClick} > kayıt ol</button>
            <button onClick={handleLoginClick}> giriş Yap</button>
        </>
    );
}

export default ReceptionPage;
