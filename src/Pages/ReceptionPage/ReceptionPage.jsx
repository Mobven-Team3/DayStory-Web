
import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/base';
import FootBar from '../../../src/Pages/Footer/footer';


import how1 from '../../../src/assets/images/how1.png';
import how2 from '../../../src/assets/images/how2.png';
import how3 from '../../../src/assets/images/how3.png';
import receptionImg from '../../../src/assets/images/Karşılama_resimleri.png';
import './scss/_reception.scss';


import Navbar from '../ReseptionNavbar/reseptionNavbar';

const ReceptionPage = () => {
    const navigate = useNavigate();

    const handleLoginPageClick = () => {
        navigate('/login');
    };

    const handleRegisterPageClick = () => {
        navigate('/register');
    };


    return (
        <>
            <Navbar></Navbar>
            <div className="landingpage">

                <div className="landingpage__info">
                    <img className='landingpage__info-img' src={receptionImg} alt="Reception" />
                    <div className="landingpage__info-text">
                        <h2>Day<span>Story</span></h2>
                        <h3>Sizin anılarınızı kalıcı hale getiriyoruz</h3>
                        <p>Günlük tutmanın kolay ve keyifli bir yoludur. Her gününüzü özenle kaydedin, anılarınızı güvende tutun ve yaşamınızı daha derinlemesine keşfedin.  </p>
                    </div>
                </div>


                <div className='middle'>
                    <h2>Nasıl Çalışır</h2>
                    <div className="landingpage__card">
                        <div className='landingpage__card-first'>
                            <img className='' src={how1} alt="Reception" />
                        </div>
                        <div className='landingpage__card-second'>
                            <p>O gün yaşadığınız önemli olayları ve duygularınızı günlüğünüze not alın.</p>
                        </div>
                    </div>
                  
                    <div className="landingpage__card">
                    <div className='landingpage__card-first'>
                    <p >Gün içindeki özel anlarınızı sizin için ai görselleştirsin.</p>
                        </div>
                        <div className='landingpage__card-second'>
                        <img src={how2} alt="Reception" />
                        </div>

                    </div>

                    
                    <div className="landingpage__card">
                        <div className='landingpage__card-first'>
                            <img className='landingpage__card-how3' src={how3} alt="Reception" />
                        </div>
                        <div className='landingpage__card-second'>
                        <p>Görselleştirilen günlerinizi düzenli olarak takip edin arkadaşlarınızla paylaşın.</p>
                        </div>
                    </div>


                </div>







                {/* <div className="landingpage__card-area">
                            <img className='landingpage__card-img' src={receptionImg2} alt="Reception" />
                            <p className='landingpage__card-info' >O gün yaşadığınız önemli olayları ve duygularınızı günlüğünüze not alın.</p>
                        </div>

                        <div className="landingpage__card-area">
                            <img className='landingpage__card-img' src={receptionImg3} alt="Reception" />
                            <p className='landingpage__card-info' >Gün içindeki özel anlarınızı sizin için ai görselleştirsin.</p>
                        </div>

                        <div className="landingpage__card-area">
                            <img className='landingpage__card-img' src={receptionImg4} alt="Reception" />
                            <p className='landingpage__card-info' >Görselleştirilen günlerinizi düzenli olarak takip edin arkadaşlarınızla paylaşın.</p>
                        </div> */}



                <div className='landingpage__last'>
                <h2>Hemen Başla</h2>
                    <center>
                        <p>Sen de gününü DayStory’e anlat ve anılarının hikayesini canlandırmaya başla!</p>
                        <div>
                            <div className='landingpage__buttons'>
                                <Button className="signin"
                                    variant="submit"
                                    onClick={handleRegisterPageClick}

                                >
                                    Kayıt Ol
                                </Button>
                                <Button className="login"
                                    variant="submit"
                                    onClick={handleLoginPageClick}
                                >
                                    Giriş Yap
                                </Button>
                            </div>
                        </div>
                    </center>
                </div>



            </div>
            <FootBar></FootBar>
        </>
    );
}

export default ReceptionPage;
