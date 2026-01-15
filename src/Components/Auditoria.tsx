import { useState } from 'react';
import { Search, Calendar, Download } from 'lucide-react';

export function Auditoria() {
  const [logs] = useState([
    {
      id: '1',
      data: '2025-12-05 14:32:15',
      usuario: 'Dr. João Silva',
      acao: 'Criou prontuário',
      entidade: 'Prontuário #000001',
      detalhes: 'Prontuário criado para paciente Maria Santos',
      ip: '192.168.1.100'
    },
    {
      id: '2',
      data: '2025-12-05 13:15:42',
      usuario: 'Dra. Ana Costa',
      acao: 'Agendou consulta',
      entidade: 'Consulta #000123',
      detalhes: 'Consulta agendada para Carlos Oliveira - Ortopedia',
      ip: '192.168.1.105'
    },
    {
      id: '3',
      data: '2025-12-05 12:08:30',
      usuario: 'Recepção - Paula Silva',
      acao: 'Cadastrou paciente',
      entidade: 'Paciente #000045',
      detalhes: 'Novo paciente cadastrado: João Pereira',
      ip: '192.168.1.110'
    },
    {
      id: '4',
      data: '2025-12-05 11:45:18',
      usuario: 'Admin - Carlos Admin',
      acao: 'Cadastrou funcionário',
      entidade: 'Funcionário #000012',
      detalhes: 'Novo funcionário cadastrado: Enfermeira Maria Costa',
      ip: '192.168.1.50'
    },
    {
      id: '5',
      data: '2025-12-05 10:22:55',
      usuario: 'Farmácia - Roberto Santos',
      acao: 'Atualizou estoque',
      entidade: 'Medicamento Dipirona 500mg',
      detalhes: 'Adicionado 200 unidades ao estoque',
      ip: '192.168.1.120'
    },
    {
      id: '6',
      data: '2025-12-05 09:15:33',
      usuario: 'Dr. Pedro Santos',
      acao: 'Atualizou prontuário',
      entidade: 'Prontuário #000002',
      detalhes: 'Adicionada nova prescrição médica',
      ip: '192.168.1.102'
    },
    {
      id: '7',
      data: '2025-12-04 16:45:21',
      usuario: 'Triagem - Enf. Laura Silva',
      acao: 'Realizou triagem',
      entidade: 'Triagem #000089',
      detalhes: 'Triagem realizada - Prioridade Alta',
      ip: '192.168.1.115'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('Todas');

  const actions = ['Todas', 'Criou prontuário', 'Agendou consulta', 'Cadastrou paciente', 'Atualizou estoque'];

  const filteredLogs = logs.filter(log => {
    const matchSearch = 
      log.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.acao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.detalhes.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchAction = selectedAction === 'Todas' || log.acao === selectedAction;

    return matchSearch && matchAction;
  });

  const getAcaoColor = (acao: string) => {
    if (acao.includes('Criou') || acao.includes('Cadastrou')) {
      return 'bg-green-100 text-green-700';
    } else if (acao.includes('Atualizou')) {
      return 'bg-blue-100 text-blue-700';
    } else if (acao.includes('Excluiu')) {
      return 'bg-red-100 text-red-700';
    }
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-2">Ações Hoje</p>
          <p className="text-gray-900">47</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-2">Usuários Ativos</p>
          <p className="text-gray-900">12</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-2">Alterações Críticas</p>
          <p className="text-gray-900">2</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-2">Acessos Externos</p>
          <p className="text-gray-900">0</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por usuário ou ação..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Selecionar ação"
            >
              {actions.map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
          </div>
          <div>
            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-5 h-5" />
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">Data/Hora</th>
                <th className="px-6 py-3 text-left text-gray-600">Usuário</th>
                <th className="px-6 py-3 text-left text-gray-600">Ação</th>
                <th className="px-6 py-3 text-left text-gray-600">Entidade</th>
                <th className="px-6 py-3 text-left text-gray-600">Detalhes</th>
                <th className="px-6 py-3 text-left text-gray-600">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {log.data}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{log.usuario}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getAcaoColor(log.acao)}`}>
                      {log.acao}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{log.entidade}</td>
                  <td className="px-6 py-4 text-gray-600">{log.detalhes}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-900 mb-2">Sobre a Auditoria</p>
        <p className="text-blue-700 text-sm">
          O sistema registra todas as ações realizadas pelos usuários, incluindo criação, edição e exclusão de registros.
          Todos os logs são armazenados de forma permanente para fins de conformidade e rastreabilidade.
        </p>
      </div>
    </div>
  );
}
