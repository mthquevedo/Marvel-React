import "./App.css";
import Header from "./Componentes/Header";
import Footer from "./Componentes/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Footer enderecoImagem="/assets/img/logo-marvel-2048.png" textoAlternativo="Marvel logo"/>
    </div>
  );
}

export default App;
