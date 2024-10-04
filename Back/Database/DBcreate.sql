CREATE DATABASE SGE;
use  SGE;
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(100),
    tipo ENUM('aluno', 'professor')
);

CREATE TABLE Salas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    professorId INT,
    FOREIGN KEY (professorId) REFERENCES Usuarios(id)
);

CREATE TABLE Salas_Alunos (
    salaId INT,
    alunoId INT,
    PRIMARY KEY (salaId, alunoId),
    FOREIGN KEY (salaId) REFERENCES Salas(id),
    FOREIGN KEY (alunoId) REFERENCES Usuarios(id)
);

CREATE TABLE Atividades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    salaId INT,
    descricao TEXT,
    dataEntrega DATE,
    FOREIGN KEY (salaId) REFERENCES Salas(id)
);

CREATE TABLE Entregas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    atividadeId INT,
    alunoId INT,
    arquivo VARCHAR(255),
    dataEntrega DATE,
    FOREIGN KEY (atividadeId) REFERENCES Atividades(id),
    FOREIGN KEY (alunoId) REFERENCES Usuarios(id)
);

CREATE TABLE Mensagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    salaId INT,
    mensagem TEXT,
    dataEnvio DATETIME,
    FOREIGN KEY (salaId) REFERENCES Salas(id)
);

CREATE TABLE Materiais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    salaId INT,
    arquivo VARCHAR(255),
    descricao TEXT,
    FOREIGN KEY (salaId) REFERENCES Salas(id)
);


