import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdCheckCircle, MdClose } from 'react-icons/md';
// Importa o arquivo de estilos
import './ListStatus.css'; 

// 1. Interface para a tipagem da tarefa
interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
}

export default function ListStatus() {
  const navigate = useNavigate();
  // 2. Tipar o estado para ser Tarefa ou null
  const [tarefaSelecionada, setTarefaSelecionada] = useState<Tarefa | null>(null);
  // Estado para controlar o carregamento da requisição
  const [loading, setLoading] = useState(false);
  // Estado para exibir mensagens de feedback para o usuário
  const [message, setMessage] = useState("");

  // Simulação de dados do backend
  const tarefasPendentes: Tarefa[] = [ // 3. Tipar os arrays de tarefas
    { id: 1, titulo: "Reunião com a equipe", descricao: "Reunião de alinhamento com a equipe de desenvolvimento sobre o projeto X." },
    { id: 2, titulo: "Manutenção no código", descricao: "Realizar a manutenção de rotina e corrigir pequenos bugs na funcionalidade de login." }
  ];

  const tarefasFinalizadas: Tarefa[] = [ // 3. Tipar os arrays de tarefas
    { id: 3, titulo: "Reunião de briefing", descricao: "Reunião inicial com o cliente para entender os requisitos do novo sistema." },
    { id: 4, titulo: "Análise de dados", descricao: "Análise dos dados do último trimestre para criar o relatório de desempenho." }
  ];

  // 4. Tipar o parâmetro 'tarefa'
  const handleAbrirCard = (tarefa: Tarefa) => {
    setTarefaSelecionada(tarefa);
    setMessage(""); // Limpa a mensagem ao abrir um novo card
  };

  // Função para fechar o card de detalhes
  const handleFecharCard = () => {
    setTarefaSelecionada(null);
  };
  
  // Função auxiliar para verificar se a tarefa selecionada é pendente
  const isPendingTask = (tarefa: Tarefa | null) => {
    // Retorna true se a tarefa existe e seu ID está na lista de tarefas pendentes
    return tarefa !== null && tarefasPendentes.some(t => t.id === tarefa.id);
  };

  async function finalizarTarefa() {
    if (!tarefaSelecionada) return;

    setLoading(true);
    setMessage("Finalizando tarefa...");

    try {
      const resp = await fetch(`http://localhost:8080/tarefa/${tarefaSelecionada.id}/finalizar`, {
        method: "PATCH" // Corrigido para PATCH
      });

      if (resp.ok) {
        setMessage("Tarefa finalizada com sucesso!");
        // Fechar o modal após a finalização
        setTimeout(() => handleFecharCard(), 1500); 
      } else {
        setMessage(`Erro ao finalizar a tarefa. Status: ${resp.status}`);
      }
    } catch (error) {
      setMessage("Erro de rede ao tentar finalizar a tarefa.");
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <button onClick={() => navigate('/colaborador/menu')} className="iconButton">
          <MdArrowBack size={24} color='black' className='arrowback'/>
        </button>
      <div className="header">
        <span className="title">Tarefas Da Semana</span>
      </div>

      <div id="pendente">
        <span className="subTitle">Tarefas Pendentes</span>
        {tarefasPendentes.map(tarefa => (
          <div 
            key={tarefa.id} 
            className="taskCardPendente"
            onClick={() => handleAbrirCard(tarefa)}
          >
            <span>{tarefa.titulo}</span>
          </div>
        ))}
      </div>

      <div id="feito">
        <span className="subTitle">Tarefas Finalizadas</span>
        {tarefasFinalizadas.map(tarefa => (
          <div 
            key={tarefa.id} 
            className="taskCardFeito"
            onClick={() => handleAbrirCard(tarefa)}
          >
            <span>{tarefa.titulo}</span>
            <MdCheckCircle color='green' size={25} />
          </div>
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
            {/* Renderiza o botão "Finalizar" apenas se a tarefa for pendente */}
            {isPendingTask(tarefaSelecionada) && (
              <button 
                onClick={finalizarTarefa} 
                className='btn-finalizar'
                disabled={loading}
              >
                {loading ? "Finalizando..." : "Finalizar"}
              </button>
            )}
            {/* Exibe a mensagem de feedback para o usuário */}
            {message && <p className={message.includes("sucesso") ? "success-message" : "error-message"}>{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
