const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/Autenticacao.js');
const contasRoutes = require('./routes/Contas.js'); // Verifique se o nome do arquivo está correto

const app = express();
const port = 3304;

app.use(bodyParser.json());

// Usar as rotas de autenticação e contas
app.use('/api/auth', authRoutes);
app.use('/api/contas', contasRoutes); // Certifique-se de que a rota está registrada corretamente

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});