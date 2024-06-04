import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './gallery-scss/_gallery-detail.scss';

const GalleryDetailPage = () => {
    const { date } = useParams();
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            const data = [
                { date: '2024-04-15', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
                { date: '2024-04-16', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
                { date: '2024-04-17', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
                { date: '2024-04-18', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
                { date: '2024-04-19', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
                { date: '2024-05-15', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
                { date: '2024-05-16', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
                { date: '2024-05-17', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
                { date: '2024-05-18', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
                { date: '2024-03-15', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
                { date: '2024-05-19', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
                { date: '2024-05-20', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
                { date: '2024-05-21', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
                { date: '2024-05-22', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
                { date: '2024-03-23', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
                { date: '2024-02-24', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
                { date: '2024-05-25', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
                { date: '2024-05-26', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
                { date: '2024-05-27', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
                { date: '2024-05-29', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
                { date: '2024-06-01', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
            ];

            const selectedImage = data.find(img => new Date(img.date).toISOString() === date);

            setImageData(selectedImage);
        };

        fetchData();
    }, [date]);

    if (!imageData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="gallery-detail-container">
            <h2>{new Date(imageData.date).toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</h2>
            <img src={imageData.imageUrl} alt={`Detail of ${imageData.title}`} className="gallery-detail-image" />
        </div>
    );
};

export default GalleryDetailPage;
