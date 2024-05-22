import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './scss/ReceptionPage.css';
import '/node_modules/@material/web/all';


const ReceptionPage = () => {
  const navigate = useNavigate();
  const [setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthdate: "",
    role: ["default"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleGenderChange = (e) => {
    const gender = e.target;
    setFormData({
      ...formData,
      gender: gender.textContent
    });

  };

  const registerUser = async () => {
    try {
      if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.gender.trim() || !formData.birthdate.trim()) {
        if (!formData.firstName.trim()) {
          alert("İsim boş bırakılamaz.");
        } else if (!formData.lastName.trim()) {
          alert("Soyisim boş bırakılamaz.");
        } else if (!formData.gender.trim()) {
          alert("Cinsiyet boş bırakılamaz.");
        } else if (!formData.birthdate.trim()) {
          alert("Doğum tarihi boş bırakılamaz.");
        }
        return;
      }


      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setLoading(true);
        navigate("/girişyap");
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };



  const backHomeHandler = () => {
    const newPath = '/aysu';
    navigate(newPath);
  };





  return (
    <div className='container'>
      <header className='header'>
        <div className='header__logo'></div>
        <p className='header__text'>DayStory</p>
      </header>

      <div className='form'>
        <div className='form__description'>
          <div className='form__description-img'></div>
          <div className='form__description-text'>
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
          </div>
        </div>

        <div className='form__list'>
          <div className='form__list-header'>Yeni Hesap Oluştur</div>
          <div className='form__list-items'>
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
                <md-select-option value="Kadın" onClick={handleGenderChange}>Kadın</md-select-option>
                <md-select-option value="Erkek" onClick={handleGenderChange}>Erkek</md-select-option>
                <md-select-option value="Belirtme" onClick={handleGenderChange}> Belirtme</md-select-option>
              </md-outlined-select>

              <md-outlined-text-field
                type="date"
                name="birthdate"
                label="Doğum Tarihi"
                format="mm/dd/yyyy"
                value={formData.birthdate}
                onInput={handleChange}
                required
                supporting-text="*required"
              >
              </md-outlined-text-field>
            </div>


            {/* <p>{formData.birthdate}</p> */}

            <md-filled-button
              onClick={backHomeHandler}
            >Devam
            </md-filled-button>
            <button onClick={registerUser}>Geri</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceptionPage;

