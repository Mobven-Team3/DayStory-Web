// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './gallery-scss/_gallery-detail.scss';

// const GalleryDetailPage = () => {
//     const { date } = useParams();
//     const [events, setEvents] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get('http://165.22.93.225:5003/api/Events/day', {
//                     params: { date },
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     }
//                 });
//                 if (response.data && Array.isArray(response.data.data)) {
//                     setEvents(response.data.data);
//                 } else {
//                     setError('Etkinlikler alınırken bir hata oluştu');
//                 }
//             } catch (error) {
//                 setError('Etkinlikleri alınırken bir hata oluştu');
//             }
//         };

//         fetchEvents();
//     }, [date]);


//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (events.length === 0) {
//         return <div>No events found for this date</div>;
//     }

//     return (
//         <center>
//             <div className='detail'>

//                 <div className='detail__header'>Notlar</div>

//                 <div className='detail__content'>
//                     <div className='detail__generate'>
//                         <div className='detail__date'>tarih</div>
//                         <div className='detail_img'>resim</div>
//                     </div>
//                     <div>
//                         {events.map(event => (
//                         <p key={event.id}>
//                             <h2>{event.title}</h2>
//                             <p>{event.description}</p>
//                             <p>{event.date} {event.time}</p>
//                             <p>Öncelik: {event.priority}</p>
//                         </p>
//                     ))}
//                     </div>
//                 </div>
//             </div>

//         </center>
//     );
// };

// export default GalleryDetailPage;




// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './gallery-scss/_gallery-detail.scss';



// const GalleryDetailPage = () => {
//     const { date } = useParams();
//     const [events, setEvents] = useState([]);
//     // const [image, setImage] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get('http://165.22.93.225:5003/api/Events/day', {
//                     params: { date },
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     }
//                 });
//                 if (response.data && Array.isArray(response.data.data)) {
//                     setEvents(response.data.data);
//                 } else {
//                     setError('Etkinlikler alınırken bir hata oluştu');
//                 }
//             } catch (error) {
//                 setError('Etkinlikleri alınırken bir hata oluştu');
//             }
//         };

//         fetchEvents();
//     }, [date]);

//     // useEffect(() => {
//     //     const fetchImage = async () => {
//     //         try {
//     //             const token = localStorage.getItem('token');
//     //             const response = await axios.get('', {
//     //                 headers: {
//     //                     'Authorization': `Bearer ${token}`,
//     //                     'Content-Type': 'application/json',
//     //                 }
//     //             });
//     //             if (response.data && response.data.url) {
//     //                 setImage(response.data.url);
//     //             } else {
//     //                 setError('Resim alınırken bir hata oluştu');
//     //             }
//     //         } catch (error) {
//     //             setError('Resim alınırken bir hata oluştu');
//     //         }
//     //     };

//     //     fetchImage();
//     // }, []);

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (events.length === 0) {
//         return <div>No events found for this date</div>;
//     }

//     return (
//         <center>
//             <div className='detail'>

//                 <div className='detail__header'>Notlar</div>

//                 <div className='detail__content'>
//                     <div className='detail__generate'>
//                         <div className='detail__date'>
//                             <p className="detail__date-dayno">{date}</p>
//                                 <div className='detail__date-info'>
//                                     <p className="detail__date-dayname">{date}</p>
//                                     <p className="detail__date-month">{date}</p>
//                                 </div>
//                         </div>
//                         <div className='detail__img'>
//                             {/* {image ? <img src={image} alt="Event" /> : 'Resim yükleniyor...'} */}
//                         </div>
//                     </div>
//                     <div className='detail__notes'>

//                     {/* <div className='detail__notes-area'>
//                             <h2 className='detail__notes-title'>Başlık</h2>
//                             <p className='detail__notes-description'>Supporting line text lorem ipsum dolor sit amet, consectetur</p>
//                         </div> */}


//                         {events.map(event => (
//                         <div className='detail__notes-area' key={event.id}>
//                             <h2 className='detail__notes-title'>{event.title}</h2>
//                             <p className='detail__notes-description'>{event.description}</p>
//                         </div>
//                     ))} 
//                     </div>
//                 </div>
//             </div>

//         </center>
//     );
// };

// export default GalleryDetailPage;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './gallery-scss/_gallery-detail.scss';

const GalleryDetailPage = () => {
    const { date } = useParams();
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);

    const months = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];

    const days = [
        'Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'
    ];

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



    // useEffect(() => {
    //     const fetchImage = async () => {
    //         try {
    //             const token = localStorage.getItem('token');
    //             const response = await axios.get('dsfs', {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                     'Content-Type': 'application/json',
    //                 }
    //             });
    //             if (response.data && response.data.url) {
    //                 setImage(response.data.url);
    //             } else {
    //                 setError('Resim alınırken bir hata oluştu');
    //             }
    //         } catch (error) {
    //             setError('Resim alınırken bir hata oluştu');
    //         }
    //     };

    //     fetchImage();
    // }, [image]);


    if (error) {
        return <div>Error: {error}</div>;
    }

    if (events.length === 0) {
        return <div>No events found for this date</div>;
    }

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
                                <p className="detail__date-month">{monthName}{year}</p>
                            </div>
                        </div>
                        <div className='detail__img'>
                            {/* {image ? <img src={image} alt="Event" /> : 'Resim yükleniyor...'} */}
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
    );
};

export default GalleryDetailPage;
