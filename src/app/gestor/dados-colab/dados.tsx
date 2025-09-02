import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdClose } from "react-icons/md";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./dados.css";

interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
}

export default function DadosColaborador() {
  const navigate = useNavigate();
  const [tarefaSelecionada, setTarefaSelecionada] = useState<Tarefa | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const tarefasPendentes: Tarefa[] = [
    {
      id: 1,
      titulo: "Reunião com a equipe",
      descricao: "Alinhamento com a equipe sobre o projeto X.",
    },
    {
      id: 2,
      titulo: "Manutenção do código",
      descricao: "Corrigir bugs e manter funcionalidades existentes.",
    },
  ];

  const produtividade = [
    { dia: "Seg", valor: 12 },
    { dia: "Ter", valor: 20 },
    { dia: "Qua", valor: 30 },
    { dia: "Qui", valor: 10 },
    { dia: "Sex", valor: 25 },
    { dia: "Sab", valor: 15 },
    { dia: "Dom", valor: 22 },
  ];

  const handleAbrirCard = (tarefa: Tarefa) => {
    setTarefaSelecionada(tarefa);
    setMessage("");
  };

  const handleFecharCard = () => {
    setTarefaSelecionada(null);
  };

  const isPendingTask = (tarefa: Tarefa | null) => {
    return tarefa !== null && tarefasPendentes.some((t) => t.id === tarefa.id);
  };

  async function finalizarTarefa() {
    if (!tarefaSelecionada) return;

    setLoading(true);
    setMessage("Finalizando tarefa...");

    try {
      const resp = await fetch(
        `http://localhost:8080/tarefa/${tarefaSelecionada.id}/finalizar`,
        { method: "PATCH" }
      );

      if (resp.ok) {
        setMessage("Tarefa finalizada com sucesso!");
        setTimeout(handleFecharCard, 1500);
      } else {
        setMessage(`Erro ao finalizar a tarefa. Status: ${resp.status}`);
      }
    } catch (error) {
      setMessage("Erro de rede ao tentar finalizar a tarefa.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dados-container">
      <button onClick={() => navigate("/gestor/menu")} className="back-click">
        <MdArrowBack size={24} />
      </button>

      <h1 className="dados-title">Nome do Colaborador</h1>

      <div className="chart-box">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={produtividade}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dia" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="valor"
              stroke="#993399"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h2 className="dados-subtitle">Tarefas Pendentes</h2>
      <div className="tarefas-list">
        {tarefasPendentes.map((tarefa) => (
          <button
            key={tarefa.id}
            className="tarefa-card"
            onClick={() => handleAbrirCard(tarefa)}
          >
            {tarefa.titulo}
          </button>
        ))}
      </div>

      {tarefaSelecionada && (
        <div className="modalOverlay">
          <div className="modalCard">
            <button onClick={handleFecharCard} className="closeButton">
              <MdClose />
            </button>
            <h3>{tarefaSelecionada.titulo}</h3>
            <p>{tarefaSelecionada.descricao}</p>

            {isPendingTask(tarefaSelecionada) && (
              <button
                onClick={finalizarTarefa}
                className="btn-finalizar"
                disabled={loading}
              >
                {loading ? "Finalizando..." : "Finalizar"}
              </button>
            )}

            {message && (
              <p
                className={
                  message.includes("sucesso")
                    ? "success-message"
                    : "error-message"
                }
              >
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
