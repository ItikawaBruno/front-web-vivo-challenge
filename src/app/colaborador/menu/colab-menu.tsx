import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { MdMenu, MdChat, MdList, MdBarChart, MdLogout, MdPersonRemove } from 'react-icons/md';


export function ProtectedRoute({ children }: { children: React.JSX.Element }) {
  const token = localStorage.getItem("token"); 
  return token ? children : <Navigate to="/login" replace />;
}

export default function Menu() {
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  const menuWidth = menuAberto ? 80 : 35;

  async function desativarConta() {
    const token = localStorage.getItem("token"); 
    if (!token) return alert("Usuário não autenticado");

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

  function confirmaLogOut() {
    const sair = window.confirm("Você deseja realmente sair?");
    if (sair) {
      console.log("Usuário saiu");
      navigate('/cadastrar/');
    }
  }

  const tarefas = [
    { nome:"Reunião com a equipe" },
    { nome:"Manutenção no código" }
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'white' }}>
      <div style={{
        width: menuWidth,
        transition: 'width 0.3s',
        backgroundColor: '#993399',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 50,
      }}>
        <button onClick={() => setMenuAberto(!menuAberto)} style={buttonStyle}>
          <MdMenu style={{ color: 'white' }} size="24" />
        </button>
        {menuAberto && (
          <>
            <button style={buttonStyle} onClick={() => navigate('./chat')}>
              <MdChat style={{ color: 'white' }} size="24" />
            </button>
            <button style={buttonStyle} onClick={() => navigate('./list-status')}>
              <MdList style={{ color: 'white' }} size="24" />
            </button>
            <button style={buttonStyle} onClick={() => navigate('./dashboard')}>
              <MdBarChart style={{ color: 'white' }} size="24" />
            </button>
            <button style={buttonStyle} onClick={confirmaLogOut}>
              <MdLogout style={{ color: 'white' }} size="24" />
            </button>
            <button style={buttonStyle} onClick={desativarConta}>
              <MdPersonRemove style={{ color: 'white' }} size="24" />
            </button>
          </>
        )}
      </div>
      <div style={{ flex: 1, padding: 20, paddingTop: 50, backgroundColor: 'white' }}>
        <h1 style={{ color: '#993399', fontSize: 28, marginBottom: 20 }}>Olá, Bruno!</h1>
        <h2 style={{ color: '#993399', fontSize: 18, marginBottom: 15 }}>Tarefas Pendentes</h2>
        {tarefas.map((item, index) => (
          <div key={index} style={{
            backgroundColor: '#B266B2',
            padding: 15,
            borderRadius: 10,
            marginBottom: 15,
            width: '80%',
          }}>
            <span style={{ color: 'white', fontSize: 16, fontWeight: 500 }}>{item.nome}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: 15,
  marginBottom: 15,
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
};