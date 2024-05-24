import '@material/web/all';
import React from 'react';

import './scss/loginPage.css';

//images
import logo from '../../../src/assets/images/daystory-logo.png';
import günlük from '../../../src/assets/images/daystory.png';


const LoginPage = () => {
  return (
    <div className='container'>
      <header className='header'>
        <img className='header__logo' src={logo} alt="daystory-logo" />
        <p className='header__text'>Day<span>Story</span></p>
      </header>

      <div className='form'>
        <div className='form__description'>
          <img className='form__description-img' src={günlük} alt="main_image" />
          <div className='form__description-text'>
            <h2>Her sayfanın bir hikaye anlattığı yer</h2>
            <p>Sizin anılarınızı kalıcı hale getiriyoruz</p>
          </div>
        </div>

        <div className='form__list'>

        <div className='form__list-header'>Giriş Yap</div>
            <form className='form__list-items'>
                <p>Kişisel bilgilerinizi giriniz.</p>

          <md-outlined-text-field
            label="Kullanıcı Adı"
            name="username"
            placeholder="Kullanıcı Adınızı Yazınız."
            // value={formData.username}
            // onInput={handleChange}
            required
            supporting-text="*required"
          ></md-outlined-text-field>

          <md-outlined-text-field
            type="password"
            label="Şifre"
            name="password"
            placeholder="Şifre Belirleyiniz."
            // value={formData.password}
            // onInput={handleChange}
            required
            supporting-text="*En az 7 karakter. 1 büyük harf, 1 küçük harf ve özel karakter."
            ></md-outlined-text-field>
            </form>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
