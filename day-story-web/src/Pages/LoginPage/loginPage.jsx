import {
  Button,
  IconButton, InputAdornment,
  TextField
} from '@mui/material';

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

//images
import logo from '../../../src/assets/images/daystory-logo.png';
import login_img from '../../../src/assets/images/login_img.png';



const LoginPage = () => {

  const navigate = useNavigate();
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
    username: '',
    password: ''
  })

  const usernameHandler = (e) => {
    const usernameData = e.target.value;
    setLoginData({ ...loginData, username: usernameData });
  };

  const passwordHandler = (e) => {
    const passwordData = e.target.value;
    setLoginData({ ...loginData, password: passwordData });
  };

  const [errors, setErrors] = useState({
    username: '',
    password: '',
});

  const validate = () => {
    let tempErrors = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.$!%*?&])[A-Za-z\d@$!%.*?&]{7,}$/;

  
    tempErrors.username = loginData.username ? '' : 'Kullanıcı Adı gereklidir.';
    tempErrors.password = loginData.password ? '' : 'Şifre gereklidir.';
    if (loginData.password && !passwordRegex.test(loginData.password)) {
        tempErrors.password = 'Geçersiz şifre formatı. En az 7 karakter. 1 büyük harf ,1 küçük harf ve özel karakter.';
    }
    setErrors(tempErrors);

    return Object.values(tempErrors).every(x => x === '');
}


const loginHandler = async (e) => {
  e.preventDefault();
  if (validate()) {
    try {
      const loginRequest = await fetch('', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: loginData.username, password: loginData.password })
      });
      if (200 <= loginRequest.status && loginRequest.status <= 299) {
        const content = await loginRequest.json();
        console.log(content)
        window.localStorage.setItem('token', content.accessToken);
        window.localStorage.setItem('userId', content.userId);

        navigate('/deneme')
      } else {
        alert('giriş yapılamadı backeden')
      }
    } catch (error) {
      console.error(error);
      alert('Giriş Yapılamadı');
    };
  }
}
  


  return (
    <div className='container'>
      <header className='header'>
        <img className='header__logo' src={logo} alt="daystory-logo" />
        <p className='header__text'>Day<span>Story</span></p>
      </header>

      <div className='form'>
      <div className='form__description'>
        <div className='form__description-text'>
            <h2>Day<span>Story</span> ’e Hoşgeldin!</h2>
          </div>
          <img className='form__description-img' src={login_img} alt="main_image" />
        </div>

        <div className='form__list'>
          <>
            <div className='form__list-header'>Giriş Yap</div>
            <form className='form__list-items' onSubmit={loginHandler} noValidate>
              <p>Hesap bilgilerinizi giriniz</p>

              <TextField
                label="Kullanıcı Adı"
                name="username"
                placeholder="Kullanıcı Adınızı Yazınız."
                required
                value={loginData.username}
                onChange={usernameHandler}
                error={!!errors.username}
                helperText={errors.username}
                fullWidth
                margin="normal"
              > </TextField>

              <TextField
                type={showPassword ? 'text' : 'password'}
                label="Şifre"
                name="password"
                value={loginData.password}
                placeholder="Şifrenizi Belirleyiniz."
                onChange={passwordHandler}
                error={!!errors.password}
                helperText={errors.password}
                required
                fullWidth
                margin="normal"
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
    </div>
  );
};

export default LoginPage;
