import { useState } from 'react';
import { UserPlus, Save, X, CheckCircle, AlertCircle, Users } from 'lucide-react';

interface Paciente {
  id: string;
  nome: string;
  bi: string;
  dataNascimento: string;
  sexo: string;
  telefone: string;
  telefoneAlternativo?: string;
  email: string;
  provincia: string;
  municipio: string;
  bairro: string;
  morada: string;
  seguro: string;
  numeroCarteirinha?: string;
  grupoSanguineo: string;
  estadoCivil: string;
  profissao: string;
  nomeEmergencia: string;
  telefoneEmergencia: string;
  relacaoEmergencia: string;
  status: string;
  dataCadastro: string;
}

export function CadastroPacientes({ userRole = 'admin' }: { userRole?: string }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Estado do formulário
  const [formData, setFormData] = useState({
    nome: '',
    bi: '',
    dataNascimento: '',
    sexo: '',
    telefone: '',
    telefoneAlternativo: '',
    email: '',
    provincia: '',
    municipio: '',
    bairro: '',
    morada: '',
    seguro: 'Particular',
    numeroCarteirinha: '',
    grupoSanguineo: '',
    estadoCivil: '',
    profissao: '',
    nomeEmergencia: '',
    telefoneEmergencia: '',
    relacaoEmergencia: ''
  });

  // Lista de pacientes cadastrados
  const [pacientes, setPacientes] = useState<Paciente[]>([
    {
      id: '1',
      nome: 'Maria Santos Costa',
      bi: '005438291LA045',
      dataNascimento: '1985-05-15',
      sexo: 'Feminino',
      telefone: '+244 923 456 789',
      telefoneAlternativo: '+244 912 345 678',
      email: 'maria.santos@email.com',
      provincia: 'Luanda',
      municipio: 'Luanda',
      bairro: 'Talatona',
      morada: 'Rua 21 de Janeiro, Condomínio Palmeiras, Bloco B, Apt 12',
      seguro: 'ENSA',
      numeroCarteirinha: 'ENSA123456',
      grupoSanguineo: 'A+',
      estadoCivil: 'Casado(a)',
      profissao: 'Professora',
      nomeEmergencia: 'João Costa',
      telefoneEmergencia: '+244 923 111 222',
      relacaoEmergencia: 'Esposo',
      status: 'Ativo',
      dataCadastro: '2024-01-15'
    },
    {
      id: '2',
      nome: 'Carlos Manuel Oliveira',
      bi: '004523678LA038',
      dataNascimento: '1990-08-22',
      sexo: 'Masculino',
      telefone: '+244 924 567 890',
      email: 'carlos.oliveira@email.com',
      provincia: 'Luanda',
      municipio: 'Viana',
      bairro: 'Zango',
      morada: 'Rua das Acácias, Casa 45',
      seguro: 'AAA Seguros',
      numeroCarteirinha: 'AAA789012',
      grupoSanguineo: 'O+',
      estadoCivil: 'Solteiro(a)',
      profissao: 'Engenheiro',
      nomeEmergencia: 'Ana Oliveira',
      telefoneEmergencia: '+244 924 333 444',
      relacaoEmergencia: 'Mãe',
      status: 'Ativo',
      dataCadastro: '2024-02-10'
    }
  ]);

  // Províncias de Angola
  const provincias = [
    'Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando Cubango', 'Cuanza Norte',
    'Cuanza Sul', 'Cunene', 'Huambo', 'Huíla', 'Luanda', 'Lunda Norte',
    'Lunda Sul', 'Malanje', 'Moxico', 'Namibe', 'Uíge', 'Zaire'
  ];

  // Municípios por província (exemplo para Luanda)
  const municipiosPorProvincia: Record<string, string[]> = {
    'Luanda': ['Luanda', 'Belas', 'Cacuaco', 'Cazenga', 'Icolo e Bengo', 'Quiçama', 'Viana'],
    'Benguela': ['Benguela', 'Baía Farta', 'Balombo', 'Bocoio', 'Caimbambo', 'Catumbela', 'Chongorói', 'Cubal', 'Ganda', 'Lobito'],
    'Huambo': ['Huambo', 'Bailundo', 'Cachiungo', 'Caála', 'Ecunha', 'Londuimbali', 'Longonjo', 'Mungo', 'Tchicala-Tcholoanga', 'Tchindjenje', 'Ukuma']
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.bi.trim()) newErrors.bi = 'BI é obrigatório';
    if (!formData.dataNascimento) newErrors.dataNascimento = 'Data de nascimento é obrigatória';
    if (!formData.sexo) newErrors.sexo = 'Sexo é obrigatório';
    if (!formData.telefone.trim()) newErrors.telefone = 'Telefone é obrigatório';
    if (!formData.provincia) newErrors.provincia = 'Província é obrigatória';
    if (!formData.municipio) newErrors.municipio = 'Município é obrigatório';
    if (!formData.bairro.trim()) newErrors.bairro = 'Bairro é obrigatório';
    if (!formData.morada.trim()) newErrors.morada = 'Morada é obrigatória';
    if (!formData.grupoSanguineo) newErrors.grupoSanguineo = 'Grupo sanguíneo é obrigatório';
    if (!formData.nomeEmergencia.trim()) newErrors.nomeEmergencia = 'Contacto de emergência é obrigatório';
    if (!formData.telefoneEmergencia.trim()) newErrors.telefoneEmergencia = 'Telefone de emergência é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Criar novo paciente
    const novoPaciente: Paciente = {
      id: String(pacientes.length + 1),
      ...formData,
      status: 'Ativo',
      dataCadastro: new Date().toISOString().split('T')[0]
    };

    // Adicionar à lista
    setPacientes(prev => [...prev, novoPaciente]);

    // Mostrar mensagem de sucesso
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Limpar formulário
    setFormData({
      nome: '',
      bi: '',
      dataNascimento: '',
      sexo: '',
      telefone: '',
      telefoneAlternativo: '',
      email: '',
      provincia: '',
      municipio: '',
      bairro: '',
      morada: '',
      seguro: 'Particular',
      numeroCarteirinha: '',
      grupoSanguineo: '',
      estadoCivil: '',
      profissao: '',
      nomeEmergencia: '',
      telefoneEmergencia: '',
      relacaoEmergencia: ''
    });

    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const limparFormulario = () => {
    setFormData({
      nome: '',
      bi: '',
      dataNascimento: '',
      sexo: '',
      telefone: '',
      telefoneAlternativo: '',
      email: '',
      provincia: '',
      municipio: '',
      bairro: '',
      morada: '',
      seguro: 'Particular',
      numeroCarteirinha: '',
      grupoSanguineo: '',
      estadoCivil: '',
      profissao: '',
      nomeEmergencia: '',
      telefoneEmergencia: '',
      relacaoEmergencia: ''
    });
    setErrors({});
  };

  return (
    <div className="space-y-6">
      {/* Mensagem de Sucesso */}
      {showSuccess && (
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3 animate-slideDown">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
            <p className="text-green-900">Paciente cadastrado com sucesso!</p>
            <p className="text-green-700 text-sm">
              O paciente foi adicionado à lista abaixo.
            </p>
          </div>
        </div>
      )}

      {/* Formulário de Cadastro */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-gray-900 flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-blue-600" />
            Formulário de Cadastro de Paciente
          </h2>
          <p className="text-gray-600 mt-1">Preencha todos os campos obrigatórios abaixo</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Dados Pessoais */}
          <div>
            <h3 className="mb-4 text-gray-800 pb-2 border-b border-gray-200">
              1. Dados Pessoais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block mb-2 text-gray-700">
                  Nome Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.nome ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: João Manuel da Silva"
                />
                {errors.nome && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.nome}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  BI (Bilhete de Identidade) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="bi"
                  value={formData.bi}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.bi ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: 005438291LA045"
                />
                {errors.bi && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.bi}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  Data de Nascimento <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.dataNascimento ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.dataNascimento && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.dataNascimento}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  Sexo <span className="text-red-500">*</span>
                </label>
                <select
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.sexo ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
                {errors.sexo && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.sexo}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  Grupo Sanguíneo <span className="text-red-500">*</span>
                </label>
                <select
                  name="grupoSanguineo"
                  value={formData.grupoSanguineo}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.grupoSanguineo ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                {errors.grupoSanguineo && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.grupoSanguineo}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Estado Civil</label>
                <select
                  name="estadoCivil"
                  value={formData.estadoCivil}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione</option>
                  <option value="Solteiro(a)">Solteiro(a)</option>
                  <option value="Casado(a)">Casado(a)</option>
                  <option value="Divorciado(a)">Divorciado(a)</option>
                  <option value="Viúvo(a)">Viúvo(a)</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Profissão</label>
                <input
                  type="text"
                  name="profissao"
                  value={formData.profissao}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Professor, Engenheiro, Comerciante"
                />
              </div>
            </div>
          </div>

          {/* Contactos */}
          <div>
            <h3 className="mb-4 text-gray-800 pb-2 border-b border-gray-200">
              2. Contactos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-gray-700">
                  Telefone Principal <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.telefone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+244 923 456 789"
                />
                {errors.telefone && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.telefone}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Telefone Alternativo</label>
                <input
                  type="tel"
                  name="telefoneAlternativo"
                  value={formData.telefoneAlternativo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+244 912 345 678"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="exemplo@email.com"
                />
              </div>
            </div>
          </div>

          {/* Morada */}
          <div>
            <h3 className="mb-4 text-gray-800 pb-2 border-b border-gray-200">
              3. Morada
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-gray-700">
                  Província <span className="text-red-500">*</span>
                </label>
                <select
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.provincia ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione a província</option>
                  {provincias.map(prov => (
                    <option key={prov} value={prov}>{prov}</option>
                  ))}
                </select>
                {errors.provincia && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.provincia}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  Município <span className="text-red-500">*</span>
                </label>
                <select
                  name="municipio"
                  value={formData.municipio}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.municipio ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={!formData.provincia}
                >
                  <option value="">Selecione o município</option>
                  {formData.provincia && municipiosPorProvincia[formData.provincia]?.map(mun => (
                    <option key={mun} value={mun}>{mun}</option>
                  ))}
                </select>
                {errors.municipio && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.municipio}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  Bairro <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.bairro ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: Talatona, Maianga, Miramar"
                />
                {errors.bairro && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.bairro}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-gray-700">
                  Morada Completa <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="morada"
                  value={formData.morada}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.morada ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Rua, número da casa/apartamento, condomínio, etc."
                />
                {errors.morada && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.morada}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Seguro de Saúde */}
          <div>
            <h3 className="mb-4 text-gray-800 pb-2 border-b border-gray-200">
              4. Seguro de Saúde
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-gray-700">Tipo de Seguro</label>
                <select
                  name="seguro"
                  value={formData.seguro}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Particular">Particular</option>
                  <option value="ENSA">ENSA</option>
                  <option value="AAA Seguros">AAA Seguros</option>
                  <option value="SulAmérica">SulAmérica</option>
                  <option value="Global Seguros">Global Seguros</option>
                  <option value="Garantia">Garantia</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Número da Carteirinha</label>
                <input
                  type="text"
                  name="numeroCarteirinha"
                  value={formData.numeroCarteirinha}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: ENSA123456"
                  disabled={formData.seguro === 'Particular'}
                />
              </div>
            </div>
          </div>

          {/* Contacto de Emergência */}
          <div>
            <h3 className="mb-4 text-gray-800 pb-2 border-b border-gray-200">
              5. Contacto de Emergência
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-gray-700">
                  Nome Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nomeEmergencia"
                  value={formData.nomeEmergencia}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.nomeEmergencia ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nome do contacto de emergência"
                />
                {errors.nomeEmergencia && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.nomeEmergencia}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  Telefone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="telefoneEmergencia"
                  value={formData.telefoneEmergencia}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.telefoneEmergencia ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+244 923 456 789"
                />
                {errors.telefoneEmergencia && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.telefoneEmergencia}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Relação</label>
                <select
                  name="relacaoEmergencia"
                  value={formData.relacaoEmergencia}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione</option>
                  <option value="Pai/Mãe">Pai/Mãe</option>
                  <option value="Esposo(a)">Esposo(a)</option>
                  <option value="Filho(a)">Filho(a)</option>
                  <option value="Irmão(ã)">Irmão(ã)</option>
                  <option value="Tio(a)">Tio(a)</option>
                  <option value="Amigo(a)">Amigo(a)</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={limparFormulario}
              className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X className="w-5 h-5" />
              Limpar Formulário
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <Save className="w-5 h-5" />
              Cadastrar Paciente
            </button>
          </div>
        </form>
      </div>

      {/* Lista de Pacientes Cadastrados */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-gray-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            Pacientes Cadastrados
          </h2>
          <p className="text-gray-600 mt-1">Total de {pacientes.length} paciente(s) no sistema</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">Nome Completo</th>
                <th className="px-6 py-3 text-left text-gray-600">BI</th>
                <th className="px-6 py-3 text-left text-gray-600">Telefone</th>
                <th className="px-6 py-3 text-left text-gray-600">Província</th>
                <th className="px-6 py-3 text-left text-gray-600">Município</th>
                <th className="px-6 py-3 text-left text-gray-600">Seguro</th>
                <th className="px-6 py-3 text-left text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pacientes.map((paciente) => (
                <tr key={paciente.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-gray-900">{paciente.nome}</div>
                      <div className="text-gray-500 text-sm">{paciente.email || 'Sem email'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{paciente.bi}</td>
                  <td className="px-6 py-4 text-gray-700">{paciente.telefone}</td>
                  <td className="px-6 py-4 text-gray-700">{paciente.provincia}</td>
                  <td className="px-6 py-4 text-gray-700">{paciente.municipio}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      paciente.seguro === 'Particular' 
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {paciente.seguro}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                      {paciente.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
