import { useState } from 'react';
import { Search, Plus, FileText, Calendar, User } from 'lucide-react';

interface Prontuario {
  id: string;
  paciente: string;
    pacienteId: string;
    medico: string;
    medicoId: string;
    data: string;
    diagnostico: string;
    prescricao: string;
    observacoes: string;
    proximaConsulta: string;
}   
export function ProntuariosMedicos() {
  const [prontuarios, setProntuarios] = useState([
    {
      id: '1',
      paciente: 'Maria Santos',
      pacienteId: '1',
      medico: 'Dr. João Silva',
      medicoId: '1',
      data: '2025-12-05',
      diagnostico: 'Hipertensão arterial controlada',
      prescricao: 'Losartana 50mg - 1x ao dia',
      observacoes: 'Paciente respondendo bem ao tratamento',
      proximaConsulta: '2026-01-05'
    },
    {
      id: '2',
      paciente: 'Carlos Oliveira',
      pacienteId: '2',
      medico: 'Dra. Ana Costa',
      medicoId: '2',
      data: '2025-12-04',
      diagnostico: 'Fratura no tornozelo direito',
      prescricao: 'Imobilização com bota ortopédica, Ibuprofeno 600mg',
      observacoes: 'Retorno em 15 dias para reavaliação',
      proximaConsulta: '2025-12-19'
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProntuario, setSelectedProntuario] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProntuarios = prontuarios.filter(p =>
    p.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.medico.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (prontuario: any) => {
    setSelectedProntuario(prontuario);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por paciente ou médico..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Novo Prontuário
        </button>
      </div>

      {/* Prontuarios List */}
      <div className="space-y-4">
        {filteredProntuarios.map((prontuario) => (
          <div key={prontuario.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="text-gray-900">{prontuario.paciente}</h3>
                  <p className="text-gray-600">Prontuário #{prontuario.id.padStart(6, '0')}</p>
                </div>
              </div>
              <span className="text-gray-500">
                {new Date(prontuario.data).toLocaleDateString('pt-BR')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-600">Médico Responsável</p>
                <div className="flex items-center gap-2 mt-1">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">{prontuario.medico}</span>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Próxima Consulta</p>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">
                    {new Date(prontuario.proximaConsulta).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-600 mb-1">Diagnóstico</p>
              <p className="text-gray-900">{prontuario.diagnostico}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleViewDetails(prontuario)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ver Detalhes
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Prontuario Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="mb-6">Novo Prontuário Médico</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray-700">Paciente</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Maria Santos</option>
                    <option>Carlos Oliveira</option>
                    <option>Fernanda Lima</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Médico</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Dr. João Silva</option>
                    <option>Dra. Ana Costa</option>
                    <option>Dr. Pedro Santos</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Anamnese / Queixa Principal</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Descreva os sintomas e histórico..."
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Exame Físico</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Resultados do exame físico..."
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Diagnóstico</label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Diagnóstico médico..."
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Prescrição Médica</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Medicamentos e dosagens..."
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Observações</label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Observações adicionais..."
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Data da Próxima Consulta</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
                  Salvar Prontuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedProntuario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2>Prontuário Médico</h2>
                <p className="text-gray-600">#{selectedProntuario.id.padStart(6, '0')}</p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 mb-1">Paciente</p>
                  <p className="text-gray-900">{selectedProntuario.paciente}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Médico</p>
                  <p className="text-gray-900">{selectedProntuario.medico}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Data do Atendimento</p>
                  <p className="text-gray-900">
                    {new Date(selectedProntuario.data).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Próxima Consulta</p>
                  <p className="text-gray-900">
                    {new Date(selectedProntuario.proximaConsulta).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-600 mb-2">Diagnóstico</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900">{selectedProntuario.diagnostico}</p>
                </div>
              </div>

              <div>
                <p className="text-gray-600 mb-2">Prescrição Médica</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900">{selectedProntuario.prescricao}</p>
                </div>
              </div>

              <div>
                <p className="text-gray-600 mb-2">Observações</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900">{selectedProntuario.observacoes}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Fechar
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Imprimir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
