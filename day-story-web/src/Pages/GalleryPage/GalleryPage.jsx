// import React, { useEffect, useState } from 'react';

// //css
// import './gallery-scss/gallery.css';

// //components
// import Footer from '../Footer/footer';

// const GalleryPage = () => {
//     const [date, setDate] = useState(new Date());
//     const [currentDate, setCurrentDate] = useState(new Date());

//     useEffect(() => {
//         setDate(new Date());
//         setCurrentDate(new Date());
//     }, []);

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
//                         <div className="calendar__image"></div>
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









// import React, { useEffect, useState } from 'react';

// //css
// import './gallery-scss/gallery.css';

// //components
// import Footer from '../Footer/footer';

// const GalleryPage = () => {
//     const [date, setDate] = useState(new Date());
//     const [currentDate, setCurrentDate] = useState(new Date());
//     const [images, setImages] = useState([]);

//     useEffect(() => {
//         const fetchImages = async () => {
//             const response = await fetch(''); // Replace with your actual API endpoint
//             const data = await response.json();
//             setImages(data);
//         };

//         fetchImages();
//         setDate(new Date());
//         setCurrentDate(new Date());
//     }, []);

//     const getDaysInMonth = (year, month) => {
//         return new Date(year, month + 1, 0).getDate();
//     };

//     const getFirstDayOfMonth = (year, month) => {
//         const firstDay = new Date(year, month, 1).getDay();
//         return (firstDay === 0) ? 6 : firstDay - 1;
//     };

//     const daysOfWeek = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
//     const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

//    const renderCalendarForMonth = (year, month) => {
//     const daysInMonth = getDaysInMonth(year, month);
//     const firstDayOfMonth = getFirstDayOfMonth(year, month);
//     const days = [];

//     // Boş alanlar için başlangıç ve son eklemeleri
//     for (let i = 0; i < firstDayOfMonth; i++) {
//         days.push(<div key={`empty-start-${month}-${i}`} className="empty-day"></div>);
//     }

//     for (let i = daysInMonth; i > 0; i--) {
//         const day = new Date(year, month, i);
//         const dayOfWeekIndex = day.getDay();
//         const imageUrl = images.find(img => new Date(img.date).toDateString() === day.toDateString())?.imageUrl;

//         if (day <= currentDate) {
//             days.push(
//                 <div
//                     className={'calendar' + (day.getDate() === date.getDate() && day.getMonth() === date.getMonth() && day.getFullYear() === date.getFullYear() ? ' today' : '')}
//                     key={`day-${month}-${i}`}
//                     onClick={() => setDate(day)}
//                 >
//                     <div className="calendar__header">
//                         <p className="calendar__header-dayno">{i}</p>
//                         <div>
//                             <p className="calendar__header-dayname">{daysOfWeek[dayOfWeekIndex]}</p>
//                             <p className="calendar__header-month">{months[month]} {year}</p>
//                         </div>
//                     </div>
//                     {imageUrl ? (
//                         <img src={imageUrl} alt={`img`} className="calendar__image" />
//                     ) : (
//                         <div className="calendar__image default-image"></div>
//                     )}
//                 </div>
//             );
//         }
//     }

//     // Pazartesileri en solda görmek için eklenen boş günler
//     const remainingCells = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
//     for (let i = 0; i < remainingCells; i++) {
//         days.push(<div key={`empty-end-${month}-${i}`} className="empty-day"></div>);
//     }

//     return (
//         <div className="month__container" key={month}>
//             <h2 className='month__container-text'>{months[month]} {year}</h2>
//             <div className="days">
//                 {days}
//             </div>
//         </div>
//     );
// };


//     return (
//         <>
//             {/* <Navbar /> */}
//             <div className='gallery-container'>
//                 {Array.from({ length: currentDate.getMonth() + 1 }, (_, i) => renderCalendarForMonth(currentDate.getFullYear(), i)).reverse()}
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default GalleryPage;




import React, { useEffect, useState } from 'react';

//css
import './gallery-scss/gallery.css';

//components
import Footer from '../Footer/footer';

const GalleryPage = () => {
    const [date, setDate] = useState(new Date());
    const [currentDate, setCurrentDate] = useState(new Date());
    const [images, setImages] = useState([]);

        useEffect(() => {
            const fetchImages = async () => {
                const response = await fetch(''); // Replace with your actual API endpoint
                const data = await response.json();
                setImages(data);
            };
    
            fetchImages();
            setDate(new Date());
            setCurrentDate(new Date());
        }, []);

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        const firstDay = new Date(year, month, 1).getDay();
        return (firstDay === 0) ? 6 : firstDay - 1;
    };

    const daysOfWeek = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

    const renderCalendarForMonth = (year, month) => {
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = getFirstDayOfMonth(year, month);
        const days = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.unshift(<div key={`empty-${month}-${i}`} className="empty-day"></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = new Date(year, month, i);
            const dayOfWeekIndex = day.getDay();
            const imageUrl = images.find(img => new Date(img.date).toDateString() === day.toDateString())?.imageUrl;

            if (day <= currentDate) {
                days.unshift(
                    <div
                        className={'calendar' + (day.getDate() === date.getDate() && day.getMonth() === date.getMonth() && day.getFullYear() === date.getFullYear() ? ' today' : '')}
                        key={`day-${month}-${i}`}
                        onClick={() => setDate(day)}
                    >
                        <div className="calendar__header">
                            <p className="calendar__header-dayno">{i}</p>
                            <div>
                                <p className="calendar__header-dayname">{daysOfWeek[dayOfWeekIndex]}</p>
                                <p className="calendar__header-month">{months[month]} {year}</p>
                            </div>
                        </div>
                        {imageUrl ? (
                            <img src={imageUrl} alt={`img`} className="calendar__image" />
                        ) : (
                            <div className="calendar__image"></div>
                        )}
                    </div>

                );
            }
        }

        const totalCells = firstDayOfMonth + daysInMonth;
        const remainingCells = totalCells % 7;
        const emptyCells = remainingCells === 0 ? 0 : 7 - remainingCells;
        for (let i = 0; i < emptyCells; i++) {
            days.unshift(<div key={`empty-end-${month}-${i}`} className="empty-day"></div>);
        }

        return (
            <div className="month__container" key={month}>
                <h2 className='month__container-text'>{months[month]} {year}</h2>
                <div className="days">
                    {days}
                </div>
            </div>
        );
    };

    return (
        <>
            {/* <Navbar /> */}
            <div className='gallery-container'>
                {Array.from({ length: currentDate.getMonth() + 1 }, (_, i) => renderCalendarForMonth(2024, i)).reverse()}
            </div>
            <Footer />
        </>
    );
};

export default GalleryPage;