const express = require('express');

const app = express();
const port = 3304;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});