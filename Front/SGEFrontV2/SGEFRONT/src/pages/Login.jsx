import React, { useState } from 'react';
import axios from 'axios';
import './components/styles/login.css';

const Login = () => {
  const [email, setEmail] = useState(''); // Altere 'username' para 'email'
  const [senha, setSenha] = useState(''); // Altere 'password' para 'senha'
  const [mensagem, setMensagem] = useState('');

  // Função handleLogin deve ser assíncrona
  const handleLogin = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    try {
      // Faz a requisição de login
      const response = await axios.post('http://localhost:3304/api/auth/login', {
        email, // Envia o email em vez de username
        senha, // Envia a senha
      });

      // Armazena o token no localStorage
      localStorage.setItem('token', response.data.token);
      setMensagem('Login bem-sucedido!');

      // Configura o cabeçalho padrão para requisições futuras
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    } catch (error) {
      // Tratamento de erro
      setMensagem('Erro no login: ' + (error.response?.data?.message || 'Erro desconhecido'));
    }
  };

  return (
    <div className="conteinerLogin">
      <div className="formularioLogin">
        <h2>Login - SGE</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email" // Altere o tipo para "email"
            placeholder="Email" // Altere o placeholder para "Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required // Torna o campo obrigatório
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required // Torna o campo obrigatório
          />
          <button type="submit">Entrar</button>
        </form>
        {mensagem && <p>{mensagem}</p>} {/* Exibe a mensagem de erro ou sucesso */}
      </div>
    </div>
  );
};

export default Login;
