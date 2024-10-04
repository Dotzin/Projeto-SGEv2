const express = require('express');
const db = require('../db'); 
const router = express.Router();

router.get('/', (req, res) => {  
    db.query('SELECT * FROM Usuarios', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao consultar usuários', error: err });
        }
        res.json(results);
    });
});

module.exports = router;