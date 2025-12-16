import { useState } from 'react';
import { Activity, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (user: any) => void;
}

// Códigos de acesso pré-definidos que determinam o tipo de usuário
const ACCESS_CODES = {
  'ADMIN001': { role: 'admin', name: 'Administrador Sistema' },
  'MED001': { role: 'medico', name: 'Dr. João Silva' },
  'MED002': { role: 'medico', name: 'Dra. Maria Santos' },
  'ENF001': { role: 'enfermeiro', name: 'Enf. Maria Costa' },
  'ENF002': { role: 'enfermeiro', name: 'Enf. Pedro Oliveira' },
  'REC001': { role: 'recepcao', name: 'Recepção - Ana Paula' },
  'REC002': { role: 'recepcao', name: 'Recepção - Carlos Lima' }
};

export function Login({ onLogin }: LoginProps) {
  const [accessCode, setAccessCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validar código de acesso
    const userInfo = ACCESS_CODES[accessCode as keyof typeof ACCESS_CODES];
    
    if (!accessCode || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (!userInfo) {
      setError('Código de acesso inválido');
      return;
    }

    // Mock authentication - aceita qualquer senha para demonstração
    if (password) {
      onLogin({
        id: accessCode,
        name: userInfo.name,
        accessCode: accessCode,
        role: userInfo.role
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-600 p-3 rounded-full">
            <Activity className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-center mb-2">Sistema Hospitalar</h1>
        <p className="text-center text-gray-600 mb-8">Faça login com seu código de acesso</p>

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
              placeholder="Ex: ADMIN001"
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

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700 mb-3">Códigos de acesso disponíveis:</p>
          <div className="text-sm space-y-2">
            <div className="flex items-center justify-between py-1">
              <span className="text-purple-700">ADMIN001</span>
              <span className="text-gray-600">Administrador</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-blue-700">MED001 / MED002</span>
              <span className="text-gray-600">Médicos</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-green-700">ENF001 / ENF002</span>
              <span className="text-gray-600">Enfermeiros</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-orange-700">REC001 / REC002</span>
              <span className="text-gray-600">Recepção</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-3">
            Use qualquer senha para demonstração
          </p>
        </div>
      </div>
    </div>
  );
}