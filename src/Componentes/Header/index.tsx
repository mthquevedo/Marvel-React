import Navbar from "../Navbar";
import "./Header.css";
import Criadores from "../Body/Criadores";
import Personagens from "../Body/Personagens";
import Quadrinhos from "../Body/Quadrinhos";
import { Route, Routes } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Navbar />  
      <Routes>
        <Route path="/personagens" element={<Personagens />} />
        <Route path="/quadrinhos" element={<Quadrinhos />} />
        <Route path="/criadores" element={<Criadores/>} />
      </Routes>
    </header>
  );
}

export default Header;
