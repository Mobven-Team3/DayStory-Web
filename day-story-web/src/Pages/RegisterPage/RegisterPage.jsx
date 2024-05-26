import '@material/web/all';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import './scss/RegisterPage.css';

//components
import FormListFirst from './formlistfirst';
import FormListSecond from './formlistsecond';

//images
import logo from '../../../src/assets/images/daystory-logo.png';
import register_img from '../../../src/assets/images/register_img.png';


const RegisterPage = () => {
  const navigate = useNavigate();
  const [setLoading] = useState(false);
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

  const toggleForm = () => {
    if (currentForm === 1) {
        setCurrentForm(2);
    } else {
      setCurrentForm(1);
    }
  };


  return (
    <div className='container'>
      <header className='header'>
        <img className='header__logo' src={logo} alt="daystory-logo" />
        <p className='header__text'>Day<span>Story</span></p>
      </header>

      <div className='form'>
        <div className='form__description'>
          <img className='form__description-img' src={register_img} alt="main_image" />
          <div className='form__description-text'>
            <h2>Her sayfanın bir hikaye anlattığı yer</h2>
            <p>Sizin anılarınızı kalıcı hale getiriyoruz</p>
          </div>
        </div>

        <div className='form__list'>

          {currentForm === 1 && <FormListFirst formData={formData} handleChange={handleChange} handleGenderChange={handleGenderChange} nextbutton={toggleForm} />}
          {currentForm === 2 && <FormListSecond formData={formData} handleChange={handleChange} onPreviousClick={toggleForm} submit={registerUser} />}

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

export default RegisterPage;
