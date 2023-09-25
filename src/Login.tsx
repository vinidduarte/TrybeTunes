import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from './services/userAPI';

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleLogin = async () => {
    if (name.length >= 3) {
      setIsLoading(true);

      try {
        await createUser({ name });
        setIsLoading(false);
        navigate('/search');
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        value={ name }
        onChange={ handleNameChange }
        data-testid="login-name-input"
        placeholder="Digite seu nome"
      />
      <button
        onClick={ handleLogin }
        disabled={ name.length < 3 || isLoading }
        data-testid="login-submit-button"
      >
        {isLoading ? 'Carregando...' : 'Entrar'}
      </button>
    </div>
  );
}

export default Login;
