import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//components
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';

//images
import logo from '../../../src/assets/images/daystory-logo.png';
import login_img from '../../../src/assets/images/login_img.png';

//icons
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLoginPageClick = () => {
    navigate('/register');
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const loginHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const loginRequest = await fetch('https://talent.mobven.com:6003/api/Users/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: loginData.email, password: loginData.password })
      });

      const response = await loginRequest.json();

      if (loginRequest.ok) {
        window.localStorage.setItem('token', response.token);
        window.localStorage.setItem('userId', response.userId);
        setLoginData({ email: '', password: '' });
        navigate('/mainpage');
      } else if (loginRequest.status === 404) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Kullanıcı bulunamadı.'
        }));
      } else if (loginRequest.status === 401) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: 'Şifre yanlış.'
        }));
      } else {
        console.error('Giriş yapılamadı, lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Giriş yapılamadı:', error);
    }
    setLoading(false);
  };




  const handleClear = (field) => {
    handleChange({
      target: {
        name: field,
        value: ''
      }
    });
  };

  return (
    <div className='container'>
      <header className='header'>
        <img className='header__logo' src={logo} alt="daystory-logo" />
        <p className='header__text'>Day<span>Story</span></p>
      </header>


      {loading ? (
        <p>Giriş Yapılıyor...</p>
      ) : (

        <div className='form'>
          <div className='form__description'>
            <div className='form__description-text'>
              <h2>Day<span>Story</span>’e Tekrar<h2>Hoş geldin!</h2></h2>
            </div>
            <img className='form__description-img' src={login_img} alt="main_image" />
          </div>

          <div className='form__list'>
            <>
              <div className='form__list-header'>Giriş Yap</div>
              <form className='form__list-items' onSubmit={loginHandler} noValidate>
                <p>Hesap bilgilerinizi giriniz</p>

                <TextField
                  label="Email"
                  name="email"
                  placeholder="Emailinizi Yazınız."
                  required
                  value={loginData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      loginData.email && (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="clear input"
                            onClick={() => handleClear('email')}
                            edge="end"
                          >
                            <AiOutlineCloseCircle />
                          </IconButton>
                        </InputAdornment>
                      )
                    )
                  }}
                />

                <TextField
                  type={showPassword ? 'text' : 'password'}
                  label="Şifre"
                  name="password"
                  value={loginData.password}
                  placeholder="Şifrenizi Belirleyiniz."
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  required
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                <div className='form__list-button'>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Giriş Yap
                  </Button>

                  <div className='form__list-footer'>
                    <p>Henüz hesabın yok mu? <span onClick={handleLoginPageClick}>Kayıt Ol</span></p>
                  </div>
                </div>
              </form>
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;

