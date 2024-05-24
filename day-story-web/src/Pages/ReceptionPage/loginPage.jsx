import React from 'react';
import './scss/ReceptionPage.css';

const LoginPage = ({ formData, handleChange, formTitle }) => { // formTitle prop'u ekleniyor
  return (
    <form className='form_login-link'>
      <p>{formTitle}</p> {/* Başlık buradan dinamik olarak alınıyor */}
      
      <div className='form__field'>
        <md-outlined-text-field
          label="Kullanıcı Adı"
          name="username"
          placeholder="Kullanıcı Adınızı Yazınız."
          value={formData.username}
          onInput={handleChange}
          required
          supporting-text="*required"
        ></md-outlined-text-field>
      </div>
      
      <div className='form__field'>
        <md-outlined-text-field
          type="password"
          label="Şifre"
          name="password"
          placeholder="Şifre Belirleyiniz."
          value={formData.password}
          onInput={handleChange}
          required
          supporting-text="*En az 7 karakter. 1 büyük harf, 1 küçük harf ve özel karakter."
        ></md-outlined-text-field>
      </div>
    </form>
  );
};

export default LoginPage;
