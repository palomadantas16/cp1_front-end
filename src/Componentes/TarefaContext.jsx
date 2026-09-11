import React, { createContext, useContext, useEffect, useState } from "react";

// Chave usada para guardar as tarefas no localStorage do navegador
const CHAVE_STORAGE = "devtask_tarefas";

// Contexto que compartilha os dados de tarefas com toda a aplicação,
// evitando ter que passar props manualmente por vários componentes.
const TarefaContext = createContext(null);

export function TarefaProvider({ children }) {

  // HOOK useState: guarda a lista de tarefas em memória.
  // A função passada para useState só roda UMA vez, na primeira renderização,
  // e serve para ler os dados que já estavam salvos no localStorage,
  // é assim que garantimos a persistência automática ao recarregar a página.
  const [tarefas, setTarefas] = useState(() => {
    try {
      const salvas = localStorage.getItem(CHAVE_STORAGE);
      return salvas ? JSON.parse(salvas) : [];
    } catch (erro) {
      console.error("Não foi possível ler as tarefas salvas:", erro);
      return [];
    }
  });
 (todas / pendentes / concluídas)
  const [filtroAtivo, setFiltroAtivo] = useState("todas");

  // HOOK useEffect: é o hook de "efeito colateral". Ele roda toda vez que o
  // valor dentro do array de dependências ([tarefas]) muda, ou seja, toda
  // vez que uma tarefa é criada, removida ou alterada. Usamos isso para
  // SALVAR automaticamente a lista atualizada no localStorage.
  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(tarefas));
    } catch (erro) {
      console.error("Não foi possível salvar as tarefas:", erro);
    }
  }, [tarefas]);

  // CALLBACK: função repassada ao formulário (TarefaForm), chamada sempre
  // que o usuário cadastra uma nova tarefa. Completa os dados digitados
  // com um id único, o status inicial (pendente) e a data de criação.
  function adicionarTarefa(novaTarefa) {
    const tarefaCompleta = {
      id: crypto.randomUUID(),
      concluida: false,
      criadaEm: new Date().toISOString(),
      ...novaTarefa,
    };

    // Atualiza o estado usando a forma funcional (atuais => ...), garantindo
    // que sempre partimos do valor mais recente da lista de tarefas
    setTarefas((atuais) => [tarefaCompleta, ...atuais]);
  }

  // CALLBACK: remove uma tarefa pelo id.
  // Usa o método de array FILTER, que cria uma nova lista contendo apenas
  // os itens que NÃO têm o id informado, ou seja, "filtra para fora" a
  // tarefa removida, sem alterar a lista original (imutabilidade).
  function removerTarefa(id) {
    setTarefas((atuais) => atuais.filter((tarefa) => tarefa.id !== id));
  }

  // CALLBACK: alterna o status concluída/pendente de uma tarefa.
  // Usa o método de array MAP, que percorre todas as tarefas e devolve uma
  // nova lista: quando encontra a tarefa com o id procurado, cria uma cópia
  // dela com "concluida" invertido; as demais tarefas voltam sem alteração.
  function alternarConcluida(id) {
    setTarefas((atuais) =>
      atuais.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  }

  // LISTA DERIVADA: aplica o filtro ativo sobre a lista completa de tarefas
  // usando FILTER novamente. Não guardamos isso em um state separado porque
  // pode ser recalculado a cada renderização a partir de "tarefas" e "filtroAtivo".
  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtroAtivo === "pendentes") return !tarefa.concluida;
    if (filtroAtivo === "concluidas") return tarefa.concluida;
    return true;
  });

  // Contadores usados nos botões de filtro (também construídos com FILTER)
  const totalPendentes = tarefas.filter((tarefa) => !tarefa.concluida).length;
  const totalConcluidas = tarefas.filter((tarefa) => tarefa.concluida).length;

  const valor = {
    tarefas,
    tarefasFiltradas,
    filtroAtivo,
    setFiltroAtivo,
    totalPendentes,
    totalConcluidas,
    adicionarTarefa,
    removerTarefa,
    alternarConcluida,
  };

  return (
    <TarefaContext.Provider value={valor}>{children}</TarefaContext.Provider>
  );
}

// HOOK customizado para consumir o
// contexto com uma mensagem de erro amigável caso seja usado fora do Provider
export function useTarefas() {
  const contexto = useContext(TarefaContext);
  if (!contexto) {
    throw new Error("useTarefas precisa ser usado dentro de um TarefaProvider");
  }
  return contexto;
}