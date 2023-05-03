import "./Navbar.css";

function Navbar() {
  return (
    <nav className="nav">
      <img src="/assets/img/Marvel-Comics-Logo-1983.png"></img>

      <ul>
        <li className="ativa">
          <a href="/personagens" className="nav-title">
            {" "}
            PERSONAGENS
          </a>
        </li>
        <li>
          <a href="/quadrinhos" className="nav-title">
            {" "}
            QUADRINHOS
          </a>
        </li>
        <li>
          <a href="/criadores" className="nav-title">
            {" "}
            CRIADORES
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
