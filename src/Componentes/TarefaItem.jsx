import React from "react";
import { useTarefas } from "./TarefaContext";

// Converte uma data no formato ISO (aaaa-mm-dd) para o formato brasileiro (dd/mm/aaaa)
function formatarData(iso) {
  if (!iso) return "";
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

// Mapa que liga cada nível de prioridade a uma classe CSS
const CLASSE_PRIORIDADE = {
  Baixa: "prioridade-baixa",
  Média: "prioridade-media",
  Alta: "prioridade-alta",
};

export default function TarefaItem({ tarefa }) {
  // Funções vindas do contexto global para marcar como concluída e remover
  const { alternarConcluida, removerTarefa } = useTarefas();

  return (
    <li className={`tarefa-item ${tarefa.concluida ? "concluida" : ""}`}>
      <button
        className="tarefa-checkbox"
        aria-label={
          tarefa.concluida ? "Marcar como pendente" : "Marcar como concluída"
        }
        // CALLBACK: ao clicar, alterna concluída/pendente para esta tarefa
        onClick={() => alternarConcluida(tarefa.id)}
      >
        {tarefa.concluida ? "✓" : ""}
      </button>

      <div className="tarefa-corpo">
        <div className="tarefa-cabecalho">
          <span className="tarefa-nome">{tarefa.nome}</span>
          <span
            className={`tarefa-prioridade ${
              CLASSE_PRIORIDADE[tarefa.prioridade] || ""
            }`}
          >
            {tarefa.prioridade}
          </span>
        </div>

        {tarefa.descricao && (
          <p className="tarefa-descricao">{tarefa.descricao}</p>
        )}

        <div className="tarefa-rodape">
          <span className="tarefa-data">{formatarData(tarefa.data)}</span>
          <button
            className="tarefa-remover"
            // CALLBACK: ao clicar, remove esta tarefa da lista
            onClick={() => removerTarefa(tarefa.id)}
          >
            Remover
          </button>
        </div>
      </div>
    </li>
  );
}