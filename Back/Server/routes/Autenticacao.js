const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

const queryDb = (query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

router.post('/register', async (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    // Verifica se a senha está presente
    if (!senha) {
        return res.status(400).json({ message: 'Senha é obrigatória' });
    }

    // Valida o tipo de usuário
    if (!['aluno', 'professor'].includes(tipo)) {
        return res.status(400).json({ message: 'Tipo de usuário inválido' });
    }

    try {
        // Verifica se o usuário já existe
        const existingUser = await queryDb('SELECT * FROM Usuarios WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        console.log("Senha hasheada:", hashedPassword);

        await queryDb('INSERT INTO Usuarios (nome, email, senha_hash, tipo) VALUES (?, ?, ?, ?)', 
            [nome, email, hashedPassword, tipo]);

        return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } 
    catch (err) {
        console.error("Erro ao registrar o usuário:", err);
        return res.status(500).json({ message: 'Erro ao registrar o usuário' });
    }
});

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!senha) {
        return res.status(400).json({ message: 'Senha é obrigatória' });
    }

    try {
        const results = await queryDb('SELECT * FROM Usuarios WHERE email = ?', [email]);
        if (results.length === 0) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const user = results[0];
        console.log("Usuário encontrado:", user);

        const isMatch = await bcrypt.compare(senha, user.senha_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Gera o token JWT
        const token = jwt.sign({ id: user.rm, tipo: user.tipo }, 'seu_segredo', {
            expiresIn: '1h'
        });

        return res.json({ message: 'Login bem-sucedido', token, rm: user.rm, tipo:user.tipo }); // Retorna o token no corpo da resposta
    } catch (err) {
        console.error("Erro ao buscar o usuário:", err);
        return res.status(500).json({ message: 'Erro ao buscar o usuário' });
    }
});

module.exports = router;
