import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//css
import './register-scss/RegisterPage.css';

//components
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';

//icons
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


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

    const handleClear = (field) => {
        handleChange({
            target: {
                name: field,
                value: ''
            }
        });
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validate = () => {
        let tempErrors = {};
        const emailRegex = /^[a-zA-Z0-9]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-z0-9_-]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.$!%*?&])[A-Za-z\d@$!%.*?&]{7,}$/;
        const maxLength = 50;
    
        // Email validation
        tempErrors.email = formData.email ? '' : 'Email gereklidir.';
        if (formData.email && !emailRegex.test(formData.email)) {
            tempErrors.email = 'Geçersiz email formatı. Örnek format: xxxx@xxxxx.xxxx';
        }
        if (formData.email && formData.email.length > maxLength) {
            tempErrors.email = 'Email 50 karakterden fazla olamaz.';
        }
    
        // Username validation
        tempErrors.username = formData.username ? '' : 'Kullanıcı Adı gereklidir.';
        if (formData.username && !usernameRegex.test(formData.username)) {
            tempErrors.username = 'Geçersiz kullanıcı adı formatı. Küçük harfler, rakamlar, alt çizgi ve tire kullanılabilir.';
        }
        if (formData.username && formData.username.length > maxLength) {
            tempErrors.username = 'Kullanıcı Adı 50 karakterden fazla olamaz.';
        }
    
        // Password validation
        tempErrors.password = formData.password ? '' : 'Şifre gereklidir.';
        if (formData.password && !passwordRegex.test(formData.password)) {
            tempErrors.password = 'Geçersiz şifre formatı. En az 7 karakter. 1 büyük harf, 1 küçük harf ve özel karakter.';
        }
        if (formData.password && formData.password.length > maxLength) {
            tempErrors.password = 'Şifre 50 karakterden fazla olamaz.';
        }
    
        // Confirm Password validation
        tempErrors.confirmPassword = formData.confirmPassword ? '' : 'Şifre Tekrarı gereklidir.';
        if (formData.confirmPassword && formData.confirmPassword.length > maxLength) {
            tempErrors.confirmPassword = 'Şifre Tekrarı 50 karakterden fazla olamaz.';
        }
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
                    InputProps={{
                        endAdornment: (
                            formData.email && (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="clear input"
                                        onClick={() => handleClear('email')}
                                        edge="end"
                                    >
                                        <AiOutlineCloseCircle />
                                    </IconButton>
                                </InputAdornment>
                            )
                        )
                    }}
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
                    InputProps={{
                        endAdornment: (
                            formData.username && (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="clear input"
                                        onClick={() => handleClear('username')}
                                        edge="end"
                                    >
                                        <AiOutlineCloseCircle />
                                    </IconButton>
                                </InputAdornment>
                            )
                        )
                    }}
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



