// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import './scss/ReceptionPage.css';
// import '/node_modules/@material/web/all';


// const ReceptionPage = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     gender: "",
//     birthdate: "",
//     roles: ["default"],
//   });


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const registerUser = async () => {
//     try {
//       if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.userName.trim() || !formData.password.trim()) {
//         if (!formData.firstName.trim()) {
//           alert("İsim boş bırakılamaz.");
//         } else if (!formData.lastName.trim()) {
//           alert("Soyisim boş bırakılamaz.");
//         } else if (!formData.userName.trim()) {
//           alert("Kullanıcı adı boş bırakılamaz.");
//         } else if (!formData.password.trim()) {
//           alert("Şifre boş bırakılamaz.");
//         }
//         return;
//       }

//       if (!isPasswordValid(formData.password)) {
//         console.error("Şifre kriterlerine uyunuz: En az 6 karakter ve en az bir rakam içermelidir.");
//         alert("Şifreniz en az 6 karakter ve en az bir rakam içermelidir.");
//         return;
//       }

//       const response = await fetch("http://localhost:5120/api/authentication", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(formData)
//       });

//       if (response.ok) {
//         setLoading(true);
//         navigate("/");
//       } else {
//         const errorData = await response.json();
//         console.error("Registration failed:", errorData);
//       }
//     } catch (error) {
//       console.error("Error registering user:", error);
//     }
//   };

//   const isPasswordValid = (password) => {

//     return password.length >= 6 && /\d/.test(password);
//   };

//   const backHomeHandler = () => {
//     const newPath = '/aysu';
//     navigate(newPath);
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
//             <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
//           </div>
//         </div>

//         <div className='form__list'>

//           <div className='form__list-header'>Yeni Hesap Oluştur</div>

//           <div className='form__list-item'>

//             <p>Kişisel bilgilerinizi giriniz.</p>

//             <md-outlined-text-field
//               label="İsim"
//               value="İsminizi Yazınız."
//               required
//               focus-label-text-color="red"
//             > </md-outlined-text-field>

//             <md-outlined-text-field
//               label="Soyisim"
//               value="Soyisminizi Yazınız."
//               required
//               focus-label-text-color="red"
//             > </md-outlined-text-field>


//             <button onClick={backHomeHandler} className="back-icon">
//               {" "}
//             </button>

//           </div>
//           <div>





//           </div>

//         </div>

//       </div>


//     </div>
//   );
// }

// export default ReceptionPage;

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import FormListFirst from './LoginForm';
import FormListSecond from './RegisterForm';
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