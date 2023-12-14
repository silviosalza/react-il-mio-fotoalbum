import { useState } from "react";
import Home from "./pages/Home.jsx";
import PostShow from "./pages/PostShow.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import Login from "./pages/Login";
// import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DefaultLayout from "./pages/DefaultLayout";
import PrivateRoutes from "./middlewares/PrivateRoutes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="posts" element={<Home />}></Route>
              <Route path="posts/:id" element={<PostShow />}></Route>
              <Route path="/login" element={<Login />}></Route>
              {/* <Route path="/register" element={<Register />}></Route> */}
            </Route>
            {/* Rotte private */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoutes>
                  <DefaultLayout />
                </PrivateRoutes>
              }
            >
              <Route index element={<Dashboard />}></Route>
              <Route path="user" element={<Dashboard />}></Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
