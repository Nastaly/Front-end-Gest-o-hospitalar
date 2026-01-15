import { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

export function CadastroFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([
    {
      id: '1',
      nome: 'Dr. João Silva',
      cargo: 'Médico',
      especialidade: 'Cardiologia',
      crm: '12345-SP',
      telefone: '(11) 98765-4321',
      email: 'joao.silva@hospital.com',
      status: 'Ativo'
    },
    {
      id: '2',
      nome: 'Dra. Ana Costa',
      cargo: 'Médica',
      especialidade: 'Ortopedia',
      crm: '23456-SP',
      telefone: '(11) 98765-4322',
      email: 'ana.costa@hospital.com',
      status: 'Ativo'
    },
    {
      id: '3',
      nome: 'Carlos Santos',
      cargo: 'Enfermeiro',
      especialidade: 'Enfermagem Geral',
      coren: '34567-SP',
      telefone: '(11) 98765-4323',
      email: 'carlos.santos@hospital.com',
      status: 'Ativo'
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nome: '',
    cargo: 'Médico',
    especialidade: '',
    registro: '',
    telefone: '',
    email: '',
    cpf: '',
    dataAdmissao: '',
    endereco: ''
  });

  const handleDeleteFuncionario = (id: string) => {
    setFuncionarios(funcionarios.filter(f => f.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFuncionario = {
      id: Date.now().toString(),
      nome: formData.nome,
      cargo: formData.cargo,
      especialidade: formData.especialidade,
      crm: formData.registro,
      telefone: formData.telefone,
      email: formData.email,
      status: 'Ativo'
    };
    setFuncionarios([...funcionarios, newFuncionario]);
    setFormData({
      nome: '',
      cargo: 'Médico',
      especialidade: '',
      registro: '',
      telefone: '',
      email: '',
      cpf: '',
      dataAdmissao: '',
      endereco: ''
    });
    setShowModal(false);
  };

  const filteredFuncionarios = funcionarios.filter(f =>
    f.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.cargo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar funcionário..."
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
          Novo Funcionário
        </button>
      </div>

      {/* Funcionarios List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">Nome</th>
                <th className="px-6 py-3 text-left text-gray-600">Cargo</th>
                <th className="px-6 py-3 text-left text-gray-600">Especialidade</th>
                <th className="px-6 py-3 text-left text-gray-600">Registro</th>
                <th className="px-6 py-3 text-left text-gray-600">Telefone</th>
                <th className="px-6 py-3 text-left text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFuncionarios.map((funcionario) => (
                <tr key={funcionario.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-gray-900">{funcionario.nome}</div>
                      <div className="text-gray-500 text-sm">{funcionario.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{funcionario.cargo}</td>
                  <td className="px-6 py-4">{funcionario.especialidade}</td>
                  <td className="px-6 py-4">
                    {funcionario.crm || funcionario.coren}
                  </td>
                  <td className="px-6 py-4">{funcionario.telefone}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                      {funcionario.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" aria-label="Editar funcionário">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteFuncionario(funcionario.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" aria-label="Excluir funcionário">
                        <Trash2 className="w-4 h-4" />
                      </button>
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
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="mb-6">Novo Funcionário</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray-700">Nome Completo</label>
                  <input
                    type="text"
                    placeholder="Digite o nome completo"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Cargo</label>
                  <select value={formData.cargo} onChange={(e) => setFormData({...formData, cargo: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" aria-label="Selecionar cargo">
                    <option>Médico</option>
                    <option>Enfermeiro</option>
                    <option>Técnico de Enfermagem</option>
                    <option>Administrativo</option>
                    <option>Recepcionista</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Especialidade</label>
                  <input
                    type="text"
                    placeholder="Digite a especialidade"
                    value={formData.especialidade}
                    onChange={(e) => setFormData({...formData, especialidade: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">CRM/COREN</label>
                  <input
                    type="text"
                    placeholder="Número do registro"
                    value={formData.registro}
                    onChange={(e) => setFormData({...formData, registro: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Telefone</label>
                  <input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="exemplo@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">CPF</label>
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Data de Admissão</label>
                  <input
                    type="date"
                    placeholder="DD/MM/AAAA"
                    value={formData.dataAdmissao}
                    onChange={(e) => setFormData({...formData, dataAdmissao: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Endereço</label>
                <input
                  type="text"
                  placeholder="Rua, número, bairro, cidade"
                  value={formData.endereco}
                  onChange={(e) => setFormData({...formData, endereco: e.target.value})}
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
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
