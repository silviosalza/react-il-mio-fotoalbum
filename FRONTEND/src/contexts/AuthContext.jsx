import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [initComplete, setInitComplete] = useState(false);
  const navigate = useNavigate();

  /**
   * Dopo che l'utente si è loggato,
   * devo salvare i suoi dati nella variabile user
   *
   * Devo anche salvare il JWT ricevuto dal server
   * @param {{token:string, user: {name:string, surname:string, email:string}}} resp
   */
  function handleLoginOrRegistration(resp) {
    setUser(resp.user);
    setIsLogged(true);

    storeToken(resp.token);
  }

  function handleLogout() {
    setUser(null);
    storeToken(null);

    localStorage.removeItem("token");

    setIsLogged(false);

    // prima finisci di fare quello che stai facendo, come update stati e rendering,
    // dopo eseugui la navigazione
    setTimeout(() => {
      navigate("/login");
    });
  }

  function storeToken(token) {
    setToken(token);
    localStorage.setItem("token", token);
  }

  /**
   * Recupera l'utente attuale tramite una chiamata API
   */
  async function fetchLoggedUser() {
    const user = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "Anna",
          surname: "Bianchi",
          email: "anna.bianchi@gmail.com",
        });
      });
    });

    setUser(user);
    setIsLogged(true);
  }

  async function initializeData() {
    const token = localStorage.getItem("token");

    // Se c'è un token memorizzato nel localStorage,
    // lo salvo internamente e lo uso per recuperare l'utente a cui appartiene
    if (token) {
      setToken(token);
      await fetchLoggedUser();
    }

    console.log("render AuthContext useEffect");

    setInitComplete(true);
  }

  useEffect(() => {
    initializeData();
  }, []);

  console.log("render AuthContext");

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged,
        initComplete,
        handleLoginOrRegistration,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
