import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

export function CadastroEspecialidades() {
  const [especialidades] = useState([
    { id: '1', nome: 'Cardiologia', descricao: 'Tratamento de doenças do coração', medicos: 5 },
    { id: '2', nome: 'Ortopedia', descricao: 'Tratamento de ossos e articulações', medicos: 3 },
    { id: '3', nome: 'Pediatria', descricao: 'Atendimento infantil', medicos: 4 },
    { id: '4', nome: 'Dermatologia', descricao: 'Tratamento de doenças de pele', medicos: 2 },
    { id: '5', nome: 'Neurologia', descricao: 'Tratamento do sistema nervoso', medicos: 3 },
  ]);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Gerencie as especialidades médicas disponíveis no hospital
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nova Especialidade
        </button>
      </div>

      {/* Especialidades Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {especialidades.map((especialidade) => (
          <div key={especialidade.id} className="bg-white rounded-lg shadow p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-900">{especialidade.nome}</h3>
                <p className="text-gray-500 mt-2">{especialidade.descricao}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                <span className="text-gray-900">{especialidade.medicos}</span> médicos
              </p>
            </div>

            <div className="flex gap-2">
              <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                <Edit className="w-4 h-4" />
                Editar
              </button>
              <button type="button" aria-label="Deletar especialidade" className="p-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-xl w-full p-6">
            <h2 className="mb-6">Nova Especialidade</h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-700">Nome da Especialidade</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Endocrinologia"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">Descrição</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Descreva a especialidade..."
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
