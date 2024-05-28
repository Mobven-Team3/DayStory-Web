import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

//libraries
import '@mui/material';

//components
import Gallery from './Pages/GalleryPage/GalleryPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import MainPage from './Pages/MainPage/MainPage';
import ReceptionPage from './Pages/ReceptionPage/ReceptionPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import TodayPage from './Pages/TodayPage/TodayPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ReceptionPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/todaypage' element={<TodayPage />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/mainpage' element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;