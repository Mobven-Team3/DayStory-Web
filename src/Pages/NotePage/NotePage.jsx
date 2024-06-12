import {
    Backdrop, Box, Button,
    Fade,
    IconButton, InputAdornment,
    Menu, MenuItem,
    Modal, TextField, Typography
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import loadingimg from '../../assets/images/daystory-logo.png';
import "./note-scss/_note.scss";

//icons
import { MoreVert } from '@mui/icons-material';
import { AiOutlineCloseCircle } from 'react-icons/ai';

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
    const [loadingImg, setLoadingImg] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [noteId, setNoteId] = useState(null);

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
        setSuccessMessage('');
    };

    const handleClear = (e) => {
        setNoteData((prevData) => ({ ...prevData, [e]: '' }));
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
            setLoadingImg(false);
        }
    };

    useEffect(() => {
        if (summaryImage) {
            setLoadingImg(false); 
        } else {
            setLoadingImg(true); 
        }
    }, [summaryImage]); 
    

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
                setNoteData((prevData) => ({
                    ...prevData,
                    title: '',
                    description: ''
                }));
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
            setLoadingImg(true);
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
            
            setModalOpen(false);

            if (response.status === 200 || response.status === 201) {
                console.log('Day summary created successfully:', response.data);
                await fetchSummary(formattedDate);
                setLoadingImg(false);
                setModalOpen(false);
            } else {
                setLoadingImg(true);
                console.error('Gün özeti oluşturma başarısız:', response.data);
                setModalOpen(false);
            }
        } catch (error) {
            setLoadingImg(true);
            console.error("Failed to create day summary:", error.response ? error.response.data : error.message);
            setModalOpen(false);
        } finally {
            setModalOpen(false);
        }
    };

    const handleEditNote = (note) => {
        setNoteData({
            title: note.title,
            description: note.description,
        });
        setEditMode(true);
        setNoteId(note.id);
    };
    
    const handleNoteAction = async () => {
        if (editMode) {
            // Güncelleme işlemi
            if (errors.title || errors.description) {
                console.error('Validation errors:', errors);
                return;
            }
    
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token bulunamadı, lütfen giriş yapın.');
                }
    
          const response = await axios.put(`https://talent.mobven.com:5043/api/Events/${noteId}`, {
    ...noteData,
    id: noteId,
    date: formattedDate
}, {
    headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
    }
});

    
                if (response.status === 200 || response.status === 201) {
                    console.log('Note updated successfully:', response.data);
                    setSuccessMessage('Notunuz başarıyla güncellenmiştir.');
                    setErrorMessage('');
                    setNoteData({
                        title: '',
                        description: '',
                        date: '',
                        time: '',
                        priority: null
                    });
                    setEditMode(false);
                    setNoteId(null);
                    fetchEvents(formattedDate); // Güncelleme işlemi sonrasında güncellemeleri al
                } else {
                    console.error('Not güncelleme başarısız:', response.data);
                    setSuccessMessage('');
                    setErrorMessage('Notunuz güncellenemedi, tekrar deneyiniz.');
                }
            } catch (error) {
                console.error("Failed to update note:", error.response ? error.response.data : error.message);
                setSuccessMessage('');
                setErrorMessage('Notunuz güncellenemedi, tekrar deneyiniz.');
            }
        } else {
            // Not ekleme işlemi
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
                    setNoteData({
                        title: '',
                        description: ''
                    });
                    fetchEvents(formattedDate); // Not ekleme işlemi sonrasında güncellemeleri al
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
        }
    };

    const handleDeleteNote = async (noteId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token bulunamadı, lütfen giriş yapın.');
            }

            const response = await axios.delete(`https://talent.mobven.com:5043/api/Events/${noteId}`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200 || response.status === 204) {
                console.log('Note deleted successfully:', response.data);
                setSuccessMessage('Notunuz başarıyla silinmiştir.');
                setErrorMessage('');
                fetchEvents(formattedDate);
            } else {
                console.error('Not silme başarısız:', response.data);
                setSuccessMessage('');
                setErrorMessage('Notunuz silinemedi, tekrar deneyiniz.');
            }
        } catch (error) {
            console.error("Failed to delete note:", error.response ? error.response.data : error.message);
            setSuccessMessage('');
            setErrorMessage('Notunuz silinemedi, tekrar deneyiniz.');
        }
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
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

                    {loadingImg ? (
                        <div className='detail__loading'>
                            <img src={loadingimg} alt="Event" />
                        </div>
                    ) : (
                        <>
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
                                            InputProps={{
                                                endAdornment: (
                                                    noteData.title && (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="clear input"
                                                                onClick={() => handleClear('title')}
                                                                edge="end"
                                                            >
                                                                <AiOutlineCloseCircle />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                )
                                            }}
                                        />

                                        <TextField
                                            className="note-input"
                                            label="Notunuz"
                                            name="description"
                                            placeholder="Notunuzun Detaylarını Giriniz."
                                            multiline
                                            rows={4}
                                            value={noteData.description}
                                            onChange={handleChange}
                                            error={Boolean(errors.description)}
                                            helperText={errors.description}
                                            InputProps={{
                                                endAdornment: (
                                                    noteData.description && (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="clear input"
                                                                onClick={() => handleClear('description')}
                                                                edge="end"
                                                            >
                                                                <AiOutlineCloseCircle />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                )
                                            }}
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
                                            {editMode ? (
                                                <Button
                                                    className="add__button-type"
                                                    onClick={handleNoteUpdate}
                                                >
                                                    Güncelle
                                                </Button>
                                            ) : (
                                                <Button
                                                    className="add__button-type"
                                                    onClick={handleAddNote}
                                                >
                                                    Kaydet
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
    
                <div className='detail__notes'>
                    {events.length > 0 && (
                        events.map(event => (
                            <div className='detail__notes-area' key={event.id}>
                                <div className='note-header'>
                                    <p className='detail__notes-title'>{event.title}</p>
                                    <IconButton onClick={(e) => { handleMenuClick(e); setNoteId(event.id); }}>
                                        <MoreVert />
                                    </IconButton>
                                </div>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={() => { handleEditNote(event); handleMenuClose(); }}>Düzenle</MenuItem>
                                    <MenuItem onClick={() => { handleDeleteNote(noteId); handleMenuClose(); }}>Sil</MenuItem>
                                </Menu>
                                <p className='detail__notes-description'>{event.description}</p>
                            </div>
                        ))
                    )}
                    {events.length === 0 && (
                        <div className='detail__notes-empty'>Bu gün için notunuz bulunmuyor.</div>
                    )}
                </div>
            </div>

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