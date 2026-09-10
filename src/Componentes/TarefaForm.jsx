import React, { useState } from "react";
import { useTarefas } from "./TarefaContext";

// Níveis de prioridade disponíveis para a tarefa
const PRIORIDADES = ["Baixa", "Média", "Alta"];

export default function TarefaForm({ onCriar }) {
  // Pega a função de cadastro que vem do contexto global de tarefas
  const { adicionarTarefa } = useTarefas();

  // HOOK useState: guarda os valores digitados no formulário (Nome, Data,
  // Descrição e Prioridade) em um único objeto
  const [form, setForm] = useState({
    nome: "",
    data: "",
    descricao: "",
    prioridade: "Média",
  });

  // HOOK useState: guarda uma mensagem de erro de validação, se houver
  const [erro, setErro] = useState("");

  // CALLBACK: chamada pelo onChange de qualquer campo do formulário.
  // Usa o atributo "name" do input para saber qual propriedade do objeto
  // "form" deve ser atualizada, evitando escrever uma função para cada campo.
  function atualizarCampo(evento) {
    const { name, value } = evento.target;
    setForm((atual) => ({ ...atual, [name]: value }));
  }

  // CALLBACK: chamada ao enviar o formulário (submit)
  function aoEnviar(evento) {
    evento.preventDefault(); // evita o recarregamento padrão da página

    // Validação simples: nome e data são obrigatórios
    if (!form.nome.trim() || !form.data) {
      setErro("Preencha ao menos o nome e a data da tarefa.");
      return;
    }

    adicionarTarefa(form);
    setErro("");
    setForm({ nome: "", data: "", descricao: "", prioridade: "Média" });

    // Avisa o componente pai (Tarefas.jsx) que uma tarefa foi criada,
    // para que ele possa exibir o Toast de sucesso
    if (onCriar) onCriar();
  }

  return (
    <form className="tarefa-formulario" onSubmit={aoEnviar}>
      <h3>Nova tarefa</h3>

      <div className="campo">
        <label htmlFor="nome">Nome da tarefa</label>
        <input
          id="nome"
          name="nome"
          type="text"
          placeholder="Ex: Revisar o código de python"
          value={form.nome}
          onChange={atualizarCampo}
        />
      </div>

      <div className="linha-campos">
        <div className="campo">
          <label htmlFor="data">Data</label>
          <input
            id="data"
            name="data"
            type="date"
            value={form.data}
            onChange={atualizarCampo}
          />
        </div>

        <div className="campo">
          <label htmlFor="prioridade">Nível de prioridade</label>
          <select
            id="prioridade"
            name="prioridade"
            value={form.prioridade}
            onChange={atualizarCampo}
          >
            {/* MAP: percorre a lista de prioridades para gerar as opções do select */}
            {PRIORIDADES.map((nivel) => (
              <option key={nivel} value={nivel}>
                {nivel}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="campo">
        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          name="descricao"
          rows={3}
          placeholder="Detalhes técnicos, links, observações..."
          value={form.descricao}
          onChange={atualizarCampo}
        />
      </div>

      {erro && <p className="mensagem-erro">{erro}</p>}

      <button type="submit" className="botao-primario">
        Adicionar tarefa
      </button>
    </form>
  );
}