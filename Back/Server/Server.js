const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/Autenticacao.js');
const contasRoutes = require('./routes/Contas.js'); // Verifique se o nome do arquivo está correto
const rotasAtividadesSalas = require('./routes/AtividadesSalas');

const app = express();
const port = 3304;

// Middleware para interpretar JSON
app.use(bodyParser.json());

// Configuração do CORS
app.use(cors({
  origin: '*', // Verifique se este é o endereço correto do seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/contas', contasRoutes); 
app.use('/api', rotasAtividadesSalas); // A rota para atividades salas

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});