import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

//libraries
import '@mui/material';

//components
import Deneme from './Pages/Deneme/Deneme';
import Gallery from './Pages/GaleryPage/GaleryPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import ReceptionPage from './Pages/ReceptionPage/ReceptionPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ReceptionPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/deneme' element={<Deneme />} />
        <Route path='/gallery' element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;