import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Home.css";
import imgInicio from "../assets/img_inicio.jpg";

export default function Home() {
  return (
    <div className="pagina-inicio">
      <section className="hero">
        <div className="hero-texto">
          <h1>Suas tarefas acessadas de forma mais prática e eficiente.</h1>
          <p>
            Faça seu checklist e se organize da melhor forma. Otimize o seu tempo e aumente seu desempenho. 
          </p>
          <Link to="/tarefas" className="botao-primario-home">
            Ver minhas tarefas
          </Link>
        </div>

        <div className="hero-terminal">
        <img src={imgInicio} alt="Imagem de início" />
        </div>
      </section>
    </div>
  );
}
