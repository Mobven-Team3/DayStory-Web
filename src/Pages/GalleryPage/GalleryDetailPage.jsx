import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import loadingimg from '../../assets/images/daystory-logo.png';
import '../GalleryPage/gallery-scss/_gallery-detail.scss';

const GalleryDetailPage = () => {
    const { date } = useParams();
    const [events, setEvents] = useState([]);
    const [imagePath, setImagePath] = useState('');
    const [setError] = useState(null);

    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

    const getDateInfo = (dateString) => {
        const [day, month, year] = dateString.split('-').map(Number);
        const dateObj = new Date(year, month - 1, day);
        const dayNo = day;
        const dayName = days[dateObj.getDay()];
        const monthName = months[dateObj.getMonth()];
        return { dayNo, dayName, monthName, year };
    };

    const { dayNo, dayName, monthName, year } = getDateInfo(date);

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

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://talent.mobven.com:5043/api/DaySummarys/day', {
                    params: {date},
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                if (response.data.data && response.data.data.imagePath) {
                    setImagePath(response.data.data.imagePath);
                } else {
                    setImagePath('');
                    setError(null);
                }
            } catch (error) {
                setError('Resim alınırken bir hata oluştu');
            }
        };
        fetchImage();
    }, [date]);
    

    return (
        <center>
            <div className='detail'>
                <div className='detail__header'>Notlar</div>
                <div className='detail__content'>
                    <div className='detail__generate'>
                        <div className='detail__date'>
                            <p className="detail__date-dayno">{dayNo}</p>
                            <div className='detail__date-info'>
                                <p className="detail__date-dayname">{dayName}</p>
                                <p className="detail__date-month">{monthName} {year}</p>
                            </div>
                        </div>
                        {imagePath && (
                            <div className='detail__img'>
                                <img src={imagePath} alt="Event" />
                            </div>
                        )}
                        {!imagePath && (
                            <center>
                            <div className='detail__loading'>
                              <img src={loadingimg} alt="Event" />
                            </div>
                          </center>
                        )}
                    </div>
                    <div className='detail__notes'>
                        {events.length > 0 && (
                            events.map(event => (
                                <div className='detail__notes-area' key={event.id}>
                                    <p className='detail__notes-title'>{event.title}</p>
                                    <p className='detail__notes-description'>{event.description}</p>
                                </div>
                            ))
                        )}
                        {events.length === 0 && (
                            <div>No events found for this date</div>
                        )}
                    </div>
                </div>
            </div>
        </center>
    );
};

export default GalleryDetailPage;
