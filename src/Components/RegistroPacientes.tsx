import { useState } from 'react';
import { Calendar, Clock, User, FileText } from 'lucide-react';

export function RegistroPacientes() {
  const [registros, setRegistros] = useState([
    {
      id: '1',
      paciente: 'Maria Santos',
      tipo: 'Entrada',
      data: '2025-12-05',
      hora: '08:30',
      motivo: 'Consulta Cardiologia',
      status: 'Em Atendimento',
      responsavel: 'Dra. Ana Costa'
    },
    {
      id: '2',
      paciente: 'Carlos Oliveira',
      tipo: 'Internação',
      data: '2025-12-04',
      hora: '14:20',
      motivo: 'Cirurgia programada',
      status: 'Internado',
      responsavel: 'Dr. João Silva',
      leito: '201-A'
    },
    {
      id: '3',
      paciente: 'Fernanda Lima',
      tipo: 'Alta',
      data: '2025-12-05',
      hora: '10:15',
      motivo: 'Recuperação completa',
      status: 'Finalizado',
      responsavel: 'Dr. Pedro Santos'
    },
    {
      id: '4',
      paciente: 'João Pereira',
      tipo: 'Emergência',
      data: '2025-12-05',
      hora: '11:45',
      motivo: 'Dor no peito aguda',
      status: 'Em Atendimento',
      responsavel: 'Dr. João Silva'
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Atendimento':
        return 'bg-yellow-100 text-yellow-700';
      case 'Internado':
        return 'bg-blue-100 text-blue-700';
      case 'Finalizado':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Entrada':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Internação':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Alta':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Emergência':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-2">Total de Registros Hoje</p>
          <p className="text-gray-900">12</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-2">Em Atendimento</p>
          <p className="text-gray-900">5</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-2">Internados</p>
          <p className="text-gray-900">8</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-2">Altas Hoje</p>
          <p className="text-gray-900">3</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block mb-2 text-gray-700">Data</label>
            <input
              type="date"
              placeholder="DD/MM/AAAA"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Tipo</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" title="Selecionar tipo">
              <option>Todos</option>
              <option>Entrada</option>
              <option>Internação</option>
              <option>Alta</option>
              <option>Emergência</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Status</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" title="Selecionar status">
              <option>Todos</option>
              <option>Em Atendimento</option>
              <option>Internado</option>
              <option>Finalizado</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Filtrar
            </button>
          </div>
        </div>
      </div>

      {/* Registros List */}
      <div className="space-y-4">
        {registros.map((registro) => (
          <div key={registro.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-wrap gap-4 justify-between items-start">
              <div className="flex-1 min-w-[250px]">
                <div className="flex items-start gap-3 mb-3">
                  <User className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <h3 className="text-gray-900">{registro.paciente}</h3>
                    <p className="text-gray-600">{registro.motivo}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {new Date(registro.data).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    {registro.hora}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText className="w-4 h-4" />
                    {registro.responsavel}
                  </div>
                </div>
                {registro.leito && (
                  <p className="text-gray-600 mt-2">Leito: {registro.leito}</p>
                )}
              </div>
              <div className="flex gap-2 items-start">
                <span className={`px-3 py-1 rounded-lg text-sm border ${getTipoColor(registro.tipo)}`}>
                  {registro.tipo}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(registro.status)}`}>
                  {registro.status}
                </span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="text-blue-600 hover:text-blue-800">
                Ver Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
