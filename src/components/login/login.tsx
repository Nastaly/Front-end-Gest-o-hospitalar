import React, { useState } from "react";
import "./login.css";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Usuário:", user, "Senha:", password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Gestão Hospitalar Da Upra</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Usuário</label>
            <input
              type="text"
              value={user}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUser(e.target.value)
              }
              placeholder="Digite seu Nome ou email"
              required
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
