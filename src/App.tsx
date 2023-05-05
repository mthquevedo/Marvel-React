import "./App.css";
import React from 'react';
import Header from "./Componentes/Header";
import Footer from "./Componentes/Footer";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Footer enderecoImagem="/assets/img/logo-marvel-2048.png" textoAlternativo="Marvel logo" />
    </div>
  );
}

export default App;
