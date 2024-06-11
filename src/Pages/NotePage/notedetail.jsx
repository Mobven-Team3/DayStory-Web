// import React, { useEffect, useState } from 'react';
// import NavigationBar from '../../../src/Pages/Navbar/Navbar';
// import { useNotes } from './NotePage';  // NotesContext burada NoteApp'den geliyor
// import "./note-scss/_note.scss";

// const NoteDetail = () => {
//     const { notes } = useNotes();

//     const formatDateDetails = (dateString) => {
//         const date = new Date(dateString);
//         const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//         const formattedDate = date.toLocaleDateString('tr-TR', options);

//         const dayNo = date.getDate();
//         const dayName = date.toLocaleDateString('tr-TR', { weekday: 'long' });
//         const monthName = date.toLocaleDateString('tr-TR', { month: 'long' });
//         const year = date.getFullYear();

//         return { dayNo, dayName, monthName, year, formattedDate };
//     };

//     const [currentDateDetails, setCurrentDateDetails] = useState({
//         dayNo: '',
//         dayName: '',
//         monthName: '',
//         year: '',
//         formattedDate: ''
//     });

//     useEffect(() => {
//         const { dayNo, dayName, monthName, year, formattedDate } = formatDateDetails(new Date());
//         setCurrentDateDetails({ dayNo, dayName, monthName, year, formattedDate });
//     }, []);

//     return (
//         <div>
//             <NavigationBar />
//             <div className="note-detail-container">
//                 <div className="detail__date">
//                     <p className="detail__date-dayno">{currentDateDetails.dayNo}</p>
//                     <div className="detail__date-info">
//                         <p className="detail__date-dayname">{currentDateDetails.dayName}</p>
//                         <p className="detail__date-monthname">{currentDateDetails.monthName}</p>
//                         <p className="detail__date-year">{currentDateDetails.year}</p>
//                     </div>
//                 </div>
//                 <h1>Not Detayı</h1>
//                 {notes.map(note => (
//                     <div key={note.id} className="note">
//                         <h3>{note.title}</h3>
//                         <p>{note.description}</p>
//                         <p>{note.date}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default NoteDetail;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box } from '@mui/material';
import NavigationBar from '../../../src/Pages/Navbar/Navbar';
import "./note-scss/_note.scss";

const NoteDetailPage = () => {
    const date = "11-06-2024"; // Tarihi burada sabit olarak kullanıyoruz
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

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

    const formatDateDetails = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('tr-TR', options);

        const dayNo = date.getDate();
        const dayName = date.toLocaleDateString('tr-TR', { weekday: 'long' });
        const monthName = date.toLocaleDateString('tr-TR', { month: 'long' });
        const year = date.getFullYear();

        return { dayNo, dayName, monthName, year, formattedDate };
    };

    const currentDateDetails = formatDateDetails(date);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (events.length === 0) {
        return <div>No events found for this date</div>;
    }

    return (
        <Container className="note-detail-page">
            <NavigationBar showFullMenu={false} />
            <center>
                <div className='detail'>
                    <div className='detail__header'>Notlar</div>
                    <div className='detail__content'>
                        <div className='detail__generate'>
                            <div className='detail__date'>
                                <p className="detail__date-dayno">{currentDateDetails.dayNo}</p>
                                <div className='detail__date-info'>
                                    <p className="detail__date-dayname">{currentDateDetails.dayName}</p>
                                    <p className="detail__date-month">{currentDateDetails.monthName} {currentDateDetails.year}</p>
                                </div>
                            </div>
                        </div>
                        <div className='detail__notes'>
                            {events.map(event => (
                                <div className='detail__notes-area' key={event.id}>
                                    <p className='detail__notes-title'>{event.title}</p>
                                    <p className='detail__notes-description'>{event.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </center>
        </Container>
    );
};

export default NoteDetailPage;
