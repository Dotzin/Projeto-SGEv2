import React from 'react';
import Header from './components/Header';
import Sidebar from './components/sidebarEquipe';
import styles from './components/Styles/equipes.module.css'; // Importando o CSS

const AtividadesAluno = () => {
    // Conjunto fixo de atividades
    const atividades = [
        { atividadeId: 1, descricao: 'Atividade de Matemática', dataEntrega: '2024-10-20', nota: 8 },
        { atividadeId: 2, descricao: 'Atividade de História', dataEntrega: '2024-10-22', nota: null },
        { atividadeId: 3, descricao: 'Atividade de Ciências', dataEntrega: '2024-10-25', nota: 9 },
        { atividadeId: 4, descricao: 'Atividade de Português', dataEntrega: '2024-10-27', nota: 10 },
        { atividadeId: 5, descricao: 'Atividade de Geografia', dataEntrega: '2024-10-30', nota: null },
    ];

    return (
        <div style={{height: "100vh"}}>
        <Header />
        <Sidebar />
        <div className={styles.MainConteinerTrabalhos2}>
            
            <div className={styles.atividades}>
                <h1 style={{ textAlign: 'center', color: 'white' }}>Atividades do Aluno</h1>
                <div className={styles.conteinerAtiv}>
                    <table style={{ width: '100%', color: 'white'}}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Descrição</th>
                                <th>Data de Entrega</th>
                                <th>Nota</th>
                            </tr>
                        </thead>
                        <tbody>
                            {atividades.map((atividade) => (
                                <tr key={atividade.atividadeId} className={styles.atividade}>
                                    <td>{atividade.atividadeId}</td>
                                    <td>{atividade.descricao}</td>
                                    <td>{atividade.dataEntrega}</td>
                                    <td>{atividade.nota !== null ? atividade.nota : 'Não Avaliado'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    );
};

export default AtividadesAluno;
