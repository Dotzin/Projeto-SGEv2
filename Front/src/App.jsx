import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Equipes from './pages/Equipes'
import Equipe from './pages/Equipe'
import { useNavigate } from 'react-router-dom'
import './index.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Equipe" element={<Equipe/>}/>
        <Route path="/equipes" element={<Equipes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/equipe/:id" element={<Equipe/>} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;