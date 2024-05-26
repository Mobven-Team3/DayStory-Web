import '@material/web/all';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import './scss/loginPage.css';

//images
import logo from '../../../src/assets/images/daystory-logo.png';
import login_img from '../../../src/assets/images/login_img.png';


const LoginPage = () => {

  const navigate = useNavigate();
  const handleLoginPageClick = () => {
    navigate('/register');
  };




  return (
    <div className='container'>
      <header className='header'>
        <img className='header__logo' src={logo} alt="daystory-logo" />
        <p className='header__text'>Day<span>Story</span></p>
      </header>

      <div className='form'>
        <div className='form__description'>
          <img className='form__description-img' src={login_img} alt="main_image" />
          <div className='form__description-text'>
            <h2>Her sayfanın bir hikaye anlattığı yer</h2>
            <p>Sizin anılarınızı kalıcı hale getiriyoruz</p>
          </div>
        </div>

        <div className='form__list'>

          <div className='form__list-header'>Giriş Yap</div>
          <form className='form__list-items'>
            <p>Hesap bilgilerinizi giriniz.</p>

            <md-outlined-text-field
              label="Kullanıcı Adı"
              name="username"
              placeholder="Kullanıcı Adınızı Yazınız."
              required
            ></md-outlined-text-field>

            <md-outlined-text-field
              type="password"
              label="Şifre"
              name="password"
              placeholder="Şifrenizi Giriniz."
              required
            ></md-outlined-text-field>


            <div className='form__list-button'>
              <md-filled-button >
                Giriş Yap
              </md-filled-button>

              <div className='form__list-footer'>
                <p>Henüz hesabın yok mu? <a href="" onClick={handleLoginPageClick}><span>Kayıt Ol</span></a></p>
              </div>
              
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
