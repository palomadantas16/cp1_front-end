import React, { useState } from "react";
import TarefaForm from "../Componentes/TarefaForm";
import TarefaFiltros from "../Componentes/TarefaFiltros";
import TarefaItem from "../Componentes/TarefaItem";
import Toast from "../Componentes/Toast";
import { useTarefas } from "../Componentes/TarefaContext";
import "../CSS/Tarefas.css";

export default function Tarefas() {
  // Lista já filtrada de acordo com o filtro ativo (vem do contexto global)
  const { tarefasFiltradas, filtroAtivo } = useTarefas();

  // HOOK useState: controla a mensagem exibida no Toast de feedback
  const [mensagemToast, setMensagemToast] = useState("");

  // CALLBACK: passada como prop para o TarefaForm; é chamada por ele
  // sempre que uma nova tarefa é cadastrada com sucesso
  function aoCriarTarefa() {
    setMensagemToast("Tarefa adicionada com sucesso!");
  }

  return (
    <div className="pagina-tarefas">
      <div className="pagina-tarefas-cabecalho">
        <h1>Minhas tarefas</h1>
      </div>

      <div className="tarefas-layout">
        <TarefaForm onCriar={aoCriarTarefa} />

        <div className="tarefas-lista-coluna">
          <TarefaFiltros />

          {tarefasFiltradas.length === 0 ? (
            <p className="tarefas-vazio">
              {filtroAtivo === "todas" &&
                "Nenhuma tarefa cadastrada ainda. Crie a primeira ao lado."}
              {filtroAtivo === "pendentes" &&
                "Nenhuma tarefa pendente. Bom trabalho!"}
              {filtroAtivo === "concluidas" &&
                "Nenhuma tarefa concluída ainda."}
            </p>
          ) : (
            <ul className="tarefas-lista">
              {/* MAP: transforma cada tarefa filtrada em um componente TarefaItem na tela */}
              {tarefasFiltradas.map((tarefa) => (
                <TarefaItem key={tarefa.id} tarefa={tarefa} />
              ))}
            </ul>
          )}
        </div>
      </div>

      <Toast mensagem={mensagemToast} onFechar={() => setMensagemToast("")} />
    </div>
  );
}