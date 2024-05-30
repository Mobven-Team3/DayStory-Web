// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// //css
// import './register-scss/RegisterPage.css';

// // components
// import {
//     Button, FormControl, FormHelperText, IconButton, InputAdornment,
//     InputLabel, MenuItem, Select, TextField
// } from '@mui/material';

// //icons
// import { AiOutlineCloseCircle } from 'react-icons/ai';



// const FormListFirst = ({ formData, handleChange, handleGenderChange, nextbutton }) => {
//     const navigate = useNavigate();
//     const handleLoginPageClick = () => {
//         navigate('/login');
//     };

//     const [errors, setErrors] = useState({
//         firstName: '',
//         lastName: '',
//         gender: '',
//         birthdate: '',
//     });

//     const validate = () => {
//         let tempErrors = {};
//         tempErrors.firstName = formData.firstName ? '' : 'İsim gereklidir.';
//         tempErrors.lastName = formData.lastName ? '' : 'Soyisim gereklidir.';
//         tempErrors.gender = formData.gender ? '' : 'Cinsiyet seçimi gereklidir.';
//         if (!formData.birthdate) {
//             tempErrors.gender = formData.gender ? '' :  'Doğum tarihi gereklidir.';
//         } else {
//             const year = formData.birthdate.split('-')[0];
//             tempErrors.birthdate = year.length === 4 ? '' : 'Yıl 4 haneli olmalıdır.';
//         }
//         setErrors(tempErrors);

