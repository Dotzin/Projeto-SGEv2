import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate ao invés de useHistory
import styles from '../pages/components/Styles/login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate(); // Inicializando o navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3304/api/auth/login', {
        email,
        senha,
      });

      localStorage.setItem('token', response.data.token);
      setMensagem('Login bem-sucedido!');

      // Configura o cabeçalho padrão para requisições futuras
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      // Redireciona para a página /equipe
      navigate('/equipes'); // Usando navigate para redirecionar
    } catch (error) {
      setMensagem('Erro no login: ' + (error.response?.data?.message || 'Erro desconhecido'));
    }
  };

  return (
    <div className={styles.conteinerLogin}>
      <div className={styles.formularioLogin}>
        <h2>Login - SGE</h2>
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit" className={styles.button}>Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;