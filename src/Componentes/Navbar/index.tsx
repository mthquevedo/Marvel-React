import "./Navbar.css";
import {Link, useMatch, useResolvedPath} from "react-router-dom"

interface NavbarProps {
  to: string
  children: string

}

function Navbar() {
  return (
    <nav className="nav">
      <img src="/assets/img/Marvel-Comics-Logo-1983.png"></img>

      <ul>
        <CustomLink to="/personagens">PERSONAGENS</CustomLink>
        <CustomLink to="/quadrinhos">QUADRINHOS</CustomLink>
        <CustomLink to="/criadores">CRIADORES</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }: NavbarProps) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({path: resolvedPath.pathname, end:true})
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>{children}</Link>
    </li>
  );
}

export default Navbar;
