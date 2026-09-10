import React from "react";
import { useTarefas } from "./TarefaContext";

// Opções fixas de filtro exibidas na tela
const OPCOES_FILTRO = [
  { chave: "todas", rotulo: "Todas" },
  { chave: "pendentes", rotulo: "Pendentes" },
  { chave: "concluidas", rotulo: "Concluídas" },
];

export default function TarefaFiltros() {
  const {
    filtroAtivo,
    setFiltroAtivo,
    tarefas,
    totalPendentes,
    totalConcluidas,
  } = useTarefas();

  // Objeto com a contagem de tarefas para cada filtro, usado para
  // mostrar o número ao lado do nome de cada botão
  const contagens = {
    todas: tarefas.length,
    pendentes: totalPendentes,
    concluidas: totalConcluidas,
  };

  return (
    <div className="tarefa-filtros">
      {/* MAP: transforma cada opção de filtro em um botão na tela */}
      {OPCOES_FILTRO.map((opcao) => (
        <button
          key={opcao.chave}
          className={`filtro-botao ${
            filtroAtivo === opcao.chave ? "ativo" : ""
          }`}
          // CALLBACK: ao clicar, troca o filtro ativo no contexto global
          onClick={() => setFiltroAtivo(opcao.chave)}
        >
          {opcao.rotulo} <span className="filtro-contagem">{contagens[opcao.chave]}</span>
        </button>
      ))}
    </div>
  );
}