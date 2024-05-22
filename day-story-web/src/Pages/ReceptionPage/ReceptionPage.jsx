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
    roles: ["default"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async () => {
    try {
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        if (!formData.firstName.trim()) {
          alert("İsim boş bırakılamaz.");
        } else if (!formData.lastName.trim()) {
          alert("Soyisim boş bırakılamaz.");
        }
        return;
      }


      const response = await fetch("http://localhost:5120/api/authentication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setLoading(true);
        navigate("/aaaaaa");
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
              value={formData.firstName}
              onInput={handleChange}
              required
              focus-label-text-color="red"
            ></md-outlined-text-field>

            <md-outlined-text-field
              label="Soyisim"
              name="lastName"
              value={formData.lastName}
              onInput={handleChange}
              required
              focus-label-text-color="red"
            ></md-outlined-text-field>

        
            <md-filled-button
            onClick={registerUser}
            >Devam
            </md-filled-button>
            <button onClick={backHomeHandler}>Geri</button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceptionPage;
