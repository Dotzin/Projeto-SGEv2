const mysql = require('mysql2');

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost', // Altere se necessário
    user: 'root', // Substitua pelo seu usuário
    password: '', // Substitua pela sua senha
    database: 'SGE', // Substitua pelo seu banco de dados
    port:3305
});

// Conecta ao banco de dados// Conecta ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados.');

    // Insere 30 professores
    let professores = [];
    for (let i = 1; i <= 30; i++) {
        professores.push(`('Professor ${i}', 'professor${i}@example.com', 'senha_hash${i}', 'professor')`);
    }
    
    const sqlProfessores = `INSERT INTO Usuarios (nome, email, senha_hash, tipo) VALUES ${professores.join(', ')}`;
    connection.query(sqlProfessores, (err, result) => {
        if (err) {
            console.error('Erro ao inserir professores:', err);
            return;
        }
        console.log('30 professores inseridos com sucesso!');
        
        // Encerra a conexão
        connection.end((err) => {
            if (err) {
                console.error('Erro ao encerrar a conexão:', err);
                return;
            }
            console.log('Conexão encerrada com sucesso.');
        });
    });
});