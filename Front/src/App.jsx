import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { useNavigate } from 'react-router-dom'
import Equipes from './pages/Equipes'
import './index.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/equipes" element={<Equipes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;