import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, List, ListItem, ListItemText, Typography, Box, Modal, Backdrop, Fade } from '@mui/material';
import NavigationBar from '../../../src/Pages/Navbar/Navbar';
import "./note-scss/_note.scss";

const NoteApp = () => {
    const navigate = useNavigate(); 

    const [currentDate, setCurrentDate] = useState('');
    const [notes, setNotes] = useState([]);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const { date } = useParams();
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const getCurrentDate = () => {
            const date = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('tr-TR', options);
        };
        
        setCurrentDate(getCurrentDate());
    }, [notes]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('token');
                const today = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-'); // Bugünün tarihini al ve formatla

                // Tarihi DD-MM-YYYY formatında düzenle
                const formattedDate = today.split('-').reverse().join('-');

                const response = await axios.get('http://165.22.93.225:5030/api/Events/day', {
                    params: { date: formattedDate },
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

    const handleAddNote = () => {
        if (noteTitle.trim() && noteContent.trim()) {
            setNotes([...notes, { title: noteTitle, content: noteContent, date: currentDate }]);
            setNoteTitle('');
            setNoteContent('');
        }
    };

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleContinue = () => {
        import('./notedetail.jsx').then(module => {
            const Notedetail = module.default;
            navigate('/notedetail');
        });
    };

    return (
        <Container className="note-app-container">
            <NavigationBar showFullMenu={false} />
            <Box className="gün-sayacı">
                <Typography variant="subtitle1" gutterBottom>{currentDate}</Typography>
            </Box>
            <Button 
                className="summary-add-button"
                sx={{ 
                    marginRight: '50px',
                    marginTop: '2px'
                }}
                variant="contained"
                color="primary"
                onClick={handleModalOpen}
            >
                Gün Özeti Oluştur
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
                <div className='detail__notes'>
                    {events.map(event => (
                        <div className='detail__notes-area' key={event.id}>
                            <p className='detail__notes-title'>{event.title}</p>
                            <p className='detail__notes-description'>{event.description}</p>
                        </div>
                    ))}
                </div>
            </Box>

            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modalOpen}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <Typography id="modal-title" variant="h6" component="h2">
                            Uyarı
                        </Typography>
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                            Günde yalnızca bir AI gün özeti oluşturabilirsiniz. Devam etmek istiyor musunuz?
                        </Typography>
                        <Button onClick={handleModalClose} sx={{ mt: 2 }}>Vazgeç</Button>
                        <Button onClick={handleContinue} sx={{ mt: 2, mr: 2 }}>Devam Et</Button>
                    </Box>
                </Fade>
            </Modal>
        </Container>
    );
};

export default NoteApp;
