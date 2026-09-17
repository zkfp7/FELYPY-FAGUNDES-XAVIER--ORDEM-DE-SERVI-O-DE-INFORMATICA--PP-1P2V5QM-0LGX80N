import { useState } from 'react';

export default function App() {
  const [chamados, setChamados] = useState<any[]>([]);
  const [titulo, setTitulo] = useState('');
  const [solicitante, setSolicitante] = useState('');
  const [resumo, setResumo] = useState('');
  const [prioridade, setPrioridade] = useState('Baixa');

  // Regra simples: se faltar texto ou se já tiver 9 chamados, trava o botão
  const bloqueado = !titulo || !solicitante || !resumo || chamados.length >= 9;

  function adicionar() {
    if (bloqueado) return;
    
    setChamados([...chamados, { titulo, solicitante, resumo, prioridade }]);
    setTitulo('');
    setSolicitante('');
    setResumo('');
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ordens de Serviço ({chamados.length}/9)</h2>

      <p>Título: <input value={titulo} onChange={e => setTitulo(e.target.value)} /></p>
      <p>Solicitante: <input value={solicitante} onChange={e => setSolicitante(e.target.value)} /></p>
      <p>Solução: <input value={resumo} onChange={e => setResumo(e.target.value)} /></p>
      
      <p>Prioridade: 
        <select value={prioridade} onChange={e => setPrioridade(e.target.value)}>
          <option value="Baixa">Baixa</option>
          <option value="Alta">Alta</option>
        </select>
      </p>

      <button onClick={adicionar} disabled={bloqueado}>
        Cadastrar
      </button>

      <h3>Lista:</h3>
      {chamados.map((item, index) => (
        <div key={index} style={{ color: item.prioridade === 'Alta' ? 'red' : 'black' }}>
          <b>{item.titulo}</b> - {item.solicitante} ({item.prioridade})
          <p>Solução: {item.resumo}</p>
        </div>
      ))}
    </div>
  );
}