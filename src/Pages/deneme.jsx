import axios from 'axios';
import React, { useState } from 'react';

const Event = () => {
    const [date, setDate] = useState('');
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');

    const fetchEvents = async () => {
        setError('');
        if (!date) {
            setError('Tarih boş bırakılamaz');
            return;
        }

        const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
        if (!dateRegex.test(date)) {
            setError('Geçerli bir tarih formatı giriniz (DD-MM-YYYY)');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://165.22.93.225:5003/api/Events/day', {
                params: { date: date },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log(response.data); // API yanıtını konsola yazdır
        
            // Eğer API yanıtında "data" adında bir dizi varsa, onu events değişkenine atayalım
            if (response.data && Array.isArray(response.data.data)) {
                setEvents(response.data.data);
            } else {
                setError('Etkinlikler alınırken bir hata oluştu'); // Yanıt beklenen formatta değilse hata mesajını ayarla
            }
        } catch (error) {
            // Hata yönetimi
        }
        
    };

    return (
        <div>
            <h1>Etkinlikleri Tarihe Göre Getir</h1>
            <input
                type="text"
                placeholder="dd-MM-yyyy"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button onClick={fetchEvents}>Etkinlikleri Getir</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>
                        <p>{event.date} {event.time}</p>
                        <p>Öncelik: {event.priority}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Event;
