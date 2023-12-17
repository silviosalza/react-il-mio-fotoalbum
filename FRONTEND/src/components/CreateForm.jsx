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
    setFormData({ ...initialFormData });
    setEditingId("");
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      console.log("formData:", formData);
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("published", formData.published);
      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }
      formDataToSend.append("tags", JSON.stringify(formData.tags));
      console.log(formData.tags);

      try {
        const response = await axios.post(
          "http://localhost:3000/posts",
          formDataToSend
        );
        console.log(formDataToSend);

        // Aggiorna lo stato dei post solo dopo una risposta positiva dal server
        setPostsList([...postsList, response.data]);
        setFormData(initialFormData);
      } catch (error) {
        console.error(error.response);
      }
    } catch (error) {
      console.error("Errore durante la gestione del form:", error);
      if (error.response) {
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
    console.log(name, value, checked, type);

    // if (name === "published") {
    //   if (checked) {
    //     setFormData((current) => ({ ...current, [name]: true }));
    //   } else {
    //     setFormData((current) => ({ ...current, [name]: false }));
    //   }
    // }

    if (name === "published") {
      if (checked) {
        setFormData((current) => {
          return {
            ...current,
            [name]: true,
          };
        });
      } else {
        setFormData((current) => {
          return {
            ...current,
            [name]: false,
          };
        });
      }
    }

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
    } else if (name === "image") {
      setFormData((current) => ({ ...current, image: e.target.files[0] }));
    } else {
      setFormData((current) => ({
        ...current,
        [name]: e.target.type === "checkbox" ? checked : value,
      }));
    }
  }

  //gestisco chiamata API
  async function fetchData() {
    const postsData = await (await fetch("http://localhost:3000/posts")).json();
    setPostsList(postsData);
    const tagsData = await (await fetch("http://localhost:3000/tags")).json();
    setTagsList(tagsData);
  }

  function getImgUrl(post) {
    if (!post.image) {
      return "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";
    }

    if (post.image.startsWith("http") || post.image.startsWith("data:")) {
      return post.image;
    }

    return "http://localhost:3000/" + post.image;
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
      <main className="py-5 bg-white ">
        <div className="container mx-auto">
          <h1 className="font-bold">
            {editingId ? "Modifica Articolo" : "Crea Articolo"}
          </h1>
          <form
            action="http://localhost:3000/posts"
            method="post"
            encType="multipart/form-data"
            className="flex flex-col gap-2 w-1/2"
            onSubmit={handleFormSubmit}
          >
            <label htmlFor="post_title">Titolo:</label>
            <input
              className="rounded border-2 border-black"
              type="text"
              name="title"
              placeholder="Inserisci il titolo dell'articolo"
              value={formData.title}
              onChange={handleField}
            />
            <label htmlFor="post_content">Contenuto:</label>
            <textarea
              rows="5"
              className="rounded border-2 border-black break-words"
              type="textarea"
              name="content"
              placeholder="Inserisci il contenuto"
              value={formData.content}
              onChange={handleField}
            ></textarea>
            <label htmlFor="post_image">Immagine di copertina:</label>
            <input
              className="rounded border-2 border-black"
              type="file"
              accept=".jpg, .jpeg, .png"
              name="image"
              onChange={(e) =>
                setFormData((current) => ({
                  ...current,
                  image: e.target.files[0],
                }))
              }
            />
            <div className="flex gap-5">
              {tagsList.map((cat) => (
                <label key={cat.id} className="block font-bold">
                  <input
                    className=""
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
            <label
              className="flex items-center gap-1 font-bold"
              htmlFor="published"
            >
              Pubblicato
              <input
                name="published"
                type="checkbox"
                value={formData.published}
                checked={formData.published}
                onChange={handleField}
              />
            </label>
            <div className="flex flex-col gap-1">
              <button
                type="submit"
                className="bg-green-300 hover:bg-green-400 rounded border-2 border-black font-bold"
              >
                {editingId ? "Modifica" : "Crea"}
              </button>
              <div className="flex flex-col gap-1">
                <button
                  className="bg-yellow-300 hover:bg-yellow-500 rounded border-2 border-black font-bold"
                  onClick={() => handleSave(editingId)}
                >
                  Salva
                </button>
                <button
                  type="button"
                  className="bg-red-300 hover:bg-red-400 rounded border-2 border-black font-bold"
                  onClick={handleReset}
                >
                  Annulla
                </button>
              </div>
            </div>
          </form>
        </div>

        {/*------------------------------------------------------------------- */}
        <div className="overflow-y-scroll my-5 container mx-auto border-2 border-black">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-2 border border-gray-300">Titolo</th>
                <th className="p-2 border border-gray-300">Immagine</th>
                <th className="p-2 border border-gray-300">Contenuto</th>
                <th className="p-2 border border-gray-300">Categorie</th>
                <th className="p-2 border border-gray-300">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {postsList.map((post) => (
                <tr key={post.id} className="border-t border-gray-300">
                  <td className="p-2 border border-gray-300">
                    <h5 className="font-bold">
                      {post.title} -{" "}
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
                  </td>
                  <td className="p-2 border border-gray-300">
                    <img className="max-h-20" src={getImgUrl(post)} alt="" />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <span className="max-w-full text-center">
                      {post.content}
                    </span>
                  </td>
                  <td className="p-2 border border-gray-300">
                    {post.tags && post.tags.length > 0 ? (
                      <ul>
                        {post.tags.map((tag) => (
                          <li key={tag.id}>{tag.name}</li>
                        ))}
                      </ul>
                    ) : (
                      "Nessuna tag"
                    )}
                  </td>
                  <td className="p-2 border border-gray-300">
                    <div className="flex flex-col items-end">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default CreateForm;
