import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdCheckCircle, MdClose } from 'react-icons/md';

import './ListStatus.css'; 


interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
}

export default function ListStatus() {
  const navigate = useNavigate();

  const [tarefaSelecionada, setTarefaSelecionada] = useState<Tarefa | null>(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");


  const tarefasPendentes: Tarefa[] = [ 
    { id: 1, titulo: "Reunião com a equipe", descricao: "Reunião de alinhamento com a equipe de desenvolvimento sobre o projeto X." },
    { id: 2, titulo: "Manutenção no código", descricao: "Realizar a manutenção de rotina e corrigir pequenos bugs na funcionalidade de login." }
  ];

  const tarefasFinalizadas: Tarefa[] = [ 
    { id: 3, titulo: "Reunião de briefing", descricao: "Reunião inicial com o cliente para entender os requisitos do novo sistema." },
    { id: 4, titulo: "Análise de dados", descricao: "Análise dos dados do último trimestre para criar o relatório de desempenho." }
  ];


  const handleAbrirCard = (tarefa: Tarefa) => {
    setTarefaSelecionada(tarefa);
    setMessage(""); 
  };


  const handleFecharCard = () => {
    setTarefaSelecionada(null);
  };
  
  
  const isPendingTask = (tarefa: Tarefa | null) => {
    return tarefa !== null && tarefasPendentes.some(t => t.id === tarefa.id);
  };

  async function finalizarTarefa() {
    if (!tarefaSelecionada) return;

    setLoading(true);
    setMessage("Finalizando tarefa...");

    try {
      const resp = await fetch(`http://localhost:8080/tarefa/${tarefaSelecionada.id}/finalizar`, {
        method: "PATCH" 
      });

      if (resp.ok) {
        setMessage("Tarefa finalizada com sucesso!");
        
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
      <div className="header" style={{}}>
        <span className="title" style={{color:'#993399'}}>Tarefas Da Semana</span>
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
            
            {isPendingTask(tarefaSelecionada) && (
              <button 
                onClick={finalizarTarefa} 
                className='btn-finalizar'
                disabled={loading}
              >
                {loading ? "Finalizando..." : "Finalizar"}
              </button>
            )}
            
            {message && <p className={message.includes("sucesso") ? "success-message" : "error-message"}>{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
