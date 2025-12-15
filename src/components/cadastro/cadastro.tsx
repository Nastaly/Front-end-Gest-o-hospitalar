import { useState } from "react";
import "./Cadastro.css";

// Definindo o tipo dos dados do formulário
interface FormData {
  nome: string;
  idade: string;
  email: string;
  telefone: string;
}

export default function Cadastro() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    idade: "",
    email: "",
    telefone: "",
  });

  const [mensagem, setMensagem] = useState<string>("");

  // Atualiza os campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envia o formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação simples
    if (!formData.nome || !formData.idade || !formData.email) {
      setMensagem("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    setMensagem(`Paciente ${formData.nome} cadastrado com sucesso!`);
    console.log("Dados do paciente:", formData);

    // Resetar formulário
    setFormData({ nome: "", idade: "", email: "", telefone: "" });
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Paciente</h2>
      <form onSubmit={handleSubmit} className="cadastro-form">
        <label>
          Nome*:
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </label>

        <label>
          Idade*:
          <input
            type="number"
            name="idade"
            value={formData.idade}
            onChange={handleChange}
          />
        </label>

        <label>
          Email*:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Telefone:
          <input
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Cadastrar</button>
      </form>

      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}
