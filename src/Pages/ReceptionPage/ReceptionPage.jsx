import '@material/web/all';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import receptionImg2 from '../../../src/assets/images/2 1.png';
import receptionImg3 from '../../../src/assets/images/5 1.png';
import receptionImg4 from '../../../src/assets/images/Group 26085612.png';
import receptionImg from '../../../src/assets/images/Karşılama_resimleri.png';
import './scss/Reception.scss';

const ReceptionPage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login'); 
    };
    const handleRegisterClick = () => {
        navigate('/register'); 
    };
    const handleMainClick = () => {
        navigate('/mainpage'); 
    };

    return (
        <div>
            <nav> day story </nav>
            <div className="reception-page">
                <div className="content-container">
                    <div className="image-container">
                        <img src={receptionImg} alt="Reception" />
                    </div>
                    <div className="text-container">
                        <p className='header__text'>Day<span>Story</span></p>
                        <h1>Sizin anılarınızı kalıcı hale getiriyoruz</h1>
                        <p>Günlük tutmanın kolay ve keyifli bir yoludur. Her gününüzü özenle 
                            kaydedin, anılarınızı güvende tutun ve yaşamınızı daha 
                            derinlemesine keşfedin. </p>
                    </div>
                </div>
                <div className="content-container">
                    <div className="card">
                        <div className="image-container">
                            <img src={receptionImg2} alt="Reception" />
                        </div>
                        <div className="card-text">
                            <p>Reception Image 2 Text</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image-container">
                            <img src={receptionImg3} alt="Reception" />
                        </div>
                        <div className="card-text">
                            <p>Reception Image 3 Text</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="image-container">
                            <img src={receptionImg4} alt="Reception" />
                        </div>
                        <div className="card-text">
                            <p>Reception Image 4 Text</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReceptionPage;
