// ------------------------------------------------------------------------------------------------------------------------------------
// TAKVİM

// import React, { useEffect, useState } from 'react';

// //css
// import './gallery-scss/_gallery.scss';

// //components
// import Footer from '../Footer/footer';

// const GalleryPage = () => {
//     const [date, setDate] = useState(new Date());
//     const [currentDate, setCurrentDate] = useState(new Date());
//     const [images, setImages] = useState([]);

//         useEffect(() => {
//             const fetchImages = async () => {
//                 const response = await fetch(''); // Replace with your actual API endpoint
//                 const data = await response.json();
//                 setImages(data);
//             };

//             fetchImages();
//             setDate(new Date());
//             setCurrentDate(new Date());
//         }, []);

//     const getDaysInMonth = (year, month) => {
//         return new Date(year, month + 1, 0).getDate();
//     };

//     const getFirstDayOfMonth = (year, month) => {
//         const firstDay = new Date(year, month, 1).getDay();
//         return (firstDay === 0) ? 6 : firstDay - 1;
//     };

//     const daysOfWeek = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
//     const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

//     const renderCalendarForMonth = (year, month) => {
//         const daysInMonth = getDaysInMonth(year, month);
//         const firstDayOfMonth = getFirstDayOfMonth(year, month);
//         const days = [];

//         for (let i = 0; i < firstDayOfMonth; i++) {
//             days.unshift(<div key={`empty-${month}-${i}`} className="empty-day"></div>);
//         }

//         for (let i = 1; i <= daysInMonth; i++) {
//             const day = new Date(year, month, i);
//             const dayOfWeekIndex = day.getDay();
//             const imageUrl = images.find(img => new Date(img.date).toDateString() === day.toDateString())?.imageUrl;

//             if (day <= currentDate) {
//                 days.unshift(
//                     <div
//                         className={'calendar' + (day.getDate() === date.getDate() && day.getMonth() === date.getMonth() && day.getFullYear() === date.getFullYear() ? ' today' : '')}
//                         key={`day-${month}-${i}`}
//                         onClick={() => setDate(day)}
//                     >
//                         <div className="calendar__header">
//                             <p className="calendar__header-dayno">{i}</p>
//                             <div>
//                                 <p className="calendar__header-dayname">{daysOfWeek[dayOfWeekIndex]}</p>
//                                 <p className="calendar__header-month">{months[month]} {year}</p>
//                             </div>
//                         </div>
//                         {imageUrl ? (
//                             <img src={imageUrl} alt={`img`} className="calendar__image" />
//                         ) : (
//                             <div className="calendar__image"></div>
//                         )}
//                     </div>

//                 );
//             }
//         }

//         const totalCells = firstDayOfMonth + daysInMonth;
//         const remainingCells = totalCells % 7;
//         const emptyCells = remainingCells === 0 ? 0 : 7 - remainingCells;
//         for (let i = 0; i < emptyCells; i++) {
//             days.unshift(<div key={`empty-end-${month}-${i}`} className="empty-day"></div>);
//         }

//         return (
//             <div className="month__container" key={month}>
//                 <h2 className='month__container-text'>{months[month]} {year}</h2>
//                 <div className="days">
//                     {days}
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <>
//             {/* <Navbar /> */}
//             <div className='gallery-container'>
//                 {Array.from({ length: currentDate.getMonth() + 1 }, (_, i) => renderCalendarForMonth(2024, i)).reverse()}
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default GalleryPage;

// ------------------------------------------------------------------------------------------------------------------------------------



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login_img from '../../../src/assets/images/login_img.png';
import './gallery-scss/_gallery.scss';

const GalleryPage = () => {
    const [images, setImages] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const response = await axios.get('https://talent.mobven.com:5043/api/DaySummarys/all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = response.data.map(item => ({
                    date: item.date,
                    imageUrl: item.imagePath,
                    title: 'img',
                }));

                const today = new Date();
                const todayStr = today.toLocaleDateString('tr-TR').split('.').reverse().join('-');

                const todayExists = data.some(img => img.date === todayStr.split('-').reverse().join('-'));
                if (todayExists) {
                    navigate(`/notedetail`);
                } else {
                    data.unshift({
                        date: todayStr.split('-').reverse().join('-'),
                        imageUrl: 'https://r.resimlink.com/ErUWpXBD.png',
                        title: "Loading Image"
                    });
                }

                const sortedData = data.sort((a, b) => {
                    const dateA = new Date(a.date.split('-').reverse().join('-'));
                    const dateB = new Date(b.date.split('-').reverse().join('-'));
                    return dateB - dateA;
                });

                setImages(sortedData);
                setSelectedDate(today);
            } catch (error) {
                console.error('Error fetching images:', error);
                // Handle error accordingly
            }
        };

        fetchImages();
    }, [navigate]);

    const renderImages = (images) => {
        return images.map((img, index) => {
            const imgDate = new Date(img.date.split('-').reverse().join('-'));
            const isSelected = selectedDate.toDateString() === imgDate.toDateString();
            const handleClick = () => {
                if (isSelected && img.title === "Loading Image") {
                    navigate('/note');
                } else {
                    navigate(`/gallery/${img.date}`);
                }
            };

            return (
                <div
                    key={index}
                    className={`calendar ${isSelected ? 'today' : ''}`}
                    onClick={handleClick}
                >
                    <div className="calendar__header">
                        <p className="calendar__header-dayno">{imgDate.getDate()}</p>
                        <div>
                            <p className="calendar__header-dayname">{imgDate.toLocaleDateString('tr-TR', { weekday: 'long' })}</p>
                            <p className="calendar__header-month">{imgDate.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>
                    <img src={img.imageUrl} alt={`aysu`} className="calendar__image" />
                </div>
            );
        });
    };

    const renderEmptyState = () => {
        const today = new Date();

        return (
            <div className='empty-content'>
                <div className="empty" onClick={() => navigate('/note')}>
                    <div className="empty__header">
                        <p className="empty-dayno">{today.getDate()}</p>
                        <div className='empty__date'>
                            <p className="empty__date-dayname">{today.toLocaleDateString('tr-TR', { weekday: 'long' })}</p>
                            <p className="empty__date-month">{today.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>
                    <img src='https://r.resimlink.com/ErUWpXBD.png' alt='aysu' className="empty__image" />
                </div>
                <div className="empty__info">
                    <img className="empty__info-img" src={login_img} alt="empty_image" />
                    <p className='empty__info-text'>İlk günün için notlarını al ve kişisel hikayeni oluşturmaya başla!</p>
                </div>
            </div>
        );
    };

    const groupImagesByMonth = () => {
        const groupedImages = images.reduce((acc, img) => {
            const date = new Date(img.date.split('-').reverse().join('-'));
            const monthYear = date.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });

            if (!acc[monthYear]) {
                acc[monthYear] = [];
            }

            acc[monthYear].push(img);
            return acc;
        }, {});

        return groupedImages;
    };

    const renderMonths = () => {
        const groupedImages = groupImagesByMonth();

        return Object.keys(groupedImages).map((monthYear, index) => (
            <div className="month__container" key={index}>
                <h2 className='month__container-text'>{monthYear}</h2>
                <div className="days">
                    {renderImages(groupedImages[monthYear])}
                </div>
            </div>
        ));
    };

    return (
        <div className='gallery-container'>
            {images.length === 0 ? renderEmptyState() : renderMonths()}
        </div>
    );
};

export default GalleryPage;
