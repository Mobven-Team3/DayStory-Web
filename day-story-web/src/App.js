import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReceptionPage from './Pages/ReceptionPage/ReceptionPage';
import '/node_modules/@material/web/all';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ReceptionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

