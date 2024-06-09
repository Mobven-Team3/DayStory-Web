import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Modal, Backdrop, Fade } from '@mui/material';
import NavigationBar from '../../../src/Pages/Navbar/Navbar';
import "./note-scss/_note.scss";

const NoteApp = () => {
    const navigate = useNavigate();

    const [currentDate, setCurrentDate] = useState('');
    const [notes, setNotes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const { date } = useParams();
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [formattedDate, setFormattedDate] = useState('');

    const [noteData, setNoteData] = useState({
        title: '', 
        description: '', 
        date: '', 
        time: '', 
        priority: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNoteData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

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
                if (!token) {
                    throw new Error('Token bulunamadı, lütfen giriş yapın.');
                }

                const today = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-'); // Bugünün tarihini al ve formatla

                const formattedDate = today.split('-').reverse().join('-');
                setFormattedDate(formattedDate);

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

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleAddNote = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token bulunamadı, lütfen giriş yapın.');
            }

            // Tüm alanların dolu olup olmadığını kontrol edin ve boş alanları doldurun
            const noteToAdd = {
                title: noteData.title || 'Varsayılan Başlık',
                description: noteData.description || 'Varsayılan Açıklama',
                date: formattedDate,
                time: noteData.time || '12:00', // Varsayılan zaman
                priority: noteData.priority || 'Normal' // Varsayılan öncelik
            };

            const response = await axios.post("http://165.22.93.225:5030/api/Events", noteToAdd, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200 || response.status === 201) {
                console.log('Note added successfully:', response.data);
                setNotes(prevNotes => [...prevNotes, response.data]); // Yeni notu mevcut not listesine ekle
                // Clear the note data after successful addition
                setNoteData({
                    title: '', 
                    description: '', 
                    date: '', 
                    time: '', 
                    priority: ''
                });
            } else {
                console.error('Not ekleme başarısız:', response.data);
                setError('Not ekleme başarısız');
            }
        } catch (error) {
            if (error.response) {
                console.error("Failed to add note:", error.response.data);
                setError(`Error: ${error.response.status} - ${error.response.data.title}`);
                // Hata detaylarını konsola yazdır
                console.error('Hata Detayları:', error.response.data.errors);
            } else {
                console.error("Failed to add note:", error.message);
                setError(`Error: ${error.message}`);
            }
        }
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
                        name="title"
                        placeholder="not başlığı...."
                        variant="outlined"
                        fullWidth 
                        value={noteData.title}
                        onChange={handleChange}
                    />
                    <TextField 
                        className="note-input"
                        name="description"
                        placeholder="not içeriğini yazınız.."
                        label="Not İçeriği"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth 
                        value={noteData.description}
                        onChange={handleChange}
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

            {error && (
                <Typography color="error" variant="subtitle1">{error}</Typography>
            )}

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
