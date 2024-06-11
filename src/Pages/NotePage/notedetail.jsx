import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box } from '@mui/material';
import NavigationBar from '../../../src/Pages/Navbar/Navbar';
import "./note-scss/_note.scss";


useEffect(() => {
    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://talent.mobven.com:5043/api/Events/day', {
                params: { date },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (response.data && Array.isArray(response.data.data)) {
                setEvents(response.data.data);
            } else {
                setError('Etkinlikler alınırken bir hata oluştu');
            }
        } catch (error) {
            setError('Etkinlikler alınırken bir hata oluştu');
        }
    };

    fetchEvents();
}, [date]);
