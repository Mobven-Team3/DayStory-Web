
import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import NavigationBar from '../../../src/Pages/Navbar/Navbar'; // Doğru yolu düzelt
import Footer from '../Footer/footer';
import './note-scss/NotePage.scss';

const NoteApp = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [notes, setNotes] = useState([]);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');

    useEffect(() => {
        const getCurrentDate = () => {
            const date = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('tr-TR', options);
        };
        
        setCurrentDate(getCurrentDate());
    }, [notes]); // notes değişkenini bağımlılıklara ekledik

    const handleAddNote = () => {
        if (noteTitle.trim() && noteContent.trim()) {
            setNotes([...notes, { title: noteTitle, content: noteContent, date: currentDate }]);
            setNoteTitle('');
            setNoteContent('');
        }
    };

    return (
        <Container className="note-app-container">
            <NavigationBar showFullMenu={false} /> {/* NavigationBar'ı ekledik */}
            <Box className="gün-sayacı">
                <Typography variant="subtitle1" gutterBottom>{currentDate}</Typography>
            </Box>
            {/* Gün Özeti butonunu buraya taşıdık */}
            <Button 
                className="summary-add-button"
                variant="contained"
                color="primary"
                onClick={handleAddNote}
            >
                gün özzetini olustur
            </Button>

            <Box className="note-content">
                <Box className="note-input-wrapper">
                    <Typography variant="h4" gutterBottom>Not Ekle</Typography>
                    <TextField 
                        className="note-input"
                        label="Not Başlığı"
                        variant="outlined"
                        fullWidth 
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                    />
                    <TextField 
                        className="note-input"
                        label="Not İçeriği"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth 
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                    />
                    <Button 
                        className="add-button"
                        variant="contained" 
                        color="primary" 
                        onClick={handleAddNote}
                    >
                        Ekle
                    </Button>
                </Box>
                <List className="note-list">
                    {notes.length > 0 ? (
                        notes.map((note, index) => (
                            <ListItem key={index} className="note-item">
                                <ListItemText primary={note.title} secondary={note.content} />
                            </ListItem>
                        ))
                    ) : (
                        <Typography variant="body1" className="no-notes-message">Bugün için notunuz bulunmuyor.</Typography>
                    )}
                </List>
            </Box>
            <Footer /> {/* Footer bileşenini ekledik */}
        </Container>
    );
};

export default NoteApp;
