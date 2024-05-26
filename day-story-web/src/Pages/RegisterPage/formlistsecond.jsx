import React from 'react';
import { useNavigate } from 'react-router-dom';
import './scss/RegisterPage.css';

const FormListSecond = ({ formData, handleChange, onPreviousClick, submit }) => {

    const navigate = useNavigate();
    const handleLoginPageClick = () => {
        navigate('/login');
    };

    return (
        <>
            <div className='form__list-header'>Yeni Hesap Oluştur</div>
            <form className='form__list-items'>
                <p>Hesap bilgilerinizi oluşturunuz.</p>

                <md-outlined-text-field
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="Emailinizi Yazınız."
                    value={formData.email}
                    onInput={handleChange}
                    required
                    hasTrailingIcon
                ></md-outlined-text-field>

                <md-outlined-text-field
                    label="Kullanıcı Adı"
                    name="username"
                    placeholder="Kullanıcı Adı Belirleyiniz"
                    value={formData.username}
                    onInput={handleChange}
                    required
                ></md-outlined-text-field>

                <md-outlined-text-field
                    type="password"
                    label="Şifre"
                    name="password"
                    placeholder="Şifre Belirleyiniz."
                    value={formData.password}
                    onInput={handleChange}
                    required
                ></md-outlined-text-field>

                <md-outlined-text-field
                    type="password"
                    label="Şifre Tekrarı"
                    name="confirmPassword"
                    placeholder="Şifrenizi Onaylayınız."
                    value={formData.confirmPassword}
                    onInput={handleChange}
                    required
                ></md-outlined-text-field>

                <div>
                    <div className='form__list-buttons'>
                        <md-outlined-button
                            onClick={onPreviousClick}>
                            Back
                        </md-outlined-button>
                        <md-filled-button onClick={submit}>
                            Kayıt Ol
                        </md-filled-button>
                    </div>
                    <center>
                        <div className='form__list-footer'>
                            <p>Zaten bir hesabın var mı? <a href="" onClick={handleLoginPageClick}><span>Giriş Yap</span></a></p>
                        </div>
                    </center>
                </div>
            </form>
        </>
    );
}

export default FormListSecond;