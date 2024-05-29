// ------------------------------------------------------------------------------------------------------------------------------------
// TAKVİM

// import React, { useEffect, useState } from 'react';

// //css
// import './gallery-scss/gallery.css';

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

// import React, { useEffect, useState } from 'react';

// //css
// import './gallery-scss/gallery.css';

// //components
// import Footer from '../Footer/footer';

// const GalleryPage = () => {
//     const [images, setImages] = useState([]);
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const today = new Date();

//     useEffect(() => {
//         const fetchImages = async () => {
//             // Bu statik veri, API'den gelecek verilerin yerine kullanılacak
//             const data = [
//                 { date: '2024-05-15', imageUrl: '', title: 'img' },
//                 { date: '2024-05-20', imageUrl: '', title: 'img' },
//                 { date: '2024-06-10', imageUrl: '', title: 'img' },
//                 { date: '2024-06-15', imageUrl: '', title: 'img' },
//                 { date: '2024-05-29', imageUrl: '', title: 'img' },
//             ];
            
//             // Güncel tarihli veri kontrolü
//             const todayExists = data.some(img => new Date(img.date).toDateString() === today.toDateString());

//             // Eğer güncel tarihli veri yoksa ekle
//             if (!todayExists) {
//                 data.unshift({ date: today.toISOString(), imageUrl: 'https://www.petimce.com/i/l/002/0024015_en-populer-kedi-cinsleri-ve-benzersiz-ozellikleri.jpeg', title: 'Today\'s Image' });
//             }
            
//             setImages(data);
//             setSelectedDate(today);
//         };

//         fetchImages();
//     }, [today]);

//     const renderImages = () => {
//         return images.map((img, index) => {
//             const imgDate = new Date(img.date);
//             const isSelected = selectedDate.toDateString() === imgDate.toDateString();
//             return (
//                 <button
//                     key={index}
//                     className={`calendar ${isSelected ? 'today' : ''}`}
//                     onClick={() => setSelectedDate(imgDate)}
//                 >
//                     <div className="calendar__header">
//                         <p className="calendar__header-dayno">{imgDate.getDate()}</p>
//                         <div>
//                             <p className="calendar__header-dayname">{imgDate.toLocaleDateString('tr-TR', { weekday: 'long' })}</p>
//                             <p className="calendar__header-month">{imgDate.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}</p>
//                         </div>
//                     </div>
//                     <img src={img.imageUrl} alt={`Image ${index + 1}`} className="calendar__image" />
//                 </button>
//             );
//         });
//     };

//     return (
//         <>
//             <div className='gallery-container'>
//                 <div className="days">
//                     {renderImages()}
//                 </div>
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
    const [images, setImages] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const today = new Date();

    useEffect(() => {
        const fetchImages = async () => {
            // Bu statik veri, API'den gelecek verilerin yerine kullanılacak
            const data = [
                { date: '2024-05-15', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
                { date: '2024-05-16', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
                { date: '2024-05-17', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
                { date: '2024-05-18', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
                { date: '2024-05-19', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
                { date: '2024-05-20', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
                { date: '2024-05-21', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
                { date: '2024-05-22', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
                { date: '2024-05-23', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
                { date: '2024-05-24', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
                { date: '2024-05-19', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
                { date: '2024-05-20', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
                { date: '2024-05-21', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
                { date: '2024-05-22', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
                { date: '2024-05-23', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
                { date: '2024-05-24', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
            
            ];

            // Güncel tarihli veri kontrolü
            const todayExists = data.some(img => new Date(img.date).toDateString() === today.toDateString());

            // Eğer güncel tarihli veri yoksa ekle
            if (!todayExists) {
                data.unshift({
                    date: today.toISOString(),
                    imageUrl: 'https://r.resimlink.com/ErUWpXBD.png',
                    title: "Today's Image"
                });
            }

            // Verileri tarihe göre sıralama
            const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

            setImages(sortedData);
            setSelectedDate(today);
        };

        fetchImages();
    }, [today]);

    const renderImages = () => {
        return images.map((img, index) => {
            const imgDate = new Date(img.date);
            const isSelected = selectedDate.toDateString() === imgDate.toDateString();
            return (
                <button
                    key={index}
                    className={`calendar ${isSelected ? 'today' : ''}`}
                    onClick={() => setSelectedDate(imgDate)}
                >
                    <div className="calendar__header">
                        <p className="calendar__header-dayno">{imgDate.getDate()}</p>
                        <div>
                            <p className="calendar__header-dayname">{imgDate.toLocaleDateString('tr-TR', { weekday: 'long' })}</p>
                            <p className="calendar__header-month">{imgDate.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>
                    <img src={img.imageUrl} alt={`Image ${index + 1}`} className="calendar__image" />
                </button>
            );
        });
    };

    return (
        <>
            <div className='gallery-container'>
                <div className="days">
                    {renderImages()}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default GalleryPage;
