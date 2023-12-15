import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DefaultLayout() {
  return (
    <>
      <div className="overflow-hidden">
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
    </>
  );
}
