
import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

interface SignupPageProps {
  onSignupSuccess: () => void;
  onNavigateToLogin: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignupSuccess, onNavigateToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    setError('');
    // Mock signup logic
    console.log('Signing up with:', { name, email, password });
    onSignupSuccess();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl shadow-cyan-500/10">
        <h1 className="text-4xl font-bold text-center text-white mb-2">Criar Conta</h1>
        <p className="text-center text-gray-400 mb-8">Junte-se à revolução E-DRONE.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu Nome Completo" label="Nome" />
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" label="Email" />
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" label="Senha" />
          <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" label="Confirmar Senha" />
          
          {error && <p className="text-red-400 text-sm text-center pt-2">{error}</p>}

          <div className="pt-4">
            <Button type="submit" onClick={() => {}}>Cadastrar</Button>
          </div>
        </form>

        <p className="mt-8 text-center text-gray-400">
          Já tem uma conta?{' '}
          <button onClick={onNavigateToLogin} className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
            Faça login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
