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
            const token = localStorage.getItem('token');
            const today = new Date();
            const todayStr = today.toLocaleDateString('tr-TR').split('.').reverse().join('-');

            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const response = await fetch('https://talent.mobven.com:5043/api/DaySummarys/all', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = await response.json();

                let data = result.data || [];
                const formattedData = data.map(img => ({
                    date: img.date,
                    imagePath: img.imagePath || '',
                    title: img.title || 'img'
                }));

                if (formattedData.length >= 1) {
                    const todayExists = formattedData.some(img => img.date === todayStr.split('-').reverse().join('-'));

                    if (!todayExists) {
                        formattedData.unshift({
                            date: todayStr.split('-').reverse().join('-'),
                            imagePath: 'https://r.resimlink.com/ErUWpXBD.png',
                            title: 'Loading Image'
                        });
                    }

                    const sortedData = formattedData.sort((a, b) => {
                        const dateA = new Date(a.date.split('-').reverse().join('-'));
                        const dateB = new Date(b.date.split('-').reverse().join('-'));
                        return dateB - dateA;
                    });

                    setImages(sortedData);
                } else {
                    setImages([]);
                }

                setSelectedDate(today);
            } catch (error) {
                console.error('Error fetching images:', error);
                setImages([]);
            }
        };

        fetchImages();
    }, []);

    const renderImages = (images) => {
        return images.map((img, index) => {
            const imgDate = new Date(img.date.split('-').reverse().join('-'));
            const isSelected = selectedDate.toDateString() === imgDate.toDateString();
            const handleClick = () => {
                if (isSelected && img.title === 'Loading Image') {
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
                    {img.imagePath ? (
                        <img src={img.imagePath} alt={`Day ${imgDate.getDate()}`} className="calendar__image" />
                    ) : (
                        <p className="calendar__image-placeholder">Image Not Available</p>
                    )}
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
