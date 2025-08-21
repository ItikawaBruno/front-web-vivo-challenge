import { useNavigate } from 'react-router-dom';
import { MdExitToApp, MdAddCircle } from 'react-icons/md';
import "./menu-gestor.css"

/**
 * Componente da página do menu do gestor.
 * Este componente usa o hook `useNavigate` para a navegação.
 */
const MenuGestor = () => {
  const navigate = useNavigate();

  async function desativarConta() {
    const token = localStorage.getItem("token"); 
    if (!token) {
      console.log("Usuário não autenticado.");
      return;
    }

    const confirmacao = window.confirm("Deseja realmente desativar sua conta?");
    if (!confirmacao) return;

    try {
      const response = await fetch("http://localhost:8080/deletar", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        alert("Conta desativada com sucesso!");
        navigate("/"); 
      } else {
        alert("Não foi possível desativar a conta.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao desativar a conta.");
    }
  }

  const colaborador = [
    { nome: 'Bruno' },
    { nome: 'Matheus' },
    { nome: 'Julia' },
    { nome: 'Renan' },
    { nome: 'Kevin' }
  ];

  return (
    <div className="container">
      <button onClick={() => navigate('/')} className="logout-button">
        <MdExitToApp size={24}/>
      </button>

      <p className="title">Olá, Gerson!</p>
      
      <div className="collaborator-list">
        <p className="subtitle">Colaboradores</p>
        {colaborador.map((item, index) => (
          <button key={index} className="collaborator-card" onClick={() => navigate('./dados')}>
            <p>{item.nome}</p>
          </button>
        ))}
      </div>
      
      <button className="add-task-card" onClick={() => navigate('./tarefa')}>
        <MdAddCircle size={22}/>
        <p>Adicionar Tarefa</p>
      </button>
    </div>
  );
};

export default MenuGestor;
