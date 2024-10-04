const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

router.post('/register', async (req, res) => {
    const router = express.Router();
    const { nome, email, senha, tipo } = req.body;
    db.query('SELECT * FROM Usuarios WHERE email = ?', [email], async (err, results) => {
        if (results.length > 0) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        db.query('INSERT INTO Usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)', 
        [nome, email, hashedPassword, tipo], (err, results) => {
            if (err) throw err;
            return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
        });
    });
});
router.post('/login', (req, res) => {
    const { email, senha } = req.body;

    db.query('SELECT * FROM Usuarios WHERE email = ?', [email], async (err, results) => {
        if (results.length === 0) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ id: user.rm, tipo: user.tipo }, 'seu_segredo', {
            expiresIn: '1h'
        });

        return res.json({ message: 'Login bem-sucedido', token });
    });
});

module.exports = router;