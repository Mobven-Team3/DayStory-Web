// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './scss/RegisterPage.css';

// const FormListSecond = ({ formData, handleChange, onPreviousClick, submit }) => {

//     const navigate = useNavigate();
//     const handleLoginPageClick = () => {
//         navigate('/login');
//     };

//     return (
//         <>
//             <div className='form__list-header'>Yeni Hesap Oluştur</div>
//             <form className='form__list-items'>
//                 <p>Hesap bilgilerinizi oluşturunuz.</p>

//                 <md-outlined-text-field
//                     type="email"
//                     label="Email"
//                     name="email"
//                     placeholder="Emailinizi Yazınız."
//                     value={formData.email}
//                     onInput={handleChange}
//                     required
//                     hasTrailingIcon
//                 ></md-outlined-text-field>

//                 <md-outlined-text-field
//                     label="Kullanıcı Adı"
//                     name="username"
//                     placeholder="Kullanıcı Adı Belirleyiniz"
//                     value={formData.username}
//                     onInput={handleChange}
//                     required
//                 ></md-outlined-text-field>

//                 <md-outlined-text-field
//                     type="password"
//                     label="Şifre"
//                     name="password"
//                     placeholder="Şifre Belirleyiniz."
//                     value={formData.password}
//                     onInput={handleChange}
//                     required
//                 ></md-outlined-text-field>

//                 <md-outlined-text-field
//                     type="password"
//                     label="Şifre Tekrarı"
//                     name="confirmPassword"
//                     placeholder="Şifrenizi Onaylayınız."
//                     value={formData.confirmPassword}
//                     onInput={handleChange}
//                     required
//                 ></md-outlined-text-field>

//                 <div>
//                     <div className='form__list-buttons'>
//                         <md-outlined-button
//                             onClick={onPreviousClick}>
//                             Back
//                         </md-outlined-button>
//                         <md-filled-button onClick={submit}>
//                             Kayıt Ol
//                         </md-filled-button>
//                     </div>
//                     <center>
//                         <div className='form__list-footer'>
//                             <p>Zaten bir hesabın var mı? <a href="" onClick={handleLoginPageClick}><span>Giriş Yap</span></a></p>
//                         </div>
//                     </center>
//                 </div>
//             </form>
//         </>
//     );
// }

// export default FormListSecond;




import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './scss/RegisterPage.css';

const FormListSecond = ({ formData, handleChange, onPreviousClick, submit }) => {

    const navigate = useNavigate();
    const handleLoginPageClick = () => {
        navigate('/login');
    };

    const [errors, setErrors] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const validate = () => {
        let tempErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.com+$/;

        tempErrors.email = formData.email ? '' : 'Email gereklidir.';
        if (formData.email && !emailRegex.test(formData.email)) {
            tempErrors.email = 'Geçersiz email formatı. Örnek format: blabla@blabla.com ';
        }
        tempErrors.username = formData.username ? '' : 'Kullanıcı Adı gereklidir.';
        tempErrors.password = formData.password ? '' : 'Şifre gereklidir.';
        tempErrors.confirmPassword = formData.confirmPassword ? '' : 'Şifre Tekrarı gereklidir.';
        if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
            tempErrors.confirmPassword = 'Şifreler eşleşmiyor.';
        }

        setErrors(tempErrors);

        return Object.values(tempErrors).every(x => x === '');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            submit();
        }
    }

    return (
        <>
            <div className='form__list-header'>Yeni Hesap Oluştur</div>
            <form className='form__list-items' onSubmit={handleSubmit} noValidate>
                <p>Hesap bilgilerinizi oluşturunuz.</p>

                <TextField
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="Emailinizi Yazınız."
                    value={formData.email}
                    onChange={handleChange}
                    required
                    error={!!errors.email}
                    helperText={errors.email}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Kullanıcı Adı"
                    name="username"
                    placeholder="Kullanıcı Adı Belirleyiniz"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    error={!!errors.username}
                    helperText={errors.username}
                    fullWidth
                    margin="normal"
                />
                
                <TextField
                    type={showPassword ? 'text' : 'password'}
                    label="Şifre"
                    name="password"
                    value={formData.password}
                    placeholder="Şifrenizi Belirleyiniz."
                    onChange={handleChange}
                    required
                    error={!!errors.password}
                    helperText={errors.password}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <TextField
                    label="Şifre Tekrarı"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    name="confirmPassword"
                    placeholder="Şifrenizi Onaylayınız."
                    onChange={handleChange}
                    required
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />


                <div>
                    <div className='form__list-buttons'>
                        <Button className="form__list-buttons-back"
                            variant="outlined"
                            onClick={onPreviousClick}
                        >
                            Geri
                        </Button>
                        <Button className="form__list-buttons-submit"
                            variant="contained"
                            type="submit"
                            onClick={submit}
                        >
                            Kayıt Ol
                        </Button>
                    </div>
                    <center>
                        <div className='form__list-footer'>
                            <p>Zaten bir hesabın var mı? <span onClick={handleLoginPageClick}>Giriş Yap</span></p>
                        </div>
                    </center>
                </div>
            </form>
        </>
    );
}

export default FormListSecond;



