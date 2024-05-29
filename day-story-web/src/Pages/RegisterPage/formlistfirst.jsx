import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//css
import './register-scss/RegisterPage.css';

// components
import {
    Button, FormControl, FormHelperText, IconButton, InputAdornment,
    InputLabel, MenuItem, Select, TextField
} from '@mui/material';

//icons
import { AiOutlineCloseCircle } from 'react-icons/ai';



const FormListFirst = ({ formData, handleChange, handleGenderChange, nextbutton }) => {
    const navigate = useNavigate();
    const handleLoginPageClick = () => {
        navigate('/login');
    };

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        birthdate: '',
    });

    const validate = () => {
        let tempErrors = {};
        tempErrors.firstName = formData.firstName ? '' : 'İsim gereklidir.';
        tempErrors.lastName = formData.lastName ? '' : 'Soyisim gereklidir.';
        tempErrors.gender = formData.gender ? '' : 'Cinsiyet seçimi gereklidir.';
        if (!formData.birthdate) {
            tempErrors.gender = formData.gender ? '' :  'Doğum tarihi gereklidir.';
        } else {
            const year = formData.birthdate.split('-')[0];
            tempErrors.birthdate = year.length === 4 ? '' : 'Yıl 4 haneli olmalıdır.';
        }
        setErrors(tempErrors);

        return Object.values(tempErrors).every(x => x === '');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            nextbutton();
        }
    }

    const handleClear = (field) => {
        handleChange({
            target: {
                name: field,
                value: ''
            }
        });
    };

    return (
        <>
            <div className='form__list-header'>Yeni Hesap Oluştur</div>
            <form className='form__list-items' onSubmit={handleSubmit} noValidate>
                <p>Kişisel bilgilerinizi giriniz.</p>

                <TextField
                    label="İsim"
                    name="firstName"
                    placeholder="İsminizi yazınız."
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        endAdornment: (
                            formData.firstName && (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="clear input"
                                        onClick={() => handleClear('firstName')}
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
                    label="Soyisim"
                    name="lastName"
                    placeholder="Soyisminizi yazınız."
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        endAdornment: (
                            formData.lastName && (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="clear input"
                                        onClick={() => handleClear('lastName')}
                                        edge="end"
                                    >
                                        <AiOutlineCloseCircle />
                                    </IconButton>
                                </InputAdornment>
                            )
                        )
                    }}
                />

                <div className='form__list-item'>
                    <FormControl fullWidth margin="normal" error={!!errors.gender}>
                        <InputLabel>Cinsiyet</InputLabel>
                        <Select
                            label="Cinsiyet"
                            name="gender"
                            value={formData.gender}
                            onChange={handleGenderChange}
                            required
                        >
                            <MenuItem value="Kadın">Kadın</MenuItem>
                            <MenuItem value="Erkek">Erkek</MenuItem>
                            <MenuItem value="Belirtme">Belirtme</MenuItem>
                        </Select>
                        {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                    </FormControl>

                    <TextField
                        type="date"
                        name="birthdate"
                        label="Doğum Tarihi"
                        value={formData.birthdate}
                        onChange={handleChange}
                        required
                        error={!!errors.birthdate}
                        helperText={errors.birthdate}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                </div>

                <div className='form__list-button'>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Devam
                    </Button>

                    <div className='form__list-footer'>
                        <p>Zaten bir hesabın var mı? <span onClick={handleLoginPageClick}>Giriş Yap</span></p>
                    </div>
                </div>
            </form>
        </>
    );
}

export default FormListFirst;

