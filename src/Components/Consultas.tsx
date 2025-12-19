import { useState } from 'react';
import { Plus, Search, Calendar, Clock, User } from 'lucide-react';

export function Consultas() {
  const [consultas, setConsultas] = useState([
    {
      id: '1',
      paciente: 'Maria Santos',
      medico: 'Dr. João Silva',
      especialidade: 'Cardiologia',
      data: '2025-12-06',
      horario: '09:00',
      status: 'Agendada'
    },
    {
      id: '2',
      paciente: 'Carlos Oliveira',
      medico: 'Dra. Ana Costa',
      especialidade: 'Ortopedia',
      data: '2025-12-06',
      horario: '10:30',
      status: 'Agendada'
    },
    {
      id: '3',
      paciente: 'Fernanda Lima',
      medico: 'Dr. Pedro Santos',
      especialidade: 'Pediatria',
      data: '2025-12-05',
      horario: '14:00',
      status: 'Realizada'
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddConsulta = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const novaConsulta = {
      id: String(consultas.length + 1),
      paciente: formData.get('paciente') as string,
      medico: formData.get('medico') as string,
      especialidade: formData.get('especialidade') as string,
      data: formData.get('data') as string,
      horario: formData.get('horario') as string,
      status: 'Agendada'
    };
    setConsultas([...consultas, novaConsulta]);
    setShowModal(false);
    (e.target as HTMLFormElement).reset();
  };

  const filteredConsultas = consultas.filter(c => 
    c.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.medico.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          Nova Consulta
        </button>
      </div>

      {/* Consultas List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">Paciente</th>
                <th className="px-6 py-3 text-left text-gray-600">Médico</th>
                <th className="px-6 py-3 text-left text-gray-600">Especialidade</th>
                <th className="px-6 py-3 text-left text-gray-600">Data</th>
                <th className="px-6 py-3 text-left text-gray-600">Horário</th>
                <th className="px-6 py-3 text-left text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredConsultas.map((consulta) => (
                <tr key={consulta.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-gray-400" />
                      {consulta.paciente}
                    </div>
                  </td>
                  <td className="px-6 py-4">{consulta.medico}</td>
                  <td className="px-6 py-4">{consulta.especialidade}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {new Date(consulta.data).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {consulta.horario}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        consulta.status === 'Agendada'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {consulta.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="mb-6">Nova Consulta</h2>
            <form onSubmit={handleAddConsulta} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray-700">Paciente</label>
                  <input
                    type="text"
                    name="paciente"
                    placeholder="Nome do paciente"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Médico</label>
                  <input
                    type="text"
                    name="medico"
                    placeholder="Nome do médico"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Especialidade</label>
                  <select name="especialidade" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" title="Selecionar especialidade">
                    <option value="">Selecione uma especialidade</option>
                    <option>Cardiologia</option>
                    <option>Ortopedia</option>
                    <option>Pediatria</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Data</label>
                  <input
                    type="date"
                    name="data"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Horário</label>
                  <input
                    type="time"
                    name="horario"
                    required
                    title="Selecionar horário"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
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
                  Agendar Consulta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
