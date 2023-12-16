import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DefaultLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const containerClass = isLoginPage ? "login" : "homepage";

  return (
    <>
      <div className={containerClass}>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}
