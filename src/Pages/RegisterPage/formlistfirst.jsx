import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';
import 'dayjs/locale/tr';

//css
import './register-scss/_register.scss';

//components
import {
    Button, FormControl, FormHelperText, IconButton, InputAdornment,
    InputLabel, MenuItem, Select, TextField
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

//icons
import { AiOutlineCloseCircle } from 'react-icons/ai';

const FormListFirst = ({ formData, handleChange, handleGenderChange, nextbutton }) => {
    const minDate = dayjs('1924-01-01');
    const maxDate = dayjs('2019-12-31');

    const navigate = useNavigate();
    const handleLoginPageClick = () => {
        navigate('/login');
    };

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        birthDate: '',
    });

    const validate = () => {
        let tempErrors = {};
        const maxLength = 50;
        const minLength = 2;

        const calculateAge = (birthDate) => {
            const birthYear = new Date(birthDate).getFullYear();
            const currentYear = new Date().getFullYear();
            return currentYear - birthYear;
        }

        tempErrors.firstName = formData.firstName ? '' : 'İsim gereklidir.';
        if (formData.firstName && formData.firstName.length > maxLength) {
            tempErrors.firstName = 'İsim 50 karakterden fazla olamaz.';
        } if (formData.firstName && formData.firstName.length < minLength) {
            tempErrors.firstName = 'İsim 2 karakterden az olamaz.';
        }
        if (formData.firstName && !/^[a-zA-ZğüşöçIıİĞÜŞÖÇ\s]+$/.test(formData.firstName)) {
            tempErrors.firstName = 'İsim sadece harflerden oluşabilir.';
        }

        tempErrors.lastName = formData.lastName ? '' : 'Soyisim gereklidir.';
        if (formData.lastName && formData.lastName.length > maxLength) {
            tempErrors.lastName = 'Soyisim 50 karakterden fazla olamaz.';
        } if (formData.lastName && formData.lastName.length < minLength) {
            tempErrors.lastName = 'İsim 2 karakterden az olamaz.';
        }
        if (formData.lastName && !/^[a-zA-ZğüşöçIıİĞÜŞÖÇ\s]+$/.test(formData.lastName)) {
            tempErrors.lastName = 'İsim sadece harflerden oluşabilir.';
        }

        tempErrors.gender = formData.gender ? '' : 'Cinsiyet seçimi gereklidir.';

        tempErrors.birthDate = formData.birthDate ? '' : 'Doğum tarihi gereklidir.';
        if (formData.birthDate) {
            const birthDate = dayjs(formData.birthDate, 'DD-MM-YYYY');
            if (!birthDate.isValid() || birthDate.isBefore(minDate) || birthDate.isAfter(maxDate)) {
                tempErrors.birthDate = 'Geçersiz doğum tarihi.';
            } else {
                const age = calculateAge(formData.birthDate);
                if (age < 5 || age > 100) {
                    tempErrors.birthDate = 'Geçersiz doğum tarihi.';
                }
            }
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
                    <FormControl className="cinsiyet" error={!!errors.gender}>
                        <InputLabel>Cinsiyet</InputLabel>
                        <Select
                            label="Cinsiyet"
                            name="gender"
                            value={formData.gender}
                            onChange={handleGenderChange}
                            required
                        >
                            <MenuItem value="Female">Kadın</MenuItem>
                            <MenuItem value="Male">Erkek</MenuItem>
                            <MenuItem value="NotSpecified">Belirtmek İstemiyorum</MenuItem>
                            <MenuItem value="Other">Diğer</MenuItem>

                        </Select>
                        {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                    </FormControl>


                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"tr"}>
                        <DatePicker
                            label='Doğum Tarihi'
                            onChange={(date) => handleChange({
                                target: {
                                    name: 'birthDate',
                                    value: date ? date.format('DD-MM-YYYY') : ''
                                }
                            })}
                            format='DD-MM-YYYY'
                            disableFuture
                            minDate={minDate}
                            maxDate={maxDate}
                            slotProps={{
                                textField: {
                                    helperText: errors.birthDate,
                                    error: Boolean(errors.birthDate),
                                },
                            }}
                        />
                    </LocalizationProvider>

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
