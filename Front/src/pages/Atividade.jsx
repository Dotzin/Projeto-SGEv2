import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Sidebar from './components/sidebarEquipe';
import styles from './components/Styles/equipes.module.css';

const EquipeDetalhes = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [sala, setSala] = useState(null);
    const [atividades, setAtividades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState({ tipo: '' });

    const fetchAtividades = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3304/api/salas/${id}/atividades`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar atividades:', error);
            throw new Error('Erro ao carregar as atividades. Tente novamente mais tarde.');
        }
    };


    const verificarUsuario = async () => {
        const token = localStorage.getItem('token'); 
        if (!token) {
            alert('Você precisa estar logado para acessar essa página.');
            return;
        }
 
        try {
            const response = await axios.post('http://localhost:3304/api/auth/verificar', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserInfo(response.data); // Armazena informações do usuário
        } catch (error) {
            console.error('Erro ao verificar usuário:', error);
            alert('Sessão expirada ou usuário não autorizado.');
            // Aqui você pode redirecionar para a página de login, se necessário
        }
    };

    useEffect(() => {
        const fetchSala = async () => {
            try {
                await verificarUsuario(); // Verifica o usuário ao montar o componente
                const atividadesData = await fetchAtividades(id);
                setAtividades(atividadesData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSala();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }


    return (
        <div className={styles.MainConteiner}>
            <Header titulo={sala.nome} />
            <Sidebar />
                <ul>
                    {atividades.length > 0 ? ( 
                        atividades.map((atividade) => (
                            <li key={atividade.id} onClick={() => navigate(`/Atividade/${atividade.id}`)}>
                                <div className={styles.atividade}>
                                    <p><strong>Título:</strong> {atividade.Titulo}</p>
                                    <p><strong>Data de Entrega:</strong> {new Date(atividade.dataEntrega).toLocaleDateString()}</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>Nenhuma atividade encontrada.</p>
                    )}
                </ul>
            </div>
    );
};

export default EquipeDetalhes;
