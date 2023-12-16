import { NavLink, resolvePath } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useContext } from "react";
import logo from "../assets/logo-victor-morante.svg";
import "../css/navbar.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);

function NavbarLink({ href, children }) {
  return (
    <NavLink
      to={href}
      className="block py-3 px-4 min-w-[80px] text-center rounded-md transition-all duration-300 hover:bg-gray-800"
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  const MyComponent = () => {
    return <FontAwesomeIcon icon={["fas", "user"]} />;
  };
  const { handleLogout } = useAuth();

  return (
    <header className="nav top-0 bg-black/20 backdrop-blur-sm shadow-lg ">
      <nav className="py-2">
        <div className="container px-4 mx-auto flex items-center justify-between">
          <ul className="w-full flex justify-between">
            <li>
              <NavbarLink href="/">
                <img className="w-40" src={logo} alt="" />
              </NavbarLink>
            </li>
            <li className="flex items-center text-2xl text-white">
              <NavbarLink href="/login">{MyComponent}</NavbarLink>
            </li>
            {/* <li>
                <NavbarLink onClick={handleLogout}>Logout</NavbarLink>
              </li> */}
          </ul>
        </div>
      </nav>
    </header>
  );
}
