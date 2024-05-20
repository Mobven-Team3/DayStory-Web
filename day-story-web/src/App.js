import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import ReceptionPage from './Pages/ReceptionPage.jsx';
import '/node_modules/@material/web/all.js';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<ReceptionPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

}
export default App;
