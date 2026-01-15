import { useState } from "react";
import {
  Activity,
  Calendar,
  ClipboardList,
  Users,
  FileText,
  UserPlus,
  Shield,
  Package,
  LogOut,
  Menu,
  X,
  Lock,
} from "lucide-react";
import { Consultas } from "./Consultas";
import { Triagem } from "./Triagem";
import { CadastroFuncionarios } from "./CadastroFuncionarios";
import { CadastroEspecialidades } from "./CadastroEspecialidades";
import { CadastroPacientes } from "./CadastroPacientes";
//import { RegistroPacientes } from './RegistroPacientes';
import { Auditoria } from "./Auditoria";
import { ProntuariosMedicos } from "./ProntuariosMedicos";
import { EstoqueMedicamentos } from "./EstoqueMedicamentos";

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("consultas");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Define menu items with access control
  const allMenuItems = [
    {
      id: "consultas",
      label: "Consultas",
      icon: Calendar,
      roles: ["admin", "medico", "recepcao"],
    },
    {
      id: "triagem",
      label: "Triagem",
      icon: ClipboardList,
      roles: ["admin", "enfermeiro"],
    },
    {
      id: "triagem-view",
      label: "Visualizar Triagem",
      icon: ClipboardList,
      roles: ["medico"],
    },
    {
      id: "cadastro-pacientes",
      label: "Cadastro de Pacientes",
      icon: UserPlus,
      roles: ["admin", "recepcao"],
    },
    {
      id: "pacientes-view",
      label: "Visualizar Pacientes",
      icon: UserPlus,
      roles: ["admin", "recepcao"],
    },
    {
      id: "registro-pacientes",
      label: "Registro de Pacientes",
      icon: FileText,
      roles: ["admin", "enfermeiro", "recepcao"],
    },
    {
      id: "prontuarios",
      label: "Prontuários Médicos",
      icon: FileText,
      roles: ["admin", "medico"],
    },
    {
      id: "estoque",
      label: "Estoque de Medicamentos",
      icon: Package,
      roles: ["admin", "enfermeiro"],
    },
    {
      id: "cadastro-funcionarios",
      label: "Cadastro de Funcionários",
      icon: Users,
      roles: ["admin"],
      adminOnly: true,
    },
    {
      id: "cadastro-especialidades",
      label: "Especialidades",
      icon: FileText,
      roles: ["admin"],
      adminOnly: true,
    },
    {
      id: "auditoria",
      label: "Auditoria",
      icon: Shield,
      roles: ["admin"],
      adminOnly: true,
    },
  ];

  // Filter menu items based on user role
  const menuItems = allMenuItems.filter((item) =>
    item.roles.includes(user.role)
  );

  // Get role badge
  const getRoleBadge = () => {
    const badges = {
      admin: { label: "Administrador", color: "bg-purple-100 text-purple-700" },
      medico: { label: "Médico", color: "bg-blue-100 text-blue-700" },
      enfermeiro: { label: "Enfermeiro", color: "bg-green-100 text-green-700" },
      recepcao: { label: "Recepção", color: "bg-orange-100 text-orange-700" },
    };
    return badges[user.role as keyof typeof badges] || badges.medico;
  };

  const roleBadge = getRoleBadge();

  const renderContent = () => {
    // Check if user has access to the current tab
    const currentItem = allMenuItems.find((item) => item.id === activeTab);
    if (!currentItem || !currentItem.roles.includes(user.role)) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <Lock className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-gray-700 mb-2">Acesso Restrito</h2>
          <p className="text-gray-600">
            Você não tem permissão para acessar esta página.
          </p>
          <p className="text-gray-500 mt-2">
            Entre em contato com o administrador do sistema.
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case "consultas":
        return <Consultas />;
      case "triagem":
        return <Triagem />;
      case "triagem-view":
        return <Triagem readOnly={true} />;
      case "cadastro-funcionarios":
        return <CadastroFuncionarios />;
      case "cadastro-especialidades":
        return <CadastroEspecialidades />;
      case "pacientes-view":
        return <CadastroPacientes userRole={user.role} />;
      case "cadastro-pacientes":
        return <CadastroPacientes userRole={user.role} />;
      // case 'registro-pacientes':
      //   return <RegistroPacientes />;
      case "prontuarios":
        return <ProntuariosMedicos />;
      case "estoque":
        return <EstoqueMedicamentos />;
      case "auditoria":
        return <Auditoria />;
      default:
        return <Consultas />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } bg-blue-900 text-white transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center gap-3 mb-3">
            <Activity className="w-8 h-8" />
            <div>
              <h2 className="text-white">Hospital System</h2>
              <p className="text-blue-300 text-sm">{user.name}</p>
            </div>
          </div>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm ${roleBadge.color}`}
          >
            {roleBadge.label}
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-800 border-l-4 border-white"
                    : "hover:bg-blue-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.adminOnly && <Lock className="w-4 h-4 text-blue-300" />}
              </button>
            );
          })}
        </nav>

        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-6 py-4 border-t border-blue-800 hover:bg-blue-800 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <h1 className="text-gray-800">
            {menuItems.find((item) => item.id === activeTab)?.label ||
              "Acesso Restrito"}
          </h1>

          <div className="w-10" />
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
