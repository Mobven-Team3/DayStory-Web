import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

//libraries
import '@mui/material';

//components
import GalleryDetail from './Pages/GalleryPage/GalleryDetailPage';
import Gallery from './Pages/GalleryPage/GalleryPage';
import Layout from './Pages/Layout/Layout';
import LoginPage from './Pages/LoginPage/loginPage';
import { default as NotePage } from './Pages/NotePage/NotePage';

import ProfilePage from './Pages/ProfilePage/ProfilePage';
import Notedetail from './Pages/NotePage/notedetail';
import ReceptionPage from './Pages/ReceptionPage/ReceptionPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import Deneme from './Pages/deneme';

function App() {
  return (
    <BrowserRouter>
      <Routes>
    
        <Route index element={<ReceptionPage />} />
        <Route path="/notedetail" element={<Notedetail />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/gallery' element={<Layout><Gallery /></Layout>} />
        <Route path='/gallery/:date' element={<Layout><GalleryDetail /></Layout>} />
        <Route path='/note' element={<Layout><NotePage /></Layout>} />
        <Route path='/profile' element={<Layout><ProfilePage /></Layout>} />
        <Route path='/deneme' element={<Deneme />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


