import React, { useEffect, useState } from 'react';
import NavigationBar from '../../../src/Pages/Navbar/Navbar';
import { useNotes } from './NotePage';  // NotesContext burada NoteApp'den geliyor
import "./note-scss/_note.scss";

const NoteDetail = () => {
    const { notes } = useNotes();

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

    const [currentDateDetails, setCurrentDateDetails] = useState({
        dayNo: '',
        dayName: '',
        monthName: '',
        year: '',
        formattedDate: ''
    });

    useEffect(() => {
        const { dayNo, dayName, monthName, year, formattedDate } = formatDateDetails(new Date());
        setCurrentDateDetails({ dayNo, dayName, monthName, year, formattedDate });
    }, []);

    return (
        <div>
            <NavigationBar />
            <div className="note-detail-container">
                <div className="detail__date">
                    <p className="detail__date-dayno">{currentDateDetails.dayNo}</p>
                    <div className="detail__date-info">
                        <p className="detail__date-dayname">{currentDateDetails.dayName}</p>
                        <p className="detail__date-monthname">{currentDateDetails.monthName}</p>
                        <p className="detail__date-year">{currentDateDetails.year}</p>
                    </div>
                </div>
                <h1>Not Detayı</h1>
                {notes.map(note => (
                    <div key={note.id} className="note">
                        <h3>{note.title}</h3>
                        <p>{note.description}</p>
                        <p>{note.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NoteDetail;
