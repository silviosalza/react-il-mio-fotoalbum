import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fas);

const Footer = () => {
  const Instagram = () => {
    return <FontAwesomeIcon icon="fa-brands fa-square-instagram" />;
  };

  const Facebook = () => {
    return <FontAwesomeIcon icon={["fab", "fa-facebook-square"]} />;
  };

  const Pinterest = () => {
    return <FontAwesomeIcon icon={["fab", "fa-pinterest-square"]} />;
  };
  const initialFormData = {
    email: "",
    content: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Puoi gestire l'invio del messaggio qui
    console.log("Dati del form inviati:", formData);
    // Aggiungi qui la logica per l'invio del messaggio
    // Ad esempio, puoi utilizzare Axios per inviare i dati al tuo server
  };

  return (
    <footer className=" text-center mx-auto p-2 text-gray-600 mt-8">
      <div className="w-3/4 grid grid-cols-2 mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            placeholder="email@mail.it"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-2 mb-4 border rounded"
            required
          />
          <textarea
            id="content"
            name="content"
            placeholder="For collaboration and info..."
            value={formData.content}
            onChange={handleInputChange}
            className="p-2 mb-4 border rounded text-gray-600"
            rows="4"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-red-800 text-white px-4 py-2 rounded font-bold"
          >
            SEND
          </button>
        </form>
        <div className="flex items-center justify-center">
          <ul className="flex justify-center">
            <li>{Facebook}</li>
            <li>{Instagram}</li>
            <li>{Pinterest}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
