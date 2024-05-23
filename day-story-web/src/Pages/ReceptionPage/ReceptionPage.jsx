// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import Formlistfirst from './formlistfirst';
// import Formlistsecond from './formlistsecond';
// import './scss/ReceptionPage.css';
// import '/node_modules/@material/web/all';


// const ReceptionPage = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [currentForm, setCurrentForm] = useState(1);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     gender: "",
//     birthdate: "",
//     role: ["default"],
//     username: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleGenderChange = (e) => {
//     const gender = e.target;
//     setFormData({
//       ...formData,
//       gender: gender.textContent
//     });

//   };

//   const registerUser = async () => {
//     try {
//       if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.gender.trim() || !formData.birthdate.trim()) {
//         if (!formData.firstName.trim()) {
//           alert("İsim boş bırakılamaz.");
//         } else if (!formData.lastName.trim()) {
//           alert("Soyisim boş bırakılamaz.");
//         } else if (!formData.gender.trim()) {
//           alert("Cinsiyet boş bırakılamaz.");
//         } else if (!formData.birthdate.trim()) {
//           alert("Doğum tarihi boş bırakılamaz.");
//         }
//         return;
//       }


//       const response = await fetch("", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         setLoading(true);
//         navigate("/girişyap");
//       } else {
//         const errorData = await response.json();
//         console.error("Registration failed:", errorData);
//       }
//     } catch (error) {
//       console.error("Error registering user:", error);
//     }
//   };



//   const toggleForm = () => {
//     setCurrentForm((prevForm) => (prevForm === 1 ? 2 : 1));
//   };

//   return (
//     <div className='container'>
//       <header className='header'>
//         <div className='header__logo'></div>
//         <p className='header__text'>DayStory</p>
//       </header>

//       <div className='form'>
//         <div className='form__description'>
//           <div className='form__description-img'></div>
//           <div className='form__description-text'>
//             <h2>Lorem ipsum dolor sit amet</h2>
//             <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
//           </div>
//         </div>

//         <div className='form__list'>
//           <div className='form__list-header'>Yeni Hesap Oluştur</div>

       

//           {currentForm === 1 && <Formlistfirst formData={formData} handleChange={handleChange} handleGenderChange={handleGenderChange} />}
//           {currentForm === 2 && <Formlistsecond formData={formData} handleChange={handleChange} handleGenderChange={handleGenderChange} registerUser={registerUser} loading={loading} />}

//           <div className='form__list-footer'>
//             <md-filled-button
//               type="submit"
//               onClick={toggleForm}
//             >{currentForm === 1 ? 'Devam' : 'Geri'}
//             </md-filled-button>

//             <p>Zaten bir hesabın var mı? <a href="/GirişYap">Giriş Yap</a></p>
//           </div>

//         </div>

      

//       </div>
//     </div>
//   );
// }

// export default ReceptionPage;




// -----------------------------------
  
  
  

// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import FormListFirst from './formlistfirst';
// import FormListSecond from './formlistsecond';
// import './scss/ReceptionPage.css';
// import '/node_modules/@material/web/all';

// const ReceptionPage = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [currentForm, setCurrentForm] = useState(1);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     gender: "",
//     birthdate: "",
//     username: "",
//     password: "",
//     role: ["default"],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log(`handleChange - ${name}: ${value}`);
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleGenderChange = (e) => {
//     const { value } = e.target;
//     console.log(`handleGenderChange - gender: ${value}`);
//     setFormData((prevData) => ({
//       ...prevData,
//       gender: value
//     }));
//   };

//   const registerUser = async () => {
//     try {
//       if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.gender.trim() || !formData.birthdate.trim() || !formData.username.trim() || !formData.password.trim()) {
//         alert("All fields are required.");
      
//         return;
        
//       }

//       console.log(formData);
      
//       const response = await fetch("/api/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         setLoading(true);
//         navigate("/girişyap");
//       } else {
//         const errorData = await response.json();
//         console.error("Registration failed:", errorData);
//       }
//     } catch (error) {
//       console.error("Error registering user:", error);
//     }
//   };

//   const toggleForm = () => {
//     setCurrentForm((prevForm) => (prevForm === 1 ? 2 : 1));
//   };

//   return (
//     <div className='container'>
//       <header className='header'>
//         <div className='header__logo'></div>
//         <p className='header__text'>DayStory</p>
//       </header>

//       <div className='form'>
//         <div className='form__description'>
//           <div className='form__description-img'></div>
//           <div className='form__description-text'>
//             <h2>Lorem ipsum dolor sit amet</h2>
//             <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
//           </div>
//         </div>

//         <div className='form__list'>
//           <div className='form__list-header'>Yeni Hesap Oluştur</div>

//           {currentForm === 1 && <FormListFirst formData={formData} handleChange={handleChange} handleGenderChange={handleGenderChange} />}
//           {currentForm === 2 && <FormListSecond formData={formData} handleChange={handleChange} registerUser={registerUser} loading={loading} />}

//           <div className='form__list-footer'>
//             <md-filled-button type="button" onClick={toggleForm}>
//               {currentForm === 1 ? 'Devam' : 'Geri'}
//             </md-filled-button>

//             <p>Zaten bir hesabın var mı? <a href="/girişyap">Giriş Yap</a></p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ReceptionPage;




import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import FormListFirst from './formlistfirst';
import FormListSecond from './formlistsecond';
import './scss/ReceptionPage.css';
import '/node_modules/@material/web/all';

const ReceptionPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentForm, setCurrentForm] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthdate: "",
    email:"",
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
          <div className='form__list-header'>Yeni Hesap Oluştur</div>

          {currentForm === 1 && <FormListFirst formData={formData} handleChange={handleChange} handleGenderChange={handleGenderChange} />}
          {currentForm === 2 && <FormListSecond formData={formData} handleChange={handleChange} registerUser={registerUser} loading={loading} />}

          <div className='form__list-footer'>
            <md-filled-button type="button" onClick={toggleForm}>
              {currentForm === 1 ? 'Devam' : 'Geri'}
            </md-filled-button>

            <p>Zaten bir hesabın var mı? <a href="/girişyap">Giriş Yap</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceptionPage;
