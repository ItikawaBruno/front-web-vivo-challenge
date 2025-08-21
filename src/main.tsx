import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./app/login";
import Cadastrar from "./app/cadastrar/cadastrar";
import Menu from "./app/colaborador/menu/colab-menu";
import ListStatus from "./app/colaborador/list-status/colab-list";
import Dashboard from "./app/colaborador/dashboard/colab-dahboard";
import ChatApp from "./app/colaborador/chat/chat"
import MenuGestor from "./app/gestor/colaboradores/menu-gestor";
import CriaTarefa from "./app/gestor/tarefa/adicionar-tarefa";
import DadosColaborador from "./app/gestor/dados-colab/dados";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/colaborador/menu" element={<Menu />} />
        <Route path="/colaborador/menu/list-status" element={<ListStatus />} />
        <Route path="/colaborador/menu/dashboard" element={<Dashboard />} />
        <Route path="/colaborador/menu/chat" element={<ChatApp />} />
        <Route path="/gestor/menu" element={<MenuGestor />} />
        <Route path="/gestor/menu/tarefa" element={<CriaTarefa />} />
        <Route path="/gestor/menu/dados" element={<DadosColaborador />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
