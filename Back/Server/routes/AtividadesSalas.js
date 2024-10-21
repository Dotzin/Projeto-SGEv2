const express = require('express');
const db = require('../db');
const path = require('path');
const multer = require('multer');

const storageEntregas = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../../uploads/Entregas');
  },
  filename: (req, file, cb) => {
    const { atividadeId, alunoId } = req.body;
    if (!atividadeId || !alunoId) {
      return cb(new Error('Atividade ID e Aluno ID são obrigatórios.'));
    }
    
    const originalName = path.basename(file.originalname, path.extname(file.originalname));
    const newFileName = `${originalName}_${atividadeId}_${alunoId}${path.extname(file.originalname)}`;
    cb(null, newFileName);
  }
});

const uploadEntregas = multer({ storage: storageEntregas });

const storageMateriais = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../../uploads/Materiais');
  },
  filename: (req, file, cb) => {
    const { atividadeId, alunoId } = req.body;
    if (!atividadeId || !alunoId) {
      return cb(new Error('Atividade ID e Aluno ID são obrigatórios.'));
    }
    
    const originalName = path.basename(file.originalname, path.extname(file.originalname));
    const newFileName = `${originalName}_${atividadeId}_${alunoId}${path.extname(file.originalname)}`;
    cb(null, newFileName);
  }
});

const uploadMateriais = multer({ storage: storageMateriais });

const router = express.Router();

