// EquipeDetalhes.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import styles from './components/Styles/equipes.module.css';

const EquipeDetalhes = () => {
    const { id } = useParams();
    const [equipe, setEquipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEquipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3304/api/equipes/${id}`);
                setEquipe(response.data);
            } catch (error) {
                console.error('Erro ao buscar detalhes da equipe:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEquipe();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!equipe) {
        return <p>Equipe não encontrada.</p>;
    }

    return (
        <div className={styles.MainConteiner}>
            <Header titulo={equipe.nome} />
            <Sidebar />
            <div className={styles.conteinerEquipes}>
                <h2>{equipe.nome}</h2>
                <p>{equipe.descricao}</p>
                {/* Adicione mais detalhes conforme necessário */}
            </div>
        </div>
    );
};

export default EquipeDetalhes;
