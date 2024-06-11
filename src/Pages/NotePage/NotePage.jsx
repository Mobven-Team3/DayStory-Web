import { Backdrop, Box, Button, CircularProgress, Fade, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar from '../../../src/Pages/Navbar/Navbar';
import "./note-scss/_note.scss";

const NoteApp = () => {
    const { date } = useParams();
    const [events, setEvents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [formattedDate, setFormattedDate] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [summaryImage, setSummaryImage] = useState(null);

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
        fetchSummary(formattedDate);
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

    const fetchSummary = async (formattedDate) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://talent.mobven.com:5043/api/DaySummarys/day', {
                params: { date: formattedDate },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.data.data && response.data.data.imagePath) {
                setSummaryImage(response.data.data.imagePath);
            } else {
                setSummaryImage('');
                setError(null);
            }
        } catch (error) {
            setSummaryImage(null);
            setError('Gün özeti alınırken bir hata oluştu');
        } finally {
            setLoading(false);
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
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token bulunamadı, lütfen giriş yapın.');
            }

            const response = await axios.post("https://talent.mobven.com:5043/api/Events/summary", {
                date: formattedDate
            }, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200 || response.status === 201) {
                console.log('Day summary created successfully:', response.data);
                await fetchSummary(formattedDate);
                setModalOpen(false);
            } else {
                console.error('Gün özeti oluşturma başarısız:', response.data);
            }
        } catch (error) {
            console.error("Failed to create day summary:", error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='note__container'>
            <div className='detail__header'>Notlar</div>
            <div className='detail__content'>
                <div className='note__area'>
                    <div className="detail__date">
                        <p className="detail__date-dayno">{currentDateDetails.dayNo}</p>
                        <div className="detail__date-info">
                            <p className="detail__date-dayname">{currentDateDetails.dayName}</p>
                            <p className="detail__date-month">{currentDateDetails.monthName} {currentDateDetails.year}</p>
                        </div>
                    </div>
                    {summaryImage ? (
                        <div className='detail__img'>
                            <img src={summaryImage} alt="Event" />
                        </div>
                    ) : (
                        <>
                            <div className="summary-add-button" onClick={handleModalOpen}>
                                <p> AI Gün Özeti Oluştur </p>
                            </div>

                            <div className='note__add'>
                                <p className='note__add-header'>Notunuzu yazınız.</p>

                                <TextField
                                    className="note-input"
                                    label="Başlık"
                                    name="title"
                                    placeholder="Not Başlığınızı Giriniz."
                                    fullWidth
                                    value={noteData.title}
                                    onChange={handleChange}
                                    error={Boolean(errors.title)}
                                    helperText={errors.title}
                                />

                                <TextField
                                    className="note-input"
                                    name="description"
                                    placeholder="Notunuzun Detaylarını Giriniz."
                                    label="Notunuz"
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

                                <div className='add__button'>
                                    <Button
                                        className="add__button-type"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleAddNote}
                                    >
                                        Ekle
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className='detail__notes'>
                    {events.length > 0 && (
                        events.map(event => (
                            <div className='detail__notes-area' key={event.id}>
                                <p className='detail__notes-title'>{event.title}</p>
                                <p className='detail__notes-description'>{event.description}</p>
                            </div>
                        ))
                    )}
                    {events.length === 0 && (
                        <div>Notlarınız alınamadı.</div>
                    )}
                </div>
            </div>

            {loading ? (
                <div className='loading-area'>
                    <CircularProgress />
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Gün özeti oluşturuluyor, lütfen bekleyin...
                    </Typography>
                </div>
            ) : null}

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
        </div>
    );
};

export default NoteApp;
