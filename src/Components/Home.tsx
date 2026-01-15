import { useState, useEffect } from 'react';
import { 
  Activity, 
  Users, 
  Calendar, 
  ClipboardList, 
  TrendingUp, 
  AlertCircle,
  Clock,
  UserCheck,
  Stethoscope,
  Package,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface HomeProps {
  user: any;
}

export function Home({ user }: HomeProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const getRoleName = () => {
    const roles: Record<string, string> = {
      admin: 'Administrador',
      medico: 'Médico',
      enfermeiro: 'Enfermeiro',
      recepcao: 'Recepção'
    };
    return roles[user.role] || 'Utilizador';
  };

  // Dados estatísticos baseados no perfil do usuário
  const stats = {
    admin: [
      { label: 'Total de Pacientes', value: '1.234', icon: Users, color: 'blue', change: '+12%', trend: 'up' },
      { label: 'Consultas Hoje', value: '89', icon: Calendar, color: 'green', change: '+5%', trend: 'up' },
      { label: 'Funcionários Ativos', value: '156', icon: UserCheck, color: 'purple', change: '0%', trend: 'neutral' },
      { label: 'Taxa de Ocupação', value: '78%', icon: Activity, color: 'orange', change: '-3%', trend: 'down' }
    ],
    medico: [
      { label: 'Consultas Hoje', value: '12', icon: Calendar, color: 'blue', change: '+2', trend: 'up' },
      { label: 'Pacientes Aguardando', value: '5', icon: Clock, color: 'orange', change: '0', trend: 'neutral' },
      { label: 'Consultas Concluídas', value: '7', icon: UserCheck, color: 'green', change: '+3', trend: 'up' },
      { label: 'Prontuários Pendentes', value: '3', icon: ClipboardList, color: 'purple', change: '-1', trend: 'down' }
    ],
    enfermeiro: [
      { label: 'Triagens Hoje', value: '24', icon: ClipboardList, color: 'blue', change: '+8', trend: 'up' },
      { label: 'Pacientes Registados', value: '18', icon: Users, color: 'green', change: '+5', trend: 'up' },
      { label: 'Prioridade Alta', value: '6', icon: AlertCircle, color: 'red', change: '+2', trend: 'up' },
      { label: 'Medicamentos Baixos', value: '12', icon: Package, color: 'orange', change: '0', trend: 'neutral' }
    ],
    recepcao: [
      { label: 'Consultas Agendadas', value: '45', icon: Calendar, color: 'blue', change: '+15', trend: 'up' },
      { label: 'Check-ins Hoje', value: '32', icon: UserCheck, color: 'green', change: '+8', trend: 'up' },
      { label: 'Pacientes Aguardando', value: '8', icon: Clock, color: 'orange', change: '-2', trend: 'down' },
      { label: 'Novos Cadastros', value: '5', icon: Users, color: 'purple', change: '+3', trend: 'up' }
    ]
  };

  const currentStats = stats[user.role as keyof typeof stats] || stats.admin;

  // Atividades recentes
  const recentActivities = {
    admin: [
      { time: '10:30', text: 'Novo funcionário cadastrado: Enf. João Manuel', type: 'success' },
      { time: '10:15', text: 'Auditoria do sistema realizada', type: 'info' },
      { time: '09:45', text: 'Relatório mensal gerado', type: 'info' },
      { time: '09:20', text: 'Backup automático concluído', type: 'success' }
    ],
    medico: [
      { time: '11:00', text: 'Consulta concluída - Maria Santos', type: 'success' },
      { time: '10:30', text: 'Prontuário atualizado - João Silva', type: 'info' },
      { time: '10:00', text: 'Nova consulta agendada - Pedro Costa', type: 'info' },
      { time: '09:45', text: 'Exames solicitados - Ana Paula', type: 'info' }
    ],
    enfermeiro: [
      { time: '11:15', text: 'Triagem realizada - Manuel Pedro (Alta Prioridade)', type: 'warning' },
      { time: '10:50', text: 'Paciente registado - Sofia Lima', type: 'success' },
      { time: '10:30', text: 'Medicamento reposto - Paracetamol', type: 'info' },
      { time: '10:00', text: 'Sinais vitais aferidos - Carlos Alberto', type: 'info' }
    ],
    recepcao: [
      { time: '11:20', text: 'Check-in realizado - Isabel Fernandes', type: 'success' },
      { time: '11:00', text: 'Consulta agendada - Dr. Silva às 15h', type: 'info' },
      { time: '10:40', text: 'Novo paciente cadastrado - António Costa', type: 'success' },
      { time: '10:20', text: 'Consulta reagendada - Maria João', type: 'info' }
    ]
  };

  const activities = recentActivities[user.role as keyof typeof recentActivities] || recentActivities.admin;

  // Tarefas rápidas
  const quickActions = {
    admin: [
      { label: 'Cadastrar Funcionário', icon: Users, color: 'bg-blue-600' },
      { label: 'Ver Auditoria', icon: AlertCircle, color: 'bg-purple-600' },
      { label: 'Relatórios', icon: ClipboardList, color: 'bg-green-600' }
    ],
    medico: [
      { label: 'Ver Consultas', icon: Calendar, color: 'bg-blue-600' },
      { label: 'Prontuários', icon: ClipboardList, color: 'bg-green-600' },
      { label: 'Ver Triagens', icon: Stethoscope, color: 'bg-purple-600' }
    ],
    enfermeiro: [
      { label: 'Nova Triagem', icon: ClipboardList, color: 'bg-blue-600' },
      { label: 'Registar Paciente', icon: Users, color: 'bg-green-600' },
      { label: 'Gerir Estoque', icon: Package, color: 'bg-orange-600' }
    ],
    recepcao: [
      { label: 'Agendar Consulta', icon: Calendar, color: 'bg-blue-600' },
      { label: 'Cadastrar Paciente', icon: Users, color: 'bg-green-600' },
      { label: 'Check-in', icon: UserCheck, color: 'bg-purple-600' }
    ]
  };

  const actions = quickActions[user.role as keyof typeof quickActions] || quickActions.admin;

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-orange-200 bg-orange-50';
      case 'error': return 'border-red-200 bg-red-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-orange-600';
      case 'error': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho de Boas-vindas */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-white mb-2">{getGreeting()}, {user.name}!</h1>
            <p className="text-blue-100 text-lg">
              {getRoleName()} • {currentTime.toLocaleDateString('pt-AO', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6" />
              <span className="text-2xl">
                {currentTime.toLocaleTimeString('pt-PT', { 
                  hour: '2-digit', 
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentStats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-700',
            green: 'bg-green-100 text-green-700',
            purple: 'bg-purple-100 text-purple-700',
            orange: 'bg-orange-100 text-orange-700',
            red: 'bg-red-100 text-red-700'
          };
          
          return (
            <div key={index} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 
                  'text-gray-600'
                }`}>
                  {stat.trend === 'up' && <ArrowUp className="w-4 h-4" />}
                  {stat.trend === 'down' && <ArrowDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-1">{stat.label}</p>
              <p className="text-gray-900 text-2xl">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ações Rápidas */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Ações Rápidas
          </h2>
          <div className="space-y-3">
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className={`w-full ${action.color} text-white rounded-lg p-4 flex items-center gap-3 hover:opacity-90 transition-opacity`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Atividades Recentes */}
        <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
          <h2 className="text-gray-900 mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-600" />
            Atividades Recentes
          </h2>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {activities.map((activity, index) => (
              <div
                key={index}
                className={`border rounded-lg p-4 ${getActivityColor(activity.type)}`}
              >
                <div className="flex items-start gap-3">
                  <Activity className={`w-5 h-5 mt-0.5 ${getActivityIcon(activity.type)}`} />
                  <div className="flex-1">
                    <p className="text-gray-900">{activity.text}</p>
                    <p className="text-gray-600 text-sm mt-1">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerta Informativo */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-blue-900 mb-2">Sistema Hospitalar - Angola</h3>
          <p className="text-blue-800">
            Todos os dados são exemplos para demonstração. Use o menu lateral para aceder às diferentes funcionalidades do sistema.
          </p>
        </div>
      </div>
    </div>
  );
}
