
import React from 'react';
import { useParams } from 'react-router-dom';

const data = [
    { date: '15-04-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
    { date: '16-04-2024', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
    { date: '17-04-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
    { date: '18-04-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
    { date: '19-04-2024', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
    { date: '15-05-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
    { date: '16-05-2024', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
    { date: '17-05-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
    { date: '18-05-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
    { date: '15-03-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
    { date: '19-05-2024', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
    { date: '20-05-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
    { date: '21-05-2024', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
    { date: '22-05-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
    { date: '23-03-2024', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
    { date: '24-02-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
    { date: '25-05-2024', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
    { date: '26-05-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
    { date: '27-05-2024', imageUrl: 'https://r.resimlink.com/NcqWARS_3Q.png', title: 'img' },
    { date: '29-05-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
    { date: '01-06-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
    { date: '04-06-2024', imageUrl: 'https://r.resimlink.com/r_hXi-nT4.png', title: 'img' },
];

const GalleryDetailPage = () => {
    const { date } = useParams();
    const image = data.find(img => img.date === date);

    if (!image) {
        return <div>Image not found</div>;
    }

    return (
        <div className="gallery-detail">
            <h1>{image.title}</h1>
            <img src={image.imageUrl} alt={image.title} />
            <p>Date: {date}</p>
        </div>
    );
};

export default GalleryDetailPage;
