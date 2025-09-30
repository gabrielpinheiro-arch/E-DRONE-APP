
import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onNavigateToSignup: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigateToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    setError('');
    // Mock login logic
    console.log('Logging in with:', { email, password });
    onLoginSuccess();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl shadow-cyan-500/10">
        <h1 className="text-4xl font-bold text-center text-white mb-2">E-DRONE</h1>
        <p className="text-center text-gray-400 mb-8">O primeiro serviço de delivery por drones do Brasil!</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" label="Email" />
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" label="Senha" />
          
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <Button type="submit" onClick={() => {}}>Entrar</Button>
        </form>

        <p className="mt-8 text-center text-gray-400">
          Não tem uma conta?{' '}
          <button onClick={onNavigateToSignup} className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
