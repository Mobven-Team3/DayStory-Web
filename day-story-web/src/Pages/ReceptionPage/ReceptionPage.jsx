import '@material/web/all';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import FormListFirst from './formlistfirst';
import FormListSecond from './formlistsecond';
import './scss/ReceptionPage.css';

const ReceptionPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentForm, setCurrentForm] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthdate: "",
    email: "",
    username: "",
    password: "",
    role: ["default"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleGenderChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      gender: value
    }));
  };

  const registerUser = async () => {
    try {
      if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.gender.trim() || !formData.birthdate.trim() || !formData.username.trim() || !formData.password.trim()) {
        alert("All fields are required.");
        return;
      }

      const response = await fetch("/api/register", {
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

  const toggleForm = () => {
    setCurrentForm((prevForm) => (prevForm === 1 ? 2 : 1));
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

          {currentForm === 1 && <FormListFirst formData={formData} handleChange={handleChange} handleGenderChange={handleGenderChange} />}
          {currentForm === 2 && <FormListSecond formData={formData} handleChange={handleChange} registerUser={registerUser} loading={loading} />}
          {/* {currentForm === 3 && <LoginPage formData={formData} handleChange={handleChange} registerUser={registerUser} loading={loading} />}  */}

          <div className='form__list-footer'>
            <md-filled-button type="button" onClick={toggleForm}>
              {currentForm === 1 ? 'Devam' : 'Geri'}
            </md-filled-button>

            {currentForm === 2 && (
              <md-filled-button type="button">
                Kayıt ol
              </md-filled-button>
            )}

              <p>Zaten bir hesabın var mı?<Link to="#" >Giriş Yap</Link> </p>
            

          </div>

          <p>{formData.firstName}</p>
          <p>{formData.lastName}</p>
          <p>{formData.gender}</p>
          <p>{formData.birthdate}</p>
          <p>{formData.email}</p>
          <p>{formData.username}</p>
          <p>{formData.password}</p>


        </div>
      </div>
    </div>
  );
}

export default ReceptionPage;
