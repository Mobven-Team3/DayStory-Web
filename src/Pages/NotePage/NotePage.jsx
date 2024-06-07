import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate hook'unu ekleyin
import { Container, TextField, Button, List, ListItem, ListItemText, Typography, Box, Modal, Backdrop, Fade } from '@mui/material';
import NavigationBar from '../../../src/Pages/Navbar/Navbar'; // Doğru yolu düzelt
import "./note-scss/_note.scss";
const NoteApp = () => {
    const navigate = useNavigate(); // useNavigate hook'u ile navigate fonksiyonunu alın

    const [currentDate, setCurrentDate] = useState('');
    const [notes, setNotes] = useState([]);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

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

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleContinue = () => {
        import('./notedetail.jsx').then(module => {
            const Notedetail = module.default;
            // Yeni sayfaya yönlendirme işlemi
            navigate('/notedetail'); // notedetail yolunu belirttik
        });
    };

    return (
        <Container className="note-app-container">
            <NavigationBar showFullMenu={false} /> {/* NavigationBar'ı ekledik */}
            <Box className="gün-sayacı">
                <Typography variant="subtitle1" gutterBottom>{currentDate}</Typography>
            </Box>
            <Button 
                className="summary-add-button"
                sx={{ 
                    marginRight: '50px',
                    marginTop: '2px'   // Üst kenara olan uzaklığı arttırdık
                }}
                variant="contained"
                color="primary"
                onClick={handleModalOpen} // Modalı açmak için handleModalOpen fonksiyonunu çağırın
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
           

            {/* Modal */}
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
                        <Button onClick={handleModalClose} sx={{ mt: 2 }}>Vazgeç</Button> {/* Kapat butonu */}
                        <Button onClick={handleContinue} sx={{ mt: 2, mr: 2 }}>Devam Et</Button> {/* Ekle butonu */}
                    </Box>
                </Fade>
            </Modal>
        </Container>
    );
};

export default NoteApp;