const queryDatabase = (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Criar sala
router.post("/salas/criar", async (req, res) => {
  const { nome, professorId } = req.body;
  
  try {
    if (!nome){
      return res.status(400).json({ message: 'Nome é obrigatório.' });
    }
    if (!professorId) {
      return res.status(400).json({ message: 'Professor ID é obrigatório.' });
    }
    const [professor] = await queryDatabase('SELECT tipo FROM Usuarios WHERE id = ?', [professorId]);
    
    if (!professor || professor.tipo !== 'professor') {
      return res.status(400).json({ message: 'O ID fornecido não pertence a um professor.' });
    }
    const results = await queryDatabase('INSERT INTO Salas (nome, professorId) VALUES (?, ?)', [nome, professorId]);
    res.status(201).json({ id: results.insertId, nome, professorId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar sala.' });
  }
});

// Listar salas
router.get('/salas/listar', async (req, res) => {
  try {
    const results = await queryDatabase('SELECT * FROM Salas');
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar salas.' });
  }
});

// Adicionar alunos à sala
router.post('/salas/addAlunos', async (req, res) => {
  const { salaId, alunoId } = req.body;

  if (!salaId || !alunoId) {
    return res.status(400).json({ message: 'salaId e alunoId são obrigatórios.' });
  }

  try {
    const salaResults = await queryDatabase('SELECT COUNT(*) AS count FROM Salas WHERE id = ?', [salaId]);
    if (salaResults[0].count === 0) {
      return res.status(404).json({ message: 'Sala não encontrada.' });
    }

    const alunoResults = await queryDatabase('SELECT COUNT(*) AS count FROM Usuarios WHERE id = ?', [alunoId]);
    if (alunoResults[0].count === 0) {
      return res.status(404).json({ message: 'Aluno não encontrado.' });
    }

    await queryDatabase('INSERT INTO Salas_Alunos (salaId, alunoId) VALUES (?, ?)', [salaId, alunoId]);
    res.status(201).json({ message: 'Aluno adicionado à sala com sucesso.', salaId, alunoId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao adicionar aluno à sala.' });
  }
});
// Adicionar atividades
router.post("/atividades/adicionar", async (req, res) => {
  const { salaId, Titulo, descricao, dataEnvio } = req.body;

  if (!salaId || !Titulo || !descricao || !dataEnvio) {
    return res.status(400).json({ message: 'SalaId, Título, Descrição e Data de Envio são obrigatórios.' });
  }

  try {
    const salaResults = await queryDatabase('SELECT COUNT(*) AS count FROM Salas WHERE id = ?', [salaId]);
    if (salaResults[0].count === 0) {
      return res.status(404).json({ message: 'Sala não encontrada.' });
    }

    const results = await queryDatabase('INSERT INTO Atividades (salaId, Titulo, Descricao, dataEntrega) VALUES (?, ?, ?, ?)', [salaId, Titulo, descricao, dataEnvio]);
    res.status(201).json({ message: 'Atividade adicionada com sucesso.', id: results.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao adicionar atividade.' });
  }
});

// Avaliar atividades
router.post('/atividades/avaliar', async (req, res) => {
  const { atividadeId, alunoId, nota, comentario } = req.body;

  if (!atividadeId || !alunoId || !nota) {
    return res.status(400).json({ message: 'atividadeId, alunoId e nota são obrigatórios.' });
  }

  try {
    const atividadeResults = await queryDatabase('SELECT COUNT(*) AS count FROM Atividades WHERE id = ?', [atividadeId]);
    if (atividadeResults[0].count === 0) {
      return res.status(404).json({ message: 'Atividade não encontrada.' });
    }

    const alunoResults = await queryDatabase('SELECT COUNT(*) AS count FROM Usuarios WHERE id = ?', [alunoId]);
    if (alunoResults[0].count === 0) {
      return res.status(404).json({ message: 'Aluno não encontrado.' });
    }

    const results = await queryDatabase('INSERT INTO Avaliacoes (atividadeId, alunoId, nota, comentario) VALUES (?, ?, ?, ?)', [atividadeId, alunoId, nota, comentario]);
    res.status(201).json({ message: 'Avaliação registrada com sucesso.', id: results.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao registrar avaliação.' });
  }
});

// Listar atividades de uma sala
router.get('/salas/:salaId/atividades', async (req, res) => {
  const { salaId } = req.params;

  try {
    const results = await queryDatabase('SELECT * FROM Atividades WHERE salaId = ?', [salaId]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar atividades.' });
  }
});

// Listar alunos de uma sala
router.get('/salas/:salaId/alunos', async (req, res) => {
  const { salaId } = req.params;

  try {
    const results = await queryDatabase(`
      SELECT U.id, U.nome 
      FROM Salas_Alunos SA
      JOIN Usuarios U ON SA.alunoId = U.id
      WHERE SA.salaId = ?`, [salaId]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar alunos.' });
  }
});

// Obter notas de um aluno para uma atividade
router.get('/atividades/:atividadeId/aluno/:alunoId/notas', async (req, res) => {
  const { atividadeId, alunoId } = req.params;

  try {
    const results = await queryDatabase('SELECT nota, comentario FROM Avaliacoes WHERE atividadeId = ? AND alunoId = ?', [atividadeId, alunoId]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar notas.' });
  }
});

// Listar avaliações de uma atividade
router.get('/atividades/:atividadeId/avaliacoes', async (req, res) => {
  const { atividadeId } = req.params;

  try {
    const results = await queryDatabase(`
      SELECT U.nome, A.nota, A.comentario 
      FROM Avaliacoes A
      JOIN Usuarios U ON A.alunoId = U.id
      WHERE A.atividadeId = ?`, [atividadeId]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar avaliações.' });
  }
});

// Listar atividades de um aluno
router.get('/alunos/:alunoId/atividades', async (req, res) => {
  const { alunoId } = req.params;

  try {
    const results = await queryDatabase(`
      SELECT A.id AS atividadeId, A.descricao, A.dataEntrega, E.arquivo, E.dataEntrega AS dataEntregaArquivo, V.nota
      FROM Atividades A
      LEFT JOIN Entregas E ON A.id = E.atividadeId AND E.alunoId = ?
      LEFT JOIN Avaliacoes V ON A.id = V.atividadeId AND V.alunoId = ?
      WHERE A.salaId IN (SELECT salaId FROM Salas_Alunos WHERE alunoId = ?)`, [alunoId, alunoId, alunoId]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar atividades do aluno.' });
  }
});

// Enviar mensagens em uma sala
router.post('/salas/:salaId/mensagens', async (req, res) => {
  const { salaId } = req.params;
  const { mensagem } = req.body;
  const usuarioId = req.user.id;

  if (!mensagem) {
    return res.status(400).json({ message: 'Mensagem é obrigatória.' });
  }

  try {
    const results = await queryDatabase('INSERT INTO Mensagens (salaId, usuarioId, mensagem) VALUES (?, ?, ?)', [salaId, usuarioId, mensagem]);
    res.status(201).json({ message: 'Mensagem enviada com sucesso.', id: results.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao enviar mensagem.' });
  }
});

// Listar mensagens em uma sala
router.get('/salas/:salaId/mensagens', async (req, res) => {
  const { salaId } = req.params;

  try {
    const results = await queryDatabase('SELECT * FROM Mensagens WHERE salaId = ?', [salaId]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar mensagens.' });
  }
});

// Enviar entregas
router.post('/atividades/:atividadeId/entregar', uploadEntregas.single('arquivo'), async (req, res) => {
  const { atividadeId } = req.params;
  const { alunoId } = req.body;

  try {
    const results = await queryDatabase('INSERT INTO Entregas (atividadeId, alunoId, arquivo, dataEntrega) VALUES (?, ?, ?, NOW())', [atividadeId, alunoId, req.file.filename]);
    res.status(201).json({ message: 'Entrega registrada com sucesso.', id: results.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao registrar entrega.' });
  }
});

// Listar entregas de uma atividade
router.get('/atividades/:atividadeId/entregas', async (req, res) => {
  const { atividadeId } = req.params;

  try {
    const results = await queryDatabase('SELECT * FROM Entregas WHERE atividadeId = ?', [atividadeId]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar entregas.' });
  }
});
//Lista a entrega do aluno
router.get('/atividades/:atividadeId/aluno/:alunoId/entrega', (req, res) => {
    const { atividadeId, alunoId } = req.params;

    // Consulta para buscar a entrega correspondente ao aluno e à atividade
    const query = `
        SELECT E.atividadeId, E.alunoId, E.arquivo, E.dataEntrega
        FROM Entregas E
        WHERE E.atividadeId = ? AND E.alunoId = ?`;

    db.query(query, [atividadeId, alunoId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao listar entrega.' });
        }

        // Verifica se houve alguma entrega
        if (results.length === 0) {
            return res.status(404).json({ message: 'Entrega não encontrada.' });
        }

        // Retorna os detalhes da entrega
        res.json(results[0]); // Retorna apenas o primeiro resultado, já que deve haver apenas uma entrega por aluno em uma atividade
    });
});
router.post('/salas/:salaId/materiais', uploadMateriais.single('arquivo'), (req, res) => {
  const { salaId } = req.params;
  const { descricao } = req.body;

  // Verifica se o arquivo foi enviado
  if (!req.file) {
      return res.status(400).json({ message: 'Arquivo é obrigatório.' });
  }

  // Verifica se a descrição foi fornecida
  if (!descricao) {
      return res.status(400).json({ message: 'Descrição é obrigatória.' });
  }

  // Consulta para verificar se a sala existe
  const querySala = 'SELECT COUNT(*) AS count FROM Salas WHERE id = ?';
  db.query(querySala, [salaId], (err, results) => {
      if (err || results[0].count === 0) {
          return res.status(404).json({ message: 'Sala não encontrada.' });
      }

      // Inserindo o material na tabela Materiais
      const queryInsert = 'INSERT INTO Materiais (salaId, arquivo, descricao) VALUES (?, ?, ?)';
      db.query(queryInsert, [salaId, req.file.path, descricao], (err, results) => {
          if (err) {
              console.error(err);
              return res.status(500).json({ message: 'Erro ao adicionar material.' });
          }
          res.status(201).json({ message: 'Material adicionado com sucesso.', id: results.insertId });
      });
  });
});
// Listar salas de um aluno
router.get('/alunos/:alunoId/salas', async (req, res) => {
  const { alunoId } = req.params;

  try {
    const results = await queryDatabase(`
      SELECT S.id, S.nome 
      FROM Salas S
      JOIN Salas_Alunos SA ON S.id = SA.salaId
      WHERE SA.alunoId = ?`, [alunoId]);
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Nenhuma sala encontrada para o aluno.' });
    }

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar salas.' });
  }
});
router.get('/materiais/:salaId/salas', async (req, res) => {
  const { salaID } = req.params;

  try {
    const results = await queryDatabase(`
      SELECT * FROM Materiais WHERE salaId = ?`, [salaID]);
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Nenhum material nessa sala' });
    }

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar Materiais.' });
  }
});

module.exports = router;