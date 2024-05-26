import React from 'react';
import { useNavigate } from 'react-router-dom';
import './scss/RegisterPage.css';


const FormListFirst = ({ formData, handleChange, handleGenderChange, nextbutton }) => {
    const navigate = useNavigate();
    const handleLoginPageClick = () => {
        navigate('/login');
    };


    return (
        <>
            <div className='form__list-header'>Yeni Hesap Oluştur</div>
            <form className='form__list-items'>
                <p>Kişisel bilgilerinizi giriniz.</p>

                <md-outlined-text-field
                    label="İsim"
                    name="firstName"
                    placeholder="İsminizi yazınız."
                    value={formData.firstName}
                    onInput={handleChange}
                    required
                >
                </md-outlined-text-field>

                <md-outlined-text-field
                    label="Soyisim"
                    name="lastName"
                    placeholder="Soyisminizi yazınız."
                    value={formData.lastName}
                    onInput={handleChange}
                    required
                >
                </md-outlined-text-field>

                <div className='form__list-item'>
                    <md-outlined-select
                        label="Cinsiyet"
                        name="gender"
                        value={formData.gender}
                        onInput={handleGenderChange}
                        required
                    >
                        <md-select-option value="Kadın">Kadın</md-select-option>
                        <md-select-option value="Erkek">Erkek</md-select-option>
                        <md-select-option value="Belirtme">Belirtme</md-select-option>
                    </md-outlined-select>

                    <md-outlined-text-field
                        type="date"
                        name="birthdate"
                        label="Doğum Tarihi"
                        value={formData.birthdate}
                        onInput={handleChange}
                        required
                    >
                    </md-outlined-text-field>
                </div>

                <div className='form__list-button'>
                    <md-filled-button
                        onClick={nextbutton}
                    >
                        Devam
                    </md-filled-button>

                    <div className='form__list-footer'>
                        <p>Zaten bir hesabın var mı? <a href="" onClick={handleLoginPageClick}><span>Giriş Yap</span></a></p>
                    </div>

                </div>

            </form>



        </>
    );
}

export default FormListFirst;

