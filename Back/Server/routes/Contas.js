const express = require('express');
const db = require('../db'); // Certifique-se de que o caminho esteja correto
const router = express.Router();

// Rota para obter todos os usuários
router.get('/', (req, res) => {  // Alterado para GET em vez de POST
    db.query('SELECT * FROM Usuarios', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao consultar usuários', error: err });
        }
        res.json(results);
    });
});

module.exports = router;