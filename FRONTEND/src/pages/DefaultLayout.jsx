import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DefaultLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isShowPage = location.pathname.startsWith("/posts/");
  const isHomePage = location.pathname === "/";
  let containerClass = "";
  if (isLoginPage) {
    containerClass = "login";
  } else if (isShowPage) {
    containerClass = "show";
  } else if (isHomePage) {
    containerClass = "homepage";
  }

  return (
    <>
      <div className={containerClass}>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}
