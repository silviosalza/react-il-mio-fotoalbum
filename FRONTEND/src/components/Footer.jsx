import React, { useState } from "react";

const Footer = () => {
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
    <footer className=" w-3/4 text-center mx-auto p-2 bg-gray-200 text-white mt-8">
      <h2 className="text-xl font-bold mb-2">Collaboration</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="email" className="mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="p-2 mb-4 border rounded"
          required
        />

        <label htmlFor="content" className="mb-2">
          Messaggio:
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          className="p-2 mb-4 border rounded"
          rows="4"
          required
        ></textarea>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Invia Messaggio
        </button>
      </form>
    </footer>
  );
};

export default Footer;
