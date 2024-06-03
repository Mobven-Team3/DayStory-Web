
// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";

// //css
// import './register-scss/RegisterPage.css';

// //components
// import FormListFirst from './formlistfirst';
// import FormListSecond from './formlistsecond';

// //images
// import logo from '../../../src/assets/images/daystory-logo.png';
// import register_img from '../../../src/assets/images/register_img.png';

// const RegisterPage = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [currentForm, setCurrentForm] = useState(1);


//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     gender: "",
//     birthDate: "",
//     email: "",
//     username: "",
//     password: "",
//     passwordConfirmed:"",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleGenderChange = (e) => {
//     const { value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       gender: value
//     }));
//   };


//   const registerUser = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("https://5c5eb3ddf47a409bbc789c200ed6f8f9.api.mockbin.io/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         navigate("/login");
//       } else {
//         const errorData = await response.json();
//         console.error("Registration failed:", errorData);
//       }
//     } catch (error) {
//       console.error("Error registering user:", error);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const toggleForm = () => {
//     if (currentForm === 1) {
//         setCurrentForm(2);
//     } else {
//       setCurrentForm(1);
//     };
    
//   };


//   return (
//     <div className='container'>
//       <header className='header'>
//         <img className='header__logo' src={logo} alt="daystory-logo" />
//         <p className='header__text'>Day<span>Story</span></p>
//       </header>

      
//       {loading ? (
//         <p>Kayıt Olunuyor...</p>
//       ) : (
//         <div className='form'>
//           <div className='form__description'>
//             <div className='form__description-text'>
//               <h2>Day<span>Story</span>’e Hoş geldin!</h2>
//             </div>
//             <img className='form__description-img' src={register_img} alt="main_image" />
//           </div>

//           <div className='form__list'>

//             {currentForm === 1 && <FormListFirst formData={formData} handleChange={handleChange} handleGenderChange={handleGenderChange} nextbutton={toggleForm} loading={loading} />}
//             {currentForm === 2 && <FormListSecond formData={formData} handleChange={handleChange} onPreviousClick={toggleForm} submit={registerUser} loading={loading} />}

//           </div>
//         </div>
// )}
//     </div>
//   );
// }

// export default RegisterPage;

// ----------------------------------

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

//css
import './register-scss/RegisterPage.css';

//components
import FormListFirst from './formlistfirst';
import FormListSecond from './formlistsecond';

//images
import logo from '../../../src/assets/images/daystory-logo.png';
import register_img from '../../../src/assets/images/register_img.png';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentForm, setCurrentForm] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    email: "",
    username: "",
    password: "",
    passwordConfirmed:"",
  });

  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirmed: '',
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
    setLoading(true);
    try {
      console.log('aysu');
      const response = await fetch("https://5c5eb3ddf47a409bbc789c200ed6f8f9.api.mockbin.io/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        if (errorData.type === 'UserAlreadyExistsException') {
          setErrors({
            email: errorData.title.includes(formData.email) ? 'Bu email adresi zaten kayıtlı.' : '',
            username: errorData.title.includes(formData.username) ? 'Bu kullanıcı adı zaten kayıtlı.' : '',
          });
        }
      }
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setLoading(false);
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

      {loading ? (
        <p>Kayıt Olunuyor...</p>
      ) : (
        <div className='form'>
          <div className='form__description'>
            <div className='form__description-text'>
              <h2>Day<span>Story</span>’e Hoş geldin!</h2>
            </div>
            <img className='form__description-img' src={register_img} alt="main_image" />
          </div>

          <div className='form__list'>
            {currentForm === 1 && (
              <FormListFirst
                formData={formData}
                handleChange={handleChange}
                handleGenderChange={handleGenderChange}
                nextbutton={toggleForm}
                loading={loading}
              />
            )}
            {currentForm === 2 && (
              <FormListSecond
                formData={formData}
                handleChange={handleChange}
                onPreviousClick={toggleForm}
                submit={registerUser}
                setErrors={setErrors}
                errors={errors}
                loading={loading}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterPage;


