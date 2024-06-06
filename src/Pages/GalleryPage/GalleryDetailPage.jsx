import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GalleryDetailPage = () => {
    const { date } = useParams();
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://165.22.93.225:5003/api/Events/day', {
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
                setError('Etkinlikleri alınırken bir hata oluştu');
            }
        };

        fetchEvents();
    }, [date]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (events.length === 0) {
        return <div>No events found for this date</div>;
    }

    return (
        <center>
        <div>
                {events.map(event => (
                    <p key={event.id}>
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>
                        <p>{event.date} {event.time}</p>
                        <p>Öncelik: {event.priority}</p>
                    </p>
                ))}
        
            </div>
            </center>
    );
};

export default GalleryDetailPage;
