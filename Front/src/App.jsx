import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Equipes from './pages/Equipes'
import Equipe from './pages/Equipe'
import Ativ from "./pages/Atividade"
import Tra from "./pages/Trabalhos"
import './index.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Atividade/:id" element={<Ativ />} />
        <Route path="/equipes" element={<Equipes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Trabalhos/:id" element={<Equipe/>} />
        <Route path="/Trabalhos/aluno/:alunoId" element={<Tra/>} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;