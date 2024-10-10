import Header from './components/Header';
import Sidebar from './components/Sidebar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './components/Styles/equipes.module.css';

const verificarToken = async (token) => {
    try {
        const response = await axios.post('http://localhost:3304/api/auth/verificar', {}, {
            headers: {
                Authorization: `Bearer ${token}` // Inclui o token no cabeçalho
            }
        });

        const { rm, tipo } = response.data;
        return { rm, tipo };
    } catch (error) {
        if (error.response) {
            console.error('Erro ao verificar o token:', error.response.data);
        } else {
            console.error('Erro ao fazer a requisição:', error.message);
        }
        throw error;
    }
};

const listarSalas = async (rm) => {
    try {
        const response = await axios.get(`http://localhost:3304/api/alunos/${rm}/salas`);
        console.log(response.data); // Verifique o que está sendo retornado
        return response.data; // Retorna as salas
    } catch (error) {
        console.error('Erro ao listar salas:', error);
        throw error;
    }
};

const Equipes = () => {
    const titulo = "Equipes";
    const [userInfo, setUserInfo] = useState({ rm: '', tipo: '' });
    const [salas, setSalas] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await verificarToken(token);
                setUserInfo(data);
                const salasData = await listarSalas(data.rm);
                setSalas(Array.isArray(salasData) ? salasData : []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchUserInfo();
        } else {
            setLoading(false); // No token, stop loading
        }
    }, [token]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.MainConteiner}>
            <Header titulo={titulo} />
            <Sidebar />
            <div className={styles.conteinerEquipes}>
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
            </div>
        </div>
    );
};

export default Equipes;