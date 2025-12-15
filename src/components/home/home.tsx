import { Link } from "react-router-dom";
import "./home.css";

export default function Landing() {
  return (
    <div className="landing-container">
      {/* Header */}
      <header className="landing-header">
        <h1>Sistema Hospitalar UPRA</h1>
        <nav>
          <Link to="/login" className="btn btn-login">
            Login
          </Link>
          <Link to="/cadastro" className="btn btn-cadastro">
            Cadastro
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>Gerencie pacientes e consultas com eficiência e segurança</h2>
          <p>
            Um sistema moderno, rápido e intuitivo para hospitais e clínicas.
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary">
              Começar Agora
            </Link>
            <Link to="/cadastro" className="btn btn-secondary">
              Criar Conta
            </Link>
          </div>
        </div>
        <div className="hero-image">
          {/* Você pode colocar uma ilustração SVG ou PNG */}
          <img
            src="https://img.icons8.com/ios-filled/400/hospital.png"
            alt="Hospital"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h3>Funcionalidades do Sistema</h3>
        <div className="features-cards">
          <div className="card">
            <h4>Pacientes</h4>
            <p>
              Cadastro, histórico e acompanhamento completo de cada paciente.
            </p>
          </div>
          <div className="card">
            <h4>Consultas</h4>
            <p>Agendamento fácil e controle das consultas do dia.</p>
          </div>
          <div className="card">
            <h4>Profissionais</h4>
            <p>Gerencie médicos, enfermeiros e demais funcionários.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2025 UPRA. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
