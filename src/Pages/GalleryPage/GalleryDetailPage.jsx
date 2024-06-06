
// import React from 'react';
// import { useParams } from 'react-router-dom';

// const data = [
//     { date: '15-04-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
//     { date: '16-04-2024', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
//     { date: '17-04-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
//     { date: '18-04-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
//     { date: '19-04-2024', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
//     { date: '15-05-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
//     { date: '16-05-2024', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
//     { date: '17-05-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
//     { date: '18-05-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
//     { date: '15-03-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
//     { date: '19-05-2024', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
//     { date: '20-05-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
//     { date: '21-05-2024', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
//     { date: '22-05-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
//     { date: '23-03-2024', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
//     { date: '24-02-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
//     { date: '25-05-2024', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
//     { date: '26-05-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
//     { date: '27-05-2024', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
//     { date: '29-05-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
//     { date: '01-06-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
//     { date: '05-06-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
// ];

// const GalleryDetailPage = () => {
//     const { date } = useParams();
//     const image = data.find(img => img.date === date);

//     if (!image) {
//         return <div>Image not found</div>;
//     }

//     return (
//         <div className="gallery-detail">
//             <h1>{image.title}</h1>
//             <img src={image.imageUrl} alt={image.title} />
//             <p>Date: {date}</p>
//         </div>
//     );
// };

// export default GalleryDetailPage;


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getToken } from '../../utils/auth';

// const GalleryDetailPage = () => {
//     const { date } = useParams();
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 const token = getToken();

//                 console.log(token);
//                 console.log({date});
//                 const response = await axios.get('http://165.22.93.225:5003/api/Events/day', {
//                     params: { date },
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 setEvents(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.message);
//                 setLoading(false);
//             }
//         };

//         fetchEvents();
//     }, [date]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (events.length === 0) {
//         return <div>No events found for this date</div>;
//     }

//     return (
//         <div className="gallery-detail">
//             <h1>Events on {date}</h1>
//             {events.map(event => (
//                 <div key={event.Id} className="event">
//                     <h2>{event.title}</h2>
//                     <p>{event.description}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default GalleryDetailPage;

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
                console.log(response.data); // API yanıtını konsola yazdır
            
                // Eğer API yanıtında "data" adında bir dizi varsa, onu events değişkenine atayalım
                if (response.data && Array.isArray(response.data.data)) {
                    setEvents(response.data.data);
                } else {
                    setError('Etkinlikler alınırken bir hata oluştu'); // Yanıt beklenen formatta değilse hata mesajını ayarla
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
