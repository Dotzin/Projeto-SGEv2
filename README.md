markdown

# Sistema de Gerenciamento Escolar (SGE)

## Visão Geral

Este projeto é um Sistema de Gerenciamento Escolar desenvolvido com Node.js e Express. O sistema permite que usuários (alunos e professores) se registrem, façam login e interajam com suas contas.

## Estrutura do Projeto

/sistema-gerenciamento-escolar │ ├── server.js # Arquivo principal para iniciar o servidor ├── db.js # Conexão com o banco de dados ├── routes # Pasta que contém as rotas da API │ ├── Autenticacao.js # Rotas de autenticação │ └── Contas.js # Rotas de gerenciamento de contas └── package.json # Dependências do projeto

sql


## Dependências

- `express`: Framework para criar o servidor web.
- `body-parser`: Middleware para analisar o corpo das requisições.
- `bcryptjs`: Biblioteca para hash de senhas.
- `jsonwebtoken`: Biblioteca para gerar e verificar tokens JWT.

## Configuração do Banco de Dados

O sistema se conecta a um banco de dados onde os usuários são armazenados na tabela `Usuarios`. A estrutura da tabela é a seguinte:

```sql
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha_hash VARCHAR(255),
    tipo ENUM('aluno', 'professor') -- Exemplo de tipos de usuário
);
```
Rotas da API
Rotas de Autenticação

    POST /api/auth/register
        Registra um novo usuário.
        Body: { "nome": "string", "email": "string", "senha": "string", "tipo": "string" }
        Response:
            201: Usuário registrado com sucesso.
            400: Se a senha estiver faltando ou se o usuário já existir.

    POST /api/auth/login
        Realiza o login de um usuário.
        Body: { "email": "string", "senha": "string" }
        Response:
            200: Login bem-sucedido, retorna o token JWT.
            401: Se as credenciais forem inválidas ou se a senha estiver faltando.

Rotas de Contas

    GET /api/contas
        Lista todos os usuários.
        Response:
            200: Retorna um array de usuários.
            500: Erro ao consultar usuários.

Como Rodar o Projeto

    Instalar Dependências:

    bash

npm install

Iniciar o Servidor:

bash

node server.js

O servidor estará rodando em http://localhost:3304.