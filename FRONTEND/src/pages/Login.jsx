import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleInputChange } from "../utils/handleInputChange";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const navigation = useNavigate();
  const { handleLoginOrRegistration } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function onLoginSubmit(e) {
    e.preventDefault();

    //chiamata API che invita dati login al server e riceve risposta
    const resp = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: "abc123",
          user: {
            name: "Silvio Filippo",
            surname: "Salza",
            email: formData.email,
          },
        });
      }, 2000);
    });

    //salvo i dati nell'authcontext

    handleLoginOrRegistration(resp);
    navigation("/dashboard");
  }
  return (
    <>
      <div className="container mx-auto px-4">
        {/* form di login */}
        <div className="login-container flex justify-center items-center">
          <div className="w-full max-w-md">
            <form
              className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
              onSubmit={onLoginSubmit}
            >
              {/* Email */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange(e, "email", setFormData)}
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3
                leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange(e, "password", setFormData)
                  }
                />
                {/* <p className="text-xs italic">Please choose a password.</p> */}
              </div>

              {/* Pulsanti */}
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Accedi
                </button>
                {/* <Link
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  to="/register"
                >
                  Crea un account
                </Link> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
