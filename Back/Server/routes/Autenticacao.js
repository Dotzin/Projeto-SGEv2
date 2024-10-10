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

const SECRET_KEY = 'oBrianDaoCude4'; // Mantenha esta chave secreta consistente

// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {
    const { rm, nome, email, senha, tipo } = req.body;
    if (!senha) {
        return res.status(400).json({ message: 'Senha é obrigatória' });
    }
    if (!['aluno', 'professor'].includes(tipo)) {
        return res.status(400).json({ message: 'Tipo de usuário inválido' });
    }
    try {
        const existingUser = await queryDb('SELECT * FROM Usuarios WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        await queryDb('INSERT INTO Usuarios (id, nome, email, senha_hash, tipo) VALUES (?, ?, ?, ?, ?)', 
            [rm, nome, email, hashedPassword, tipo]);

        return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } 
    catch (err) {
        console.error("Erro ao registrar o usuário:", err);
        return res.status(500).json({ message: 'Erro ao registrar o usuário' });
    }
});
// Rota para login de usuário
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
        const isMatch = await bcrypt.compare(senha, user.senha_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Gera o token JWT, incluindo rm e tipo
        const token = jwt.sign({ id: user.id, tipo: user.tipo, rm: user.id }, SECRET_KEY, {
            expiresIn: '1h'
        });

        return res.json({ message: 'Login bem-sucedido', token, rm: user.id, tipo: user.tipo });
    } catch (err) {
        console.error("Erro ao buscar o usuário:", err);
        return res.status(500).json({ message: 'Erro ao buscar o usuário' });
    }
});
// Rota para verificar o token
router.post("/verificar", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("Token decodificado:", decoded); // Verifique se rm e id estão aqui

        // Retorna o rm e o tipo do usuário
        return res.json({ rm: decoded.rm, tipo: decoded.tipo });
    } catch (err) {
        console.error("Erro ao verificar o token:", err);
        return res.status(401).json({ message: 'Token inválido' });
    }
});
module.exports = router;