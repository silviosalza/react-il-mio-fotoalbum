import { NavLink, resolvePath } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useContext } from "react";
import logo from "../assets/logo-victor-morante.svg";

function NavbarLink({ href, children }) {
  return (
    <NavLink
      to={href}
      className="block py-3 px-4 min-w-[80px] text-center rounded-md transition-all duration-300 hover:bg-gray-100 hover:text-primary"
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  const { handleLogout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-sm shadow-lg ">
      <nav className="py-2">
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div>
            <ul className="flex">
              <li>
                <NavbarLink href="/">
                  <img className="w-40" src={logo} alt="" />
                </NavbarLink>
              </li>
              <li>
                <NavbarLink href="/login">Login</NavbarLink>
              </li>
              {/* <li>
                <NavbarLink onClick={handleLogout}>Logout</NavbarLink>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
