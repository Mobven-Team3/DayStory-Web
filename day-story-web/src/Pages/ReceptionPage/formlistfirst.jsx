import '@material/web/all';
import React from 'react';
import './scss/ReceptionPage.css';

const FormListFirst = ({ formData, handleChange, handleGenderChange }) => {
    return (
        <form className='form__list-items'>
            <p>Kişisel bilgilerinizi giriniz.</p>

                <md-outlined-text-field
                    label="İsim"
                    name="firstName"
                    placeholder="İsminizi yazınız."
                    value={formData.firstName}
                    onInput={handleChange}
                    required
                    supporting-text="*required"
                ></md-outlined-text-field>
            
                <md-outlined-text-field
                    label="Soyisim"
                    name="lastName"
                    placeholder="Soyisminizi yazınız."
                    value={formData.lastName}
                    onInput={handleChange}
                    required
                    supporting-text="*required"
                ></md-outlined-text-field>
            

            <div className='form__list-item'>
                <md-outlined-select
                    label="Cinsiyet"
                    name="gender"
                    value={formData.gender}
                    onInput={handleGenderChange}
                    required
                    supporting-text="*required"
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
                    supporting-text="gg/aa/yyyy"
                ></md-outlined-text-field>
            </div>
        </form>
    );
}

export default FormListFirst;