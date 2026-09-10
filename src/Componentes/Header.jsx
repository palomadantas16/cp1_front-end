import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../CSS/Header.css";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="cabecalho">
      <div className="cabecalho-conteudo">
        <Link to="/" className="marca">
          <span className="marca-nome">Seu Checklist ✓</span>
        </Link>

        <nav className="navegacao">
          <Link to="/" className={pathname === "/" ? "ativo" : ""}>
            Início
          </Link>
          <Link
            to="/tarefas"
            className={pathname === "/tarefas" ? "ativo" : ""}
          >
            Tarefas
          </Link>
        </nav>
      </div>
    </header>
  );
}
