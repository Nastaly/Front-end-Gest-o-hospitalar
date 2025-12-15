import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Cadastro from "./components/cadastro/cadastro";
import Home from "./components/home/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