//         return Object.values(tempErrors).every(x => x === '');
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (validate()) {
//             nextbutton();
//         }
//     }

//     const handleClear = (field) => {
//         handleChange({
//             target: {
//                 name: field,
//                 value: ''
//             }
//         });
//     };

//     return (
//         <>
//             <div className='form__list-header'>Yeni Hesap Oluştur</div>
//             <form className='form__list-items' onSubmit={handleSubmit} noValidate>
//                 <p>Kişisel bilgilerinizi giriniz.</p>

//                 <TextField
//                     label="İsim"
//                     name="firstName"
//                     placeholder="İsminizi yazınız."
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     required
//                     error={!!errors.firstName}
//                     helperText={errors.firstName}
//                     fullWidth
//                     margin="normal"
//                     InputProps={{
//                         endAdornment: (
//                             formData.firstName && (
//                                 <InputAdornment position="end">
//                                     <IconButton
//                                         aria-label="clear input"
//                                         onClick={() => handleClear('firstName')}
//                                         edge="end"
//                                     >
//                                         <AiOutlineCloseCircle />
//                                     </IconButton>
//                                 </InputAdornment>
//                             )
//                         )
//                     }}
//                 />

//                 <TextField
//                     label="Soyisim"
//                     name="lastName"
//                     placeholder="Soyisminizi yazınız."
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     required
//                     error={!!errors.lastName}
//                     helperText={errors.lastName}
//                     fullWidth
//                     margin="normal"
//                     InputProps={{
//                         endAdornment: (
//                             formData.lastName && (
//                                 <InputAdornment position="end">
//                                     <IconButton
//                                         aria-label="clear input"
//                                         onClick={() => handleClear('lastName')}
//                                         edge="end"
//                                     >
//                                         <AiOutlineCloseCircle />
//                                     </IconButton>
//                                 </InputAdornment>
//                             )
//                         )
//                     }}
//                 />

//                 <div className='form__list-item'>
//                     <FormControl fullWidth margin="normal" error={!!errors.gender}>
//                         <InputLabel>Cinsiyet</InputLabel>
//                         <Select
//                             label="Cinsiyet"
//                             name="gender"
//                             value={formData.gender}
//                             onChange={handleGenderChange}
//                             required
//                         >
//                             <MenuItem value="Kadın">Kadın</MenuItem>
//                             <MenuItem value="Erkek">Erkek</MenuItem>
//                             <MenuItem value="Belirtme">Belirtme</MenuItem>
//                         </Select>
//                         {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
//                     </FormControl>

//                     <TextField
//                         type="date"
//                         name="birthdate"
//                         label="Doğum Tarihi"
//                         value={formData.birthdate}
//                         onChange={handleChange}
//                         required
//                         error={!!errors.birthdate}
//                         helperText={errors.birthdate}
//                         fullWidth
//                         margin="normal"
//                         InputLabelProps={{ shrink: true }}
//                         inputProps={{
//                             max: "2024-12-30",
//                             min: "1993-01-01"
//                         }}
//                     />
//                 </div>

//                 <div className='form__list-button'>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         type="submit"
//                     >
//                         Devam
//                     </Button>

//                     <div className='form__list-footer'>
//                         <p>Zaten bir hesabın var mı? <span onClick={handleLoginPageClick}>Giriş Yap</span></p>
//                     </div>
//                 </div>
//             </form>
//         </>
//     );
// }

// export default FormListFirst;



// import {
//     Button, FormControl, FormHelperText, IconButton, InputAdornment,
//     InputLabel, MenuItem, Select, TextField
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from 'dayjs';
// import React, { useState } from 'react';
// import { AiOutlineCloseCircle } from 'react-icons/ai';
// import { useNavigate } from 'react-router-dom';
// import './register-scss/RegisterPage.css';

// const FormListFirst = ({ formData, handleChange, handleGenderChange, nextbutton }) => {
//     const navigate = useNavigate();
//     const handleLoginPageClick = () => {
//         navigate('/login');
//     };

//     const [errors, setErrors] = useState({
//         firstName: '',
//         lastName: '',
//         gender: '',
//         birthdate: '',
//     });

//     const validate = () => {
//         let tempErrors = {};
//         tempErrors.firstName = formData.firstName ? '' : 'İsim gereklidir.';
//         tempErrors.lastName = formData.lastName ? '' : 'Soyisim gereklidir.';
//         tempErrors.gender = formData.gender ? '' : 'Cinsiyet seçimi gereklidir.';
//         tempErrors.birthdate = formData.birthdate ? '' : 'Doğum tarihi gereklidir.';
//         setErrors(tempErrors);

//         return Object.values(tempErrors).every(x => x === '');
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (validate()) {
//             nextbutton();
//         }
//     }

//     const handleClear = (field) => {
//         handleChange({
//             target: {
//                 name: field,
//                 value: ''
//             }
//         });
//     };

//     return (
//         <>
//             <div className='form__list-header'>Yeni Hesap Oluştur</div>
//             <form className='form__list-items' onSubmit={handleSubmit} noValidate>
//                 <p>Kişisel bilgilerinizi giriniz.</p>

//                 <TextField
//                     label="İsim"
//                     name="firstName"
//                     placeholder="İsminizi yazınız."
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     required
//                     error={!!errors.firstName}
//                     helperText={errors.firstName}
//                     fullWidth
//                     margin="normal"
//                     InputProps={{
//                         endAdornment: (
//                             formData.firstName && (
//                                 <InputAdornment position="end">
//                                     <IconButton
//                                         aria-label="clear input"
//                                         onClick={() => handleClear('firstName')}
//                                         edge="end"
//                                     >
//                                         <AiOutlineCloseCircle />
//                                     </IconButton>
//                                 </InputAdornment>
//                             )
//                         )
//                     }}
//                 />

//                 <TextField
//                     label="Soyisim"
//                     name="lastName"
//                     placeholder="Soyisminizi yazınız."
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     required
//                     error={!!errors.lastName}
//                     helperText={errors.lastName}
//                     fullWidth
//                     margin="normal"
//                     InputProps={{
//                         endAdornment: (
//                             formData.lastName && (
//                                 <InputAdornment position="end">
//                                     <IconButton
//                                         aria-label="clear input"
//                                         onClick={() => handleClear('lastName')}
//                                         edge="end"
//                                     >
//                                         <AiOutlineCloseCircle />
//                                     </IconButton>
//                                 </InputAdornment>
//                             )
//                         )
//                     }}
//                 />

//                 <div className='form__list-item'>
//                     <FormControl className="cinsiyet" error={!!errors.gender}>
//                         <InputLabel>Cinsiyet</InputLabel>
//                         <Select
//                             label="Cinsiyet"
//                             name="gender"
//                             value={formData.gender}
//                             onChange={handleGenderChange}
//                             required
//                         >
//                             <MenuItem value="Kadın">Kadın</MenuItem>
//                             <MenuItem value="Erkek">Erkek</MenuItem>
//                             <MenuItem value="Belirtme">Belirtme</MenuItem>
//                         </Select>
//                         {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
//                     </FormControl>


//                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                         <DatePicker
//                             label="Doğum Tarihi"
//                             value={formData.birthdate ? dayjs(formData.birthdate) : null}
//                             onChange={(date) => handleChange({
//                                 target: {
//                                     name: 'birthdate',
//                                     value: date ? date.format('DD-MM-YYYY') : ''
//                                 }
//                             })}
//                             renderInput={(params) => (
//                                 <TextField
//                                     {...params}
//                                     required
//                                     error={!!errors.birthdate}
//                                     helperText={errors.birthdate}
//                                     fullWidth
//                                     margin="normal"
//                                     InputLabelProps={{ shrink: true }}
//                                 />
//                             )}
//                         />
//                     </LocalizationProvider>
//                 </div>

//                 <div className='form__list-button'>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         type="submit"
//                     >
//                         Devam
//                     </Button>

//                     <div className='form__list-footer'>
//                         <p>Zaten bir hesabın var mı? <span onClick={handleLoginPageClick}>Giriş Yap</span></p>
//                     </div>
//                 </div>
//             </form>
//         </>
//     );
// }

// export default FormListFirst;


import {
    Button, FormControl, FormHelperText, IconButton, InputAdornment,
    InputLabel, MenuItem, Select, TextField
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';


// import {, ThemeProvider, createTheme} from '@mui/material';

// const theme = createTheme({
//     components: {
//         MuiTextField: {
//             defaultProps: {
//                 variant: 'outlined',
//             },
//             styleOverrides: {
//                 root: {
//                     '& .MuiInputLabel-outlined.Mui-focused': {
//                         color: 'rgba(73, 69, 79, 1)',
//                     },

//                     '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                         borderColor: 'rgba(121, 116, 126, 1)',
//                     },


//                 },
//             },
//         },

//         MuiFormControl: {
//             styleOverrides: {
//                 root: {
//                     '& .MuiInputLabel-outlined.Mui-focused': {
//                         color: 'rgba(73, 69, 79, 1)',
//                     },

//                     '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                         borderColor: 'rgba(121, 116, 126, 1)',
//                     },


//                 },
//             },

//         }



//     },
// });

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
        tempErrors.birthdate = formData.birthdate ? '' : 'Doğum tarihi gereklidir.';
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
        // <ThemeProvider theme={theme}>
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
                            <MenuItem value="Kadın">Kadın</MenuItem>
                            <MenuItem value="Erkek">Erkek</MenuItem>
                            <MenuItem value="Belirtmek İstemiyorum">Belirtmek İstemiyorum</MenuItem>
                            <MenuItem value="Diğer">Diğer</MenuItem>

                        </Select>
                        {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                    </FormControl>

                    <LocalizationProvider 
                        dateAdapter={AdapterDayjs} 
                    >
                        <DatePicker
                            value={formData.birthdate ? dayjs(formData.birthdate) : null}
                            onChange={(date) => handleChange({
                                target: {
                                    name: 'birthdate',
                                    value: date ? date.format('MM-DD-YYYY') : ''
                                }
                            })}
                            disableFuture
                            slotProps={{
                                textField: {
                                    helperText: errors.birthdate,
                                    error: errors.birthdate
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
