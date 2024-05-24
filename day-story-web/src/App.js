import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './Pages/LoginPage/loginPage';
import ReceptionPage from './Pages/ReceptionPage/ReceptionPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';

import '/node_modules/@material/web/all';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ReceptionPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;