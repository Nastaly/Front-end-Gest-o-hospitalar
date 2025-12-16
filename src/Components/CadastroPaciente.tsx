import { useState } from 'react';
import { Plus, Search, Edit, Trash2, FileText, Lock } from 'lucide-react';

export function CadastroPacientes({ userRole = 'admin' }: { userRole?: string }) {
  const [pacientes, setPacientes] = useState([
    {
      id: '1',
      nome: 'Maria Santos',
      cpf: '123.456.789-00',
      dataNascimento: '1985-05-15',
      telefone: '(11) 98765-4321',
      email: 'maria.santos@email.com',
      convenio: 'Unimed',
      status: 'Ativo'
    },
    {
      id: '2',
      nome: 'Carlos Oliveira',
      cpf: '234.567.890-11',
      dataNascimento: '1990-08-22',
      telefone: '(11) 98765-4322',
      email: 'carlos.oliveira@email.com',
      convenio: 'Bradesco Saúde',
      status: 'Ativo'
    },
    {
      id: '3',
      nome: 'Fernanda Lima',
      cpf: '345.678.901-22',
      dataNascimento: '2015-03-10',
      telefone: '(11) 98765-4323',
      email: 'fernanda.lima@email.com',
      convenio: 'Particular',
      status: 'Ativo'
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPacientes = pacientes.filter(p =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.cpf.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Access Info for non-authorized users */}
      {userRole !== 'admin' && userRole !== 'recepcao' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <Lock className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="text-yellow-900">
              Você tem acesso somente leitura aos dados dos pacientes. Para alterações, entre em contato com a recepção ou administrador.
            </p>
          </div>
        </div>
      )}

      {/* Header Actions */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nome ou CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        {(userRole === 'admin' || userRole === 'recepcao') && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Novo Paciente
          </button>
        )}
      </div>

      {/* Pacientes List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">Nome</th>
                <th className="px-6 py-3 text-left text-gray-600">CPF</th>
                <th className="px-6 py-3 text-left text-gray-600">Data Nascimento</th>
                <th className="px-6 py-3 text-left text-gray-600">Telefone</th>
                <th className="px-6 py-3 text-left text-gray-600">Convênio</th>
                <th className="px-6 py-3 text-left text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPacientes.map((paciente) => (
                <tr key={paciente.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-gray-900">{paciente.nome}</div>
                      <div className="text-gray-500 text-sm">{paciente.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{paciente.cpf}</td>
                  <td className="px-6 py-4">
                    {new Date(paciente.dataNascimento).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4">{paciente.telefone}</td>
                  <td className="px-6 py-4">{paciente.convenio}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                      {paciente.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Ver Prontuário">
                        <FileText className="w-4 h-4" />
                      </button>
                      {(userRole === 'admin' || userRole === 'recepcao') && (
                        <>
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Editar">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Excluir">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
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
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="mb-6">Novo Paciente</h2>
            <form className="space-y-6">
              <div>
                <h3 className="mb-4 text-gray-700">Dados Pessoais</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block mb-2 text-gray-700">Nome Completo</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700">CPF</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700">RG</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700">Data de Nascimento</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700">Sexo</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Masculino</option>
                      <option>Feminino</option>
                      <option>Outro</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-gray-700">Contato</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-gray-700">Telefone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-2 text-gray-700">Endereço</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-gray-700">Plano de Saúde</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-gray-700">Convênio</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Particular</option>
                      <option>Unimed</option>
                      <option>Bradesco Saúde</option>
                      <option>SulAmérica</option>
                      <option>Amil</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700">Número da Carteirinha</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
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
                  Cadastrar Paciente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}