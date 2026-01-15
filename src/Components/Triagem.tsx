import { useState } from 'react';
import { Plus, AlertCircle, Eye } from 'lucide-react';

interface TriagemData {
  id: string;
  paciente: string;
  prioridade: string;
  sintomas: string;
  pressao: string;
  temperatura: string;
  frequenciaCardiaca: string;
  saturacaoO2: string;
  horario: string;
  data: string;
  status: string;
  responsavel?: string;
}

export function Triagem({ readOnly = false }: { readOnly?: boolean }) {
  const [triagens, setTriagens] = useState<TriagemData[]>([
    {
      id: '1',
      paciente: 'João Pereira',
      prioridade: 'Alta',
      sintomas: 'Dor no peito, falta de ar',
      pressao: '140/90',
      temperatura: '37.5',
      frequenciaCardiaca: '95',
      saturacaoO2: '92',
      horario: '08:30',
      data: '12/12/2025',
      status: 'Aguardando',
      responsavel: 'Enf. Maria Costa'
    },
    {
      id: '2',
      paciente: 'Ana Silva',
      prioridade: 'Média',
      sintomas: 'Febre, tosse',
      pressao: '120/80',
      temperatura: '38.2',
      frequenciaCardiaca: '82',
      saturacaoO2: '97',
      horario: '09:15',
      data: '12/12/2025',
      status: 'Aguardando',
      responsavel: 'Enf. Pedro Oliveira'
    },
    {
      id: '3',
      paciente: 'Pedro Costa',
      prioridade: 'Baixa',
      sintomas: 'Dor de cabeça leve',
      pressao: '115/75',
      temperatura: '36.8',
      frequenciaCardiaca: '72',
      saturacaoO2: '99',
      horario: '10:00',
      data: '12/12/2025',
      status: 'Em Atendimento',
      responsavel: 'Enf. Maria Costa'
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTriagem, setSelectedTriagem] = useState<TriagemData | null>(null);
  const [formData, setFormData] = useState({
    paciente: '',
    sintomas: '',
    pressao: '',
    temperatura: '',
    frequenciaCardiaca: '',
    saturacaoO2: '',
    prioridade: 'Baixa'
  });

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'Emergência':
        return 'bg-purple-100 text-purple-700';
      case 'Alta':
        return 'bg-red-100 text-red-700';
      case 'Média':
        return 'bg-yellow-100 text-yellow-700';
      case 'Baixa':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = new Date();
    const newTriagem: TriagemData = {
      id: (triagens.length + 1).toString(),
      paciente: formData.paciente,
      prioridade: formData.prioridade,
      sintomas: formData.sintomas,
      pressao: formData.pressao,
      temperatura: formData.temperatura,
      frequenciaCardiaca: formData.frequenciaCardiaca,
      saturacaoO2: formData.saturacaoO2,
      horario: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      data: now.toLocaleDateString('pt-BR'),
      status: 'Aguardando',
      responsavel: 'Enfermeiro(a) Atual'
    };

    setTriagens([newTriagem, ...triagens]);
    setShowModal(false);
    setFormData({
      paciente: '',
      sintomas: '',
      pressao: '',
      temperatura: '',
      frequenciaCardiaca: '',
      saturacaoO2: '',
      prioridade: 'Baixa'
    });
  };

  const handleViewDetails = (triagem: TriagemData) => {
    setSelectedTriagem(triagem);
    setShowDetailsModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3 flex-1">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-blue-900">
              {readOnly 
                ? 'Visualização de triagens realizadas. Consulte o histórico e prioridades dos pacientes.'
                : 'A triagem é essencial para priorizar o atendimento baseado na gravidade dos sintomas.'}
            </p>
          </div>
        </div>
        {!readOnly && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Nova Triagem
          </button>
        )}
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600">Total de Triagens</p>
          <p className="text-gray-900 mt-1">{triagens.length}</p>
        </div>
        <div className="bg-red-50 rounded-lg shadow p-4">
          <p className="text-red-700">Prioridade Alta</p>
          <p className="text-red-900 mt-1">
            {triagens.filter(t => t.prioridade === 'Alta' || t.prioridade === 'Emergência').length}
          </p>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow p-4">
          <p className="text-yellow-700">Prioridade Média</p>
          <p className="text-yellow-900 mt-1">
            {triagens.filter(t => t.prioridade === 'Média').length}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg shadow p-4">
          <p className="text-green-700">Aguardando</p>
          <p className="text-green-900 mt-1">
            {triagens.filter(t => t.status === 'Aguardando').length}
          </p>
        </div>
      </div>

      {/* Triagens Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {triagens.map((triagem) => (
          <div key={triagem.id} className="bg-white rounded-lg shadow p-6 space-y-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-900">{triagem.paciente}</h3>
                <p className="text-gray-500">{triagem.data} - {triagem.horario}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getPrioridadeColor(triagem.prioridade)}`}>
                {triagem.prioridade}
              </span>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-gray-600">Sintomas:</p>
                <p className="text-gray-900">{triagem.sintomas}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Pressão</p>
                  <p className="text-gray-900">{triagem.pressao}</p>
                </div>
                <div>
                  <p className="text-gray-600">Temperatura</p>
                  <p className="text-gray-900">{triagem.temperatura}°C</p>
                </div>
              </div>

              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                  triagem.status === 'Aguardando' 
                    ? 'bg-gray-100 text-gray-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {triagem.status}
                </span>
              </div>
            </div>

            <button 
              onClick={() => handleViewDetails(triagem)}
              className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>

      {/* Modal Nova Triagem */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="mb-6">Nova Triagem</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-700">Paciente *</label>
                <input
                  type="text"
                  placeholder="Nome do paciente"
                  value={formData.paciente}
                  onChange={(e) => setFormData({...formData, paciente: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Sintomas *</label>
                <textarea
                  rows={3}
                  placeholder="Descreva os sintomas"
                  value={formData.sintomas}
                  onChange={(e) => setFormData({...formData, sintomas: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray-700">Pressão Arterial *</label>
                  <input
                    type="text"
                    placeholder="120/80"
                    value={formData.pressao}
                    onChange={(e) => setFormData({...formData, pressao: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Temperatura (°C) *</label>
                  <input
                    type="text"
                    placeholder="36.5"
                    value={formData.temperatura}
                    onChange={(e) => setFormData({...formData, temperatura: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray-700">Frequência Cardíaca *</label>
                  <input
                    type="text"
                    placeholder="70 bpm"
                    value={formData.frequenciaCardiaca}
                    onChange={(e) => setFormData({...formData, frequenciaCardiaca: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Saturação O2 *</label>
                  <input
                    type="text"
                    placeholder="98%"
                    value={formData.saturacaoO2}
                    onChange={(e) => setFormData({...formData, saturacaoO2: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Prioridade *</label>
                <select 
                  value={formData.prioridade}
                  onChange={(e) => setFormData({...formData, prioridade: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  title="Selecionar prioridade"
                  required
                >
                  <option value="Baixa">Baixa</option>
                  <option value="Média">Média</option>
                  <option value="Alta">Alta</option>
                  <option value="Emergência">Emergência</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Salvar Triagem
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Detalhes */}
      {showDetailsModal && selectedTriagem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2>Detalhes da Triagem</h2>
              <span className={`px-3 py-1 rounded-full text-sm ${getPrioridadeColor(selectedTriagem.prioridade)}`}>
                {selectedTriagem.prioridade}
              </span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Paciente</p>
                  <p className="text-gray-900">{selectedTriagem.paciente}</p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    selectedTriagem.status === 'Aguardando' 
                      ? 'bg-gray-100 text-gray-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {selectedTriagem.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Data</p>
                  <p className="text-gray-900">{selectedTriagem.data}</p>
                </div>
                <div>
                  <p className="text-gray-600">Horário</p>
                  <p className="text-gray-900">{selectedTriagem.horario}</p>
                </div>
              </div>

              <div>
                <p className="text-gray-600">Responsável</p>
                <p className="text-gray-900">{selectedTriagem.responsavel}</p>
              </div>

              <div className="border-t pt-4">
                <p className="text-gray-600 mb-2">Sintomas</p>
                <p className="text-gray-900">{selectedTriagem.sintomas}</p>
              </div>

              <div className="border-t pt-4">
                <p className="text-gray-700 mb-3">Sinais Vitais</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-600">Pressão Arterial</p>
                    <p className="text-gray-900">{selectedTriagem.pressao} mmHg</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-600">Temperatura</p>
                    <p className="text-gray-900">{selectedTriagem.temperatura}°C</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-600">Frequência Cardíaca</p>
                    <p className="text-gray-900">{selectedTriagem.frequenciaCardiaca} bpm</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-600">Saturação O2</p>
                    <p className="text-gray-900">{selectedTriagem.saturacaoO2}%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Fechar
              </button>
              {!readOnly && (
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Atender Paciente
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}