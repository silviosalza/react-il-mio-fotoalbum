import { useEffect, useState } from "react";
import axios from "axios";

function CreateForm() {
  const initialFormData = {
    title: "",
    content: "",
    image: "",
    published: false,
    tags: [],
  };
  //variabili che popolo con la chiamata API
  const [postsList, setPostsList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [editingId, setEditingId] = useState("");
  let initiated = false;

  function handleReset() {
    setFormData(initialFormData);
    setEditingId("");
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      console.log("formData:", formData);
      const response = await axios.post("http://localhost:3000/posts", {
        ...formData,
        tags: formData.tags, // Adatta il nome del campo se necessario
      });

      setPostsList([...postsList, response.data]);
      setFormData(initialFormData);
    } catch (error) {
      console.error("Errore durante la gestione del form:", error);
      if (error.response) {
        // Stampa il messaggio di errore proveniente dal server
        console.error("Messaggio di errore dal server:", error.response.data);
      }
    }
  }

  function handleEdit(idToEdit) {
    const postToEdit = postsList.find((post) => post.id === idToEdit);
    setEditingId(idToEdit);
    console.log("Dati del post da editare:", postToEdit);

    if (postToEdit) {
      setFormData({
        title: postToEdit.title,
        content: postToEdit.content,
        image: postToEdit.image,
        tags: Array.isArray(postToEdit.tags)
          ? postToEdit.tags.map((tag) => tag.id)
          : [],
      });
    }
  }

  async function handleSave(idToEdit) {
    const requestData = {
      title: formData.title,
      content: formData.content,
      image: formData.image,
      tags: formData.tags,
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/posts/${idToEdit}`,
        requestData
      );
      const updatedPost = response.data;
      console.log("Post aggiornato:", updatedPost);
    } catch (error) {
      console.error("Errore durante l'aggiornamento del post:", error);
    } finally {
      // Resetta lo stato o esegui altre operazioni necessarie
      setEditingId(null);
      setFormData({
        title: "",
        content: "",
        image: "",
        tags: [],
      });
    }
  }
  async function deletePost(idToRemove) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/posts/${idToRemove}`
      );

      if (response.status === 200) {
        // Rimuovi il post dalla tua interfaccia utente o esegui altre azioni necessarie
        const newPosts = postsList.filter((post) => post.id !== idToRemove);
        setPostsList(newPosts);
      } else {
        console.error(
          "Errore nella cancellazione del post:",
          response.statusText
        );
        // Gestisci eventuali errori
      }
    } catch (error) {
      console.error(
        "Errore nella richiesta di eliminazione del post:",
        error.message
      );
      // Gestisci eventuali errori di rete o altri errori
    }
  }

  function handleField(e) {
    const { name, value, checked, type } = e.target;

    if (name === "tags") {
      const tagsId = parseInt(value, 10);
      let updatedCategories = [...formData.tags];

      if (type === "checkbox") {
        if (checked) {
          updatedCategories.push(tagsId);
        } else {
          updatedCategories = updatedCategories.filter(
            (tags) => tags !== tagsId
          );
        }
      }

      setFormData((current) => ({ ...current, [name]: updatedCategories }));
    } else {
      setFormData((current) => ({ ...current, [name]: value }));
    }
  }

  //gestisco chiamata API
  async function fetchData() {
    const postsData = await (await fetch("http://localhost:3000/posts")).json();
    setPostsList(postsData);
    const tagsData = await (await fetch("http://localhost:3000/tags")).json();
    setTagsList(tagsData);
  }
  //all'avvio dell'applicazione fetchiamo i dati
  useEffect(() => {
    if (initiated) {
      return;
    }
    fetchData();
    initiated = true;
  }, []);

  return (
    <>
      <main className="py-5 ">
        <div className="container mx-auto">
          <h1 className="font-bold">
            {editingId ? "Modifica Articolo" : "Crea Articolo"}
          </h1>
          <form
            action=""
            className="flex flex-col gap-2 w-1/2"
            onSubmit={handleFormSubmit}
          >
            <label htmlFor="post_title"></label>
            <input
              className="rounded border-2 border-black"
              type="text"
              name="title"
              placeholder="Inserisci il titolo dell'articolo"
              value={formData.title}
              onChange={handleField}
            />
            <label htmlFor="post_content"></label>
            <textarea
              rows="5"
              className="rounded border-2 border-black break-words"
              type="textarea"
              name="content"
              placeholder="Inserisci il contenuto"
              value={formData.content}
              onChange={handleField}
            ></textarea>
            <label htmlFor="post_image"></label>
            <input
              className="rounded border-2 border-black"
              type="text"
              name="image"
              placeholder="Inserisci URL dell'immagine copertina"
              value={formData.image}
              onChange={handleField}
            />

            <div className="flex flex-col gap-1">
              {tagsList.map((cat) => (
                <label key={cat.id} className="block font-bold">
                  <input
                    className="mr-3"
                    name="tags"
                    type="checkbox"
                    value={cat.id}
                    onChange={handleField}
                    checked={formData.tags && formData.tags.includes(cat.id)}
                  />
                  {cat.name}
                </label>
              ))}
            </div>

            <span className="font-bold" htmlFor="published">
              Pubblicato
            </span>
            <input
              name="published"
              type="checkbox"
              value={formData.published}
              onChange={handleField}
            />
            <button
              type="submit"
              className="bg-green-300 hover:bg-green-400 rounded border-2 border-black font-bold"
            >
              Crea
            </button>
          </form>
          <button
            className="w-20 font-bold border-2 hover:bg-green-300 hover:text-white border-green-300"
            onClick={() => handleSave(editingId)}
          >
            Salva
          </button>
          <button
            type="button"
            className="my-1 w-1/2 bg-red-300 hover:bg-red-400 rounded border-2 border-black font-bold"
            onClick={handleReset}
          >
            Annulla
          </button>
        </div>
        {/*------------------------------------------------------------------- */}
        <div className="my-5 container mx-auto border-2 border-black">
          <ul>
            {postsList.map((post) => (
              <li
                key={post.id}
                className="flex-wrap mb-4 p-4 border border-gray-300 flex items-center"
              >
                <div className="flex flex-col">
                  <h5 className="font-bold mb-2">
                    Titolo: {post.title} -{" "}
                    <span className={post.published ? "" : "hidden"}>
                      Pubblicato{" "}
                    </span>
                    <span className={post.published ? "hidden" : ""}>
                      Non Pubblicato{" "}
                    </span>
                    <span
                      className={`text-xl ${
                        post.published ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      &#x2022;
                    </span>
                  </h5>
                  {/* {
                    <h5 className="font-bold">
                      Categoria: {post.tags.name}
                    </h5>
                  } */}
                  <img
                    className="w-40 mb-2"
                    src={
                      post.image
                        ? post.image
                        : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                    }
                    alt=""
                  />
                  <h5 className="font-bold mb-2">Contenuto:</h5>
                  <span className="max-w-full text-center">{post.content}</span>
                </div>
                <div className="mt-4 flex flex-col items-end">
                  <button
                    className="w-20 disabled font-bold border-2 hover:bg-red-700 hover:text-white border-red-700 disabled:border-black disabled:bg-slate-400 mb-2"
                    onClick={() => deletePost(post.id)}
                    disabled={!!editingId}
                  >
                    Elimina
                  </button>
                  <button
                    className="w-20 font-bold border-2 hover:bg-yellow-400 hover:text-white border-yellow-400"
                    onClick={() => handleEdit(post.id)}
                  >
                    Modifica
                  </button>
                </div>
                <hr className="" />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export default CreateForm;
