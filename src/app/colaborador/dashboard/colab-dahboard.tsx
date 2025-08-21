import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
// Certifique-se de que o arquivo 'dashboard.css' existe no diretório correto.
import './dashboard.css';

// Dados de exemplo para o gráfico de linha (desempenho diário)
const lineChartData = [
  { name: 'seg', value: 0 },
  { name: 'ter', value: 20 },
  { name: 'qua', value: 15 },
  { name: 'qui', value: 10 },
  { name: 'sex', value: 20 },
  { name: 'sáb', value: 5 },
  { name: 'dom', value: 35 },
];

// Dados de exemplo para o novo gráfico de pizza (porcentagem de tarefas)
const pieChartData = [
  { name: 'Feitas', value: 75 },
  { name: 'Não Feitas', value: 25 },
];

const COLORS = ['#993399', '#ffb366']; // Cores para o gráfico de pizza

export default function Dashboard() {
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // useEffect para atualizar a largura da tela em mudanças de tamanho
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define a largura máxima dos gráficos para telas maiores
  const boxWidth = Math.min(screenWidth * 0.9, 800);
  const titleFontSize = screenWidth > 600 ? 32 : 24;

  return (
    <div className="scroll-container">
       <button onClick={() => navigate('/colaborador/menu')} className="icon-button">
            <MdArrowBack size={22} color="black"/>
          </button>
      <div className="dashboard-container">
        <header className="dashboard-header flex justify-between items-center w-full p-4">
          <span className="title text-center" style={{ fontSize: titleFontSize }}>
            Dashboard do seu<br />desempenho!
          </span>
          <div style={{ width: 22 }}></div>
        </header>

        <div className="charts-container flex flex-wrap justify-center gap-8 mt-8" style={{ width: boxWidth }}>
          <div className="box-dashboard" style={{ width: screenWidth > 600 ? boxWidth / 2.2 : boxWidth, height: 300 }}>
            <h2 className="chart-title text-center text-lg font-bold mb-4">Total de Tarefas Concluídas</h2>
            <ResponsiveContainer className={"tot"} width="100%" height="100%">
              <h1 className='num'>15</h1>
            </ResponsiveContainer>
          </div>
          {/* Gráfico de Linha */}
          <div className="box-dashboard" style={{ width: screenWidth > 600 ? boxWidth / 2.2 : boxWidth, height: 300 }}>
            <h3 className="chart-title text-center text-lg font-bold mb-4">Progresso Semanal</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineChartData}
                margin={{
                  top: 20,
                  right: 20,
                  left: -20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#000" />
                <YAxis stroke="#000" domain={[0, 40]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#993399" strokeWidth={3} dot={{ r: 5, stroke: '#993399', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Novo Gráfico de Pizza */}
          <div className="box-dashboard" style={{ width: screenWidth > 600 ? boxWidth / 2.2 : boxWidth, height: 300 }}>
            <h3 className="chart-title text-center text-lg font-bold mb-4">Tarefas Concluídas</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="horizontal" align="center" verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
