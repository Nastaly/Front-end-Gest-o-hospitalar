import { useState } from 'react';
import { Activity, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (user: any) => void;
}

// Resolve o papel do utilizador com base no código
function resolveUser(accessCode: string) {
  const code = accessCode.toUpperCase();

  if (code.startsWith('ADMIN')) {
    return { role: 'admin', name: 'Administrador' };
  }

  if (code.startsWith('MED')) {
    return { role: 'medico', name: 'Médico' };
  }

  if (code.startsWith('ENF')) {
    return { role: 'enfermeiro', name: 'Enfermeiro' };
  }

  if (code.startsWith('REC')) {
    return { role: 'recepcao', name: 'Recepção' };
  }

  return null;
}

export function Login({ onLogin }: LoginProps) {
  const [accessCode, setAccessCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!accessCode || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    const userInfo = resolveUser(accessCode);

    if (!userInfo) {
      setError('Código de acesso inválido');
      return;
    }

    // Mock login (substituir por API no futuro)
    onLogin({
      id: accessCode,
      accessCode,
      name: userInfo.name,
      role: userInfo.role
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
        
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-600 p-3 rounded-full">
            <Activity className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-center mb-2 text-2xl font-semibold">
          Sistema Hospitalar
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Faça login com seu código de acesso
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="accessCode" className="block mb-2 text-gray-700">
              Código de Acesso
            </label>
            <input
              id="accessCode"
              type="text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
              placeholder="Ex: MED001"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-gray-700">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Entrar
          </button>
        </form>

        {/* Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700 mb-3">Perfis disponíveis:</p>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-purple-700">ADMINxxx</span>
              <span className="text-gray-600">Administrador</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">MEDxxx</span>
              <span className="text-gray-600">Médico</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">ENFxxx</span>
              <span className="text-gray-600">Enfermeiro</span>
            </div>
            <div className="flex justify-between">
              <span className="text-orange-700">RECxxx</span>
              <span className="text-gray-600">Recepção</span>
            </div>
          </div>

          <p className="text-gray-500 text-xs mt-3">
            Qualquer senha é aceite (modo demonstração)
          </p>
        </div>
      </div>
    </div>
  );
}
