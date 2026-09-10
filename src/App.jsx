import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TarefaProvider } from "./Componentes/TarefaContext";
import Header from "./Componentes/Header";
import Footer from "./Componentes/Footer";
import Home from "./Pages/Home";
import Tarefas from "./Pages/Tarefas";

export default function App() {
  return (
  
    <TarefaProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Header />
          <main className="conteudo">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tarefas" element={<Tarefas />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TarefaProvider>
  );
}
