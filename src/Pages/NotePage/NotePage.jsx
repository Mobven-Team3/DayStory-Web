import { Backdrop, Box, Button, Container, Fade, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavigationBar from '../../../src/Pages/Navbar/Navbar';
import "./note-scss/_note.scss";

const NoteApp = () => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const { date } = useParams();
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [formattedDate, setFormattedDate] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [noteData, setNoteData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        priority: null
    });

    const [errors, setErrors] = useState({
        title: '',
        description: ''
    });

    const validate = (name, value) => {
        let error = '';
        if (name === 'title') {
            if (!value) {
                error = 'Bu değer boş bırakılamaz.';
            } else if (value.length < 3 || value.length > 250) {
                error = '3 ila 250 karakter aralığında bir değer almalıdır.';
            }
        } if (name === 'description') {
            if (!value) {
                error = 'Bu değer boş bırakılamaz.';
            } else if (value.length < 3 || value.length > 350) {
                error = '3 ila 350 karakter aralığında bir değer almalıdır.';
            }
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNoteData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        validate(name, value);
    };

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

    useEffect(() => {
        const today = new Date();
        const formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
        setFormattedDate(formattedDate);

        fetchEvents(formattedDate);
    }, [date]);

    useEffect(() => {
        const getCurrentTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        };

        setNoteData((prevData) => ({
            ...prevData,
            time: getCurrentTime()
        }));
    }, []);

    const fetchEvents = async (formattedDate) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://talent.mobven.com:5043/api/Events/day', {
                params: { date: formattedDate },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (response.data && Array.isArray(response.data.data)) {
                setEvents(response.data.data);
                setError(null);
            } else {
                setError('Etkinlikler alınırken bir hata oluştu');
            }
        } catch (error) {
            setError('Etkinlikler alınırken bir hata oluştu');
        }
    };

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleAddNote = async () => {
        if (errors.title || errors.description) {
            console.error('Validation errors:', errors);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token bulunamadı, lütfen giriş yapın.');
            }

            const response = await axios.post("https://talent.mobven.com:5043/api/Events", {
                ...noteData,
                date: formattedDate
            }, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200 || response.status === 201) {
                console.log('Note added successfully:', response.data);
                setNotes(prevNotes => [...prevNotes, response.data]);
                setSuccessMessage('Notunuz başarıyla kaydedilmiştir.');
                setErrorMessage('');
                fetchEvents(formattedDate); 
            } else {
                console.error('Not ekleme başarısız:', response.data);
                setSuccessMessage('');
                setErrorMessage('Notunuz kaydedilemedi, tekrar deneyiniz.');
            }
        } catch (error) {
            console.error("Failed to add note:", error.response ? error.response.data : error.message);
            setSuccessMessage('');
            setErrorMessage('Notunuz kaydedilemedi, tekrar deneyiniz.');
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleContinue = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token bulunamadı, lütfen giriş yapın.');
            }

            const response = await axios.post("https://talent.mobven.com:5043/api/DaySummarys", {
                date: formattedDate
            }, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200 || response.status === 201) {
                console.log('Day summary created successfully:', response.data);
                setSuccessMessage('Gün özeti başarıyla oluşturulmuştur.');
                setErrorMessage('');
                navigate('/notedetail');
            } else {
                console.error('Gün özeti oluşturma başarısız:', response.data);
                setSuccessMessage('');
                setErrorMessage('Gün özeti oluşturulamadı, tekrar deneyiniz.');
            }
        } catch (error) {
            console.error("Failed to create day summary:", error.response ? error.response.data : error.message);
            setSuccessMessage('');
            setErrorMessage('Gün özeti oluşturulamadı, tekrar deneyiniz.');
        }
    };

    return (
        <Container className="note-app-container">
            <NavigationBar showFullMenu={false} />
            <div className="detail__date">
                <p className="detail__date-dayno">{currentDateDetails.dayNo}</p>
                <div className="detail__date-info">
                    <p className="detail__date-dayname">{currentDateDetails.dayName}</p>
                    <p className="detail__date-month">{currentDateDetails.monthName} {currentDateDetails.year}</p>
                </div>
            </div>
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
                        error={Boolean(errors.title)}
                        helperText={errors.title}
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
                        error={Boolean(errors.description)}
                        helperText={errors.description}
                    />
                    {successMessage && (
                        <div style={{ color: 'green', marginTop: '10px' }}>
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div style={{ color: '#d32f2f', marginTop: '10px' }}>
                            {errorMessage}
                        </div>
                    )}
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
                    {error ? (
                        <div className='detail__notes-empty' style={{ color: '#d32f2f', }}>
                            Notlar alınırken bir hata oluştu.
                        </div>
                    ) : (
                        events.length === 0 ? (
                            <div className='detail__notes-empty'>
                                Bu gün için notunuz bulunmuyor.
                            </div>
                        ) : (
                            events.map(event => (
                                <div className='detail__notes-area' key={event.id}>
                                    <p className='detail__notes-title'>{event.title}</p>
                                    <p className='detail__notes-description'>{event.description}</p>
                                </div>
                            ))
                        )
                    )}
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