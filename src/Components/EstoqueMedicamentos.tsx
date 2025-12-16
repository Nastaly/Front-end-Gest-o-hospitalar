import { useState } from 'react';
import { Plus, Search, AlertTriangle, Package } from 'lucide-react';

export function EstoqueMedicamentos() {
  const [medicamentos, setMedicamentos] = useState([
    {
      id: '1',
      nome: 'Dipirona 500mg',
      principioAtivo: 'Dipirona Sódica',
      quantidade: 150,
      unidade: 'comprimidos',
      estoqueMinimo: 100,
      lote: 'L123456',
      validade: '2026-06-30',
      fabricante: 'EMS',
      localizacao: 'Prateleira A1'
    },
    {
      id: '2',
      nome: 'Amoxicilina 500mg',
      principioAtivo: 'Amoxicilina',
      quantidade: 45,
      unidade: 'cápsulas',
      estoqueMinimo: 50,
      lote: 'L234567',
      validade: '2026-03-15',
      fabricante: 'Medley',
      localizacao: 'Prateleira B2'
    },
    {
      id: '3',
      nome: 'Paracetamol 750mg',
      principioAtivo: 'Paracetamol',
      quantidade: 200,
      unidade: 'comprimidos',
      estoqueMinimo: 80,
      lote: 'L345678',
      validade: '2026-12-20',
      fabricante: 'Neo Química',
      localizacao: 'Prateleira A2'
    },
    {
      id: '4',
      nome: 'Losartana 50mg',
      principioAtivo: 'Losartana Potássica',
      quantidade: 30,
      unidade: 'comprimidos',
      estoqueMinimo: 60,
      lote: 'L456789',
      validade: '2025-12-31',
      fabricante: 'Eurofarma',
      localizacao: 'Prateleira C1'
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMedicamentos = medicamentos.filter(m =>
    m.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.principioAtivo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMedicamentoStatus = (med: any) => {
    if (med.quantidade < med.estoqueMinimo) {
      return { status: 'Estoque Baixo', color: 'text-red-600 bg-red-50' };
    }
    const dataValidade = new Date(med.validade);
    const hoje = new Date();
    const diasParaVencer = Math.ceil((dataValidade.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diasParaVencer < 90) {
      return { status: 'Próximo do Vencimento', color: 'text-orange-600 bg-orange-50' };
    }
    return { status: 'Normal', color: 'text-green-600 bg-green-50' };
  };

  return (
    <div className="space-y-6">
      {/* Alert Bar */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
        <div>
          <p className="text-red-900">
            2 medicamentos com estoque abaixo do mínimo recomendado
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-6 h-6 text-blue-600" />
            <p className="text-gray-600">Total de Itens</p>
          </div>
          <p className="text-gray-900">425</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-2">Estoque Baixo</p>
          <p className="text-gray-900">2</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-2">Próximos ao Vencimento</p>
          <p className="text-gray-900">1</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-2">Valor Total do Estoque</p>
          <p className="text-gray-900">R$ 45.230,00</p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar medicamento..."
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
          Adicionar Medicamento
        </button>
      </div>

      {/* Medicamentos Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">Medicamento</th>
                <th className="px-6 py-3 text-left text-gray-600">Quantidade</th>
                <th className="px-6 py-3 text-left text-gray-600">Estoque Mín.</th>
                <th className="px-6 py-3 text-left text-gray-600">Lote</th>
                <th className="px-6 py-3 text-left text-gray-600">Validade</th>
                <th className="px-6 py-3 text-left text-gray-600">Localização</th>
                <th className="px-6 py-3 text-left text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMedicamentos.map((medicamento) => {
                const statusInfo = getMedicamentoStatus(medicamento);
                return (
                  <tr key={medicamento.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-gray-900">{medicamento.nome}</div>
                        <div className="text-gray-500 text-sm">{medicamento.principioAtivo}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={medicamento.quantidade < medicamento.estoqueMinimo ? 'text-red-600' : 'text-gray-900'}>
                        {medicamento.quantidade} {medicamento.unidade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {medicamento.estoqueMinimo}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{medicamento.lote}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(medicamento.validade).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{medicamento.localizacao}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${statusInfo.color}`}>
                        {statusInfo.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800">
                        Editar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="mb-6">Adicionar Medicamento</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block mb-2 text-gray-700">Nome do Medicamento</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block mb-2 text-gray-700">Princípio Ativo</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Quantidade</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Unidade</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>comprimidos</option>
                    <option>cápsulas</option>
                    <option>ml</option>
                    <option>frascos</option>
                    <option>ampolas</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Estoque Mínimo</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Lote</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Data de Validade</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Fabricante</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700">Localização</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Prateleira A1"
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
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
