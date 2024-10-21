import Header from './components/Header';
import Sidebar from './components/Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styles from './components/Styles/equipes.module.css';

// Função para listar salas
const listarSalas = async (rm) => {
    try {
        const response = await axios.get(`http://localhost:3304/api/alunos/${rm}/salas`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao listar salas:', error);
        throw error; // Lançar o erro para ser tratado no useEffect
    }
};

// Função para verificar o token
const verificarToken = async (token) => {
    try {
        const response = await axios.post('http://localhost:3304/api/auth/verificar', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data; // Deve retornar { rm, tipo }
    } catch (error) {
        console.error('Erro ao verificar token:', error);
        throw error; // Lançar o erro para ser tratado no useEffect
    }
};

const Equipes = () => {
    const nav = useNavigate();
    const titulo = "Equipes";
    const [userInfo, setUserInfo] = useState({ rm: '', tipo: '' });
    const [salas, setSalas] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!token) {
                nav('/login');
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
    }, [nav, token]);

    const handleCreateRoom = () => {
        // Lógica para criar uma nova sala
        console.log('Criar nova sala');
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.MainConteiner}>
            <Header titulo={titulo} pagina={titulo} />
            <Sidebar />
            <div className={styles.conteinerEquipes}>
                <div className={styles.contcriarsala}></div>
                {salas.length === 0 ? (
                    <p>Nenhuma sala encontrada.</p>
                ) : (
                    salas.map(sala => (
                        <div className={styles.equipe} key={sala.id}>
                            <div className={styles.BottomEquipes}>
                                <span className={styles.equipenome}>{sala.nome}</span>
                            </div>
                        </div>
                    ))
                )}
                {userInfo.tipo === 'professor' && (
                    <button onClick={handleCreateRoom} className={styles.botaoCriarSala}>
                        Criar Sala
                    </button>
                )}
            </div>
        </div>
    );
};

export default Equipes;
