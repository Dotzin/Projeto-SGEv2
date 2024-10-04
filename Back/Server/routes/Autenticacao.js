const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    if (!senha) {
        return res.status(400).json({ message: 'Senha é obrigatória' });
    }

    db.query('SELECT * FROM Usuarios WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error("Erro ao buscar o usuário:", err);
            return res.status(500).json({ message: 'Erro ao buscar o usuário' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        console.log("Senha hasheada:", hashedPassword); 

        db.query('INSERT INTO Usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)', 
        [nome, email, hashedPassword, tipo], (err, results) => {
            if (err) {
                console.error("Erro ao registrar o usuário:", err); 
                return res.status(500).json({ message: 'Erro ao registrar o usuário' });
            }
            return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
        });
    });
});

router.post('/login', (req, res) => {
    const { email, senha } = req.body;

    if (!senha) {
        return res.status(400).json({ message: 'Senha é obrigatória' });
    }

    db.query('SELECT * FROM Usuarios WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error("Erro ao buscar o usuário:", err);
            return res.status(500).json({ message: 'Erro ao buscar o usuário' });
        }
        
        if (results.length === 0) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const user = results[0];
        console.log("Usuário encontrado:", user);

        const isMatch = await bcrypt.compare(senha, user.senha_hash);
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
