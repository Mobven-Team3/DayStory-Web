import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//css
import './register-scss/_register.scss';

//components
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';

//icons
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FormListSecond = ({ formData, handleChange, onPreviousClick, submit, setErrors, errors }) => {
  const navigate = useNavigate();
  const handleLoginPageClick = () => {
    navigate('/login');
  };

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
    const emailRegex = /@.*\./;
    const maxLength = 50;
    const minLength = 3;
    const minLengthPassword = 7;

    // Email validation
    tempErrors.email = formData.email ? '' : 'Email gereklidir.';
    if (formData.email && !emailRegex.test(formData.email)) {
      tempErrors.email = 'Geçersiz email formatı. Örnek format: xxxx@xxxx.xxx';
    }
    if (formData.email && formData.email.length > maxLength) {
      tempErrors.email = 'Email 50 karakterden fazla olamaz.';
    }
    if (formData.email && formData.email.length < minLength) {
      tempErrors.email = 'Email 3 karakterden az olamaz.';
    }
    if (formData.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) { 
      tempErrors.email = 'Geçerli bir email adresi giriniz.'; 
    }

    // Username validation
    tempErrors.username = formData.username ? '' : 'Kullanıcı Adı gereklidir.';
    if (formData.username && formData.username.length > maxLength) {
      tempErrors.username = 'Kullanıcı Adı 50 karakterden fazla olamaz.';
    }
    if (formData.username && formData.username.length < minLength) {
      tempErrors.username = 'Kullanıcı Adı 3 karakterden az olamaz.';
    }

    // Password validation
    tempErrors.password = formData.password ? '' : 'Şifre gereklidir.';
    
    if (formData.password && formData.password.length > maxLength) {
      tempErrors.password = 'Şifre 50 karakterden fazla olamaz.';
    }
    if (formData.password && formData.password.length < minLengthPassword) {
      tempErrors.password = 'Şifre en az 7 karakter uzunluğunda olmalıdır.';
    }
    if (formData.password && !/[A-Z]/.test(formData.password)) {
      tempErrors.password = 'Şifre en az bir büyük harf içermelidir.';
    }
    if (formData.password && !/[a-z]/.test(formData.password)) {
      tempErrors.password = 'Şifre en az bir küçük harf içermelidir.';
    }
    if (formData.password && !/[0-9]/.test(formData.password)) {
      tempErrors.password = 'Şifre en az bir rakam içermelidir.';
    }
    if (formData.password && !/[!@#$%^&*()_+\-=\[\]{};':"|,.<>\/?]/.test(formData.password)) {
      tempErrors.password = 'Şifre en az bir sembol içermelidir.';
    }
    
    // Confirm Password validation
    tempErrors.passwordConfirmed = formData.passwordConfirmed ? '' : 'Şifre Tekrarı gereklidir.';

    if (formData.passwordConfirmed && formData.passwordConfirmed.length > maxLength) {
      tempErrors.passwordConfirmed = 'Şifre Tekrarı 50 karakterden fazla olamaz.';
    }
    if (formData.password && formData.passwordConfirmed && formData.password !== formData.passwordConfirmed) {
      tempErrors.passwordConfirmed = 'Şifreler eşleşmiyor.';
    }
    if (formData.password && formData.password.length < minLengthPassword) {
      tempErrors.password = 'Şifre 7 karakterden az olamaz.';
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
          helperText={errors.password ? errors.password : "En az 7 karakter. Büyük harf, küçük harf, özel karakter ve sayı içermelidir."}
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
          value={formData.passwordConfirmed}
          name="passwordConfirmed"
          placeholder="Şifrenizi Onaylayınız."
          onChange={handleChange}
          required
          error={!!errors.passwordConfirmed}
          helperText={errors.passwordConfirmed}
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


