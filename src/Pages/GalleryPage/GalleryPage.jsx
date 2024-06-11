

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