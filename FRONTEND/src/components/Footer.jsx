import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagramSquare,
  faFacebookSquare,
  faPinterestSquare,
} from "@fortawesome/free-brands-svg-icons";

library.add(fas);

const Footer = () => {
  const Instagram = () => {
    return <FontAwesomeIcon icon={faInstagramSquare} />;
  };

  const Facebook = () => {
    return <FontAwesomeIcon icon={faFacebookSquare} />;
  };

  const Pinterest = () => {
    return <FontAwesomeIcon icon={faPinterestSquare} />;
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
    <footer className="text-center mx-auto p-2 text-gray-600 mt-8">
      <div className="w-3/4 grid grid-cols-2 mx-auto ">
        <form id="form" className="topBefore" onSubmit={handleSubmit}>
          <input
            className="homepage_input"
            id="email"
            type="text"
            placeholder="E-MAIL"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <textarea
            id="message"
            type="text"
            placeholder="MESSAGE"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
          <input id="submit" type="submit" value="GO!" />
        </form>

        <div className="flex items-center justify-center">
          <ul className="icon flex justify-center">
            <li className="mr-4 text-blue-500">
              <Facebook />
            </li>
            <li className="mr-4 instagram">
              <Instagram />
            </li>
            <li className="text-red-600">
              <Pinterest />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
