import React, { useEffect } from "react";
import "../CSS/Toast.css";

export default function Toast({ mensagem, tipo = "sucesso", onFechar }) {
  // HOOK useEffect: cria um temporizador que fecha o toast sozinho depois
  // de 4 segundos. Sempre que "mensagem" mudar, o efeito roda de novo , e a função de "limpeza" cancela o temporizador anterior, evitando temporizadores duplicados rodando ao mesmo tempo.
  useEffect(() => {
    const temporizador = setTimeout(onFechar, 4000);
    return () => clearTimeout(temporizador);
  }, [mensagem, onFechar]);

  if (!mensagem) return null;

  return (
    <div className={`toast ${tipo === "erro" ? "erro" : ""}`} role="alert">
      <span>{mensagem}</span>
      <button
        className="toast-fechar"
        onClick={onFechar} // CALLBACK: fecha o toast manualmente
        aria-label="Fechar aviso"
      >
        ×
      </button>
    </div>
  );
}