import React from 'react';
import Header from './components/Header';
import Sidebar from './components/sidebarEquipe';

const AtividadesAluno = () => {
    // Dados fictícios para simular atividades
    const atividades = [
        {
            atividadeId: 1,
            descricao: 'Atividade de Matemática',
            dataEntrega: '2024-10-01',
            nota: 9,
        },
        {
            atividadeId: 2,
            descricao: 'Projeto de História',
            dataEntrega: '2024-10-05',
            nota: null,
        },
        {
            atividadeId: 3,
            descricao: 'Redação sobre Meio Ambiente',
            dataEntrega: '2024-10-10',
            nota: 8,
        },
    ];

    // Estilos inline
    const tableStyle = {
        width: '90%',
        borderCollapse: 'collapse',
        marginTop: '10%',
        marginLeft: "20%"
    };

    const thStyle = {
        backgroundColor: '#f2f2f2',
        padding: '10px',
        border: '1px solid #dddddd',
        textAlign: 'left',
    };

    const tdStyle = {
        padding: '10px',
        border: '1px solid #dddddd',
    };
    const MainCont = {
        backgroundColor: "#252525",
        height: "1000px",
        overflowx: "hidden"
    };

    return (
        <div style={MainCont}>
            <Header />
            <Sidebar />
            <h1>Atividades do Aluno</h1>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Descrição</th>
                        <th style={thStyle}>Data de Entrega</th>
                        <th style={thStyle}>Nota</th>
                    </tr>
                </thead>
                <tbody>
                    {atividades.map((atividade) => (
                        <tr key={atividade.atividadeId}>
                            <td style={tdStyle}>{atividade.atividadeId}</td>
                            <td style={tdStyle}>{atividade.descricao}</td>
                            <td style={tdStyle}>{new Date(atividade.dataEntrega).toLocaleDateString()}</td>
                            <td style={tdStyle}>{atividade.nota !== null ? atividade.nota : 'Não Avaliado'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AtividadesAluno;
