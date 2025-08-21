import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdSend } from 'react-icons/md';
import "./chat.css"

// Define o tipo de mensagem para o estado do chat
interface Message {
  text: string;
  sender: 'user' | 'assistant';
}

const ChatApp = () => {

    const navigate = useNavigate();
  // Estado para armazenar as mensagens do chat
  const [messages, setMessages] = useState<Message[]>([]);
  // Estado para o valor do input de texto
  const [inputMessage, setInputMessage] = useState('');
  // Referência para o fim da área de mensagens para auto-scroll
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Exemplo de saudação inicial do assistente
  useEffect(() => {
    // Adiciona uma mensagem inicial do assistente ao carregar
    setMessages([{ text: "Olá, como posso te ajudar?", sender: 'assistant' }]);
  }, []);

  // UseEffect para auto-scroll para o fim da conversa
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Função para lidar com o envio da mensagem do usuário
  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    // Adiciona a mensagem do usuário à lista de mensagens
    const newUserMessage: Message = { text: inputMessage, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    
    // Limpa o input
    setInputMessage('');

    // Simulação de resposta do assistente após 1.5 segundos
    setTimeout(() => {
      const newAssistantMessage: Message = { text: 'Ótima pergunta, esse assunto...', sender: 'assistant' };
      setMessages(prevMessages => [...prevMessages, newAssistantMessage]);
    }, 1500);
  };
  
  // Função para lidar com a tecla "Enter" no input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <button 
          onClick={() => navigate("/colaborador/menu")}
          className="back-button"
        >
          <MdArrowBack size={24} color="white" />
        </button>
        <span className="chat-header-title">VIVI</span>
      </div>

      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${msg.sender === 'user' ? 'message-user' : 'message-assistant'}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      <div className="chat-footer">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite uma pergunta..."
          className="chat-input"
        />
        <button
          onClick={handleSendMessage}
          className="send-button"
        >
          <MdSend size={24} color="white" />
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
