import Header from './components/Header';
import Sidebar from './components/Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styles from './components/Styles/equipes.module.css';

const listarSalas = async (rm) => {
    try {
        const response = await axios.get(`http://localhost:3304/api/alunos/${rm}/salas`);
        return response.data;
    } catch (error) {
        console.error('Erro ao listar salas:', error);
        throw error;
    }
};

const verificarToken = async (token) => {
    try {
        const response = await axios.post('http://localhost:3304/api/auth/verificar', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao verificar token:', error);
        throw error;
    }
};

const Equipes = () => {
    const navigate = useNavigate();
    const titulo = "Equipes";
    const [userInfo, setUserInfo] = useState({ rm: '', tipo: '' });
    const [salas, setSalas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [novoNomeSala, setNovoNomeSala] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!token) {
                navigate('/login');
                setLoading(false);
                return;
            }

            try {
                const data = await verificarToken(token);
                setUserInfo(data);
                const salasData = await listarSalas(data.rm);
                setSalas(Array.isArray(salasData) ? salasData : []);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [navigate, token]);

    const handleCreateRoom = async () => {
        if (!novoNomeSala) {
            alert("O nome da sala é obrigatório.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3304/api/salas/criar', {
                nome: novoNomeSala,
                professorId: userInfo.rm
            });
            const novaSala = response.data;

            await axios.post('http://localhost:3304/api/salas/addAlunos', {
                salaId: novaSala.id,
                alunoId: userInfo.rm
            });

            setSalas([...salas, novaSala]);
            setNovoNomeSala('');
        } catch (error) {
            console.error('Erro ao criar sala:', error);
            alert('Erro ao criar sala. Tente novamente.');
        }
    };

    const redirecionar = (id) => {
        navigate(`/Trabalhos/${id}`); // Redireciona para a equipe com o ID correspondente
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.MainConteiner}>
            <Header titulo={titulo} pagina={titulo} />
            <Sidebar />
            <div className={styles.conteinerEquipes}>
                <div className={styles.contcriarsala}>
                    {userInfo.tipo === 'professor' && (
                        <div className={styles.contcriarsala}>
                            <input 
                                type="text" 
                                value={novoNomeSala} 
                                className={styles.inputCriarSalaaa}
                                onChange={(e) => setNovoNomeSala(e.target.value)} 
                                placeholder="Nome da nova sala" 
                            />
                            <button onClick={handleCreateRoom} className={styles.botaoCriarSala}>
                                Criar Sala
                            </button>
                        </div>
                    )}
                </div>
                {salas.length === 0 ? (
                    <p>Nenhuma sala encontrada.</p>
                ) : (
                    salas.map(sala => (
                        <div 
                            className={styles.equipe} 
                            key={sala.id} 
                            onClick={() => redirecionar(sala.id)}
                        >
                            <div className={styles.BottomEquipes}>
                                <p>{sala.nome}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Equipes;
