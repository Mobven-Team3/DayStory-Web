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
import ReceptionPage from './Pages/ReceptionPage/ReceptionPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ReceptionPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/gallery' element={<Layout><Gallery /></Layout>} />
        <Route path='/gallery/:date' element={<Layout><GalleryDetail /></Layout>} />
        <Route path='/note' element={<Layout><NotePage /></Layout>} />
        <Route path='/profile' element={<Layout><ProfilePage /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


// import React from 'react';
// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import './App.css';

// //libraries
// import '@mui/material';

// //components
// import GalleryDetail from './Pages/GalleryPage/GalleryDetailPage';
// import Gallery from './Pages/GalleryPage/GalleryPage';
// import Layout from './Pages/Layout/Layout';
// import LoginPage from './Pages/LoginPage/loginPage';
// import { default as NotePage } from './Pages/NotePage/NotePage';
// import ProfilePage from './Pages/ProfilePage/ProfilePage';
// import ReceptionPage from './Pages/ReceptionPage/ReceptionPage';
// import RegisterPage from './Pages/RegisterPage/RegisterPage';

// const isAuthenticated = () => {
//   const token = localStorage.getItem('authToken');
//   return !!token; 
// };

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<ReceptionPage />} /> 
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/login" element={<LoginPage />} />
        
//         {/* Protected routes */}
//         <Route element={isAuthenticated() ? <Layout /> : <Navigate to="/" />}>
//           <Route path="/gallery" element={<Gallery />} />
//           <Route path="/gallery/:date" element={<GalleryDetail />} />
//           <Route path="/note" element={<NotePage />} />
//           <Route path="/profile" element={<ProfilePage />} />
//         </Route>

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;