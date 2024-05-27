

import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';

const MyForm = () => {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        name: false,
        email: false,
        password: false,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: false,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = {
            name: !formValues.name,
            email: !formValues.email,
            password: !formValues.password,
        };

        setErrors(newErrors);

        if (!Object.values(newErrors).some(Boolean)) {
            // Tüm validasyonlar geçti, formu gönder
            console.log('Form submitted:', formValues);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <TextField
                label="Name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                required
                error={errors.name}
                helperText={errors.name && 'Name is required'}
                variant="outlined"
            />
            <TextField
                label="Email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                required
                error={errors.email}
                helperText={errors.email && 'Email is required'}
                variant="outlined"
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={formValues.password}
                onChange={handleChange}
                required
                error={errors.password}
                helperText={errors.password && 'Password is required'}
                variant="outlined"
            />
            <Button type="submit" variant="contained">
                Submit
            </Button>
        </Box>
    );
};

export default MyForm;
