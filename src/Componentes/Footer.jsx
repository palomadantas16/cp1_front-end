import React from "react";
import "../CSS/Footer.css";

export default function Footer() {
  return (
    <footer className="rodape">
      <div className="rodape-conteudo">
        <div className="rodape-coluna">
          <h4>Seu Checklist</h4>
          <p>Lista de tarefas para facilitar a vida do estudante.</p>
        </div>
        <div className="rodape-coluna">
          <h4>Sobre</h4>
          <p>Projeto de Checkpoint de Front-End com React.</p>
        </div>
      </div>
    
    </footer>
  );
}
