import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function PostsList() {
  const [postsList, setPostsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let initiated = false;

  //gestisco chiamata API
  async function fetchData() {
    try {
      const response = await fetch(
        `http://localhost:3000/posts/?title=${searchTerm}`
      );
      const postsData = await response.json();
      setPostsList(postsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  //all'avvio dell'applicazione fetchiamo i dati
  useEffect(() => {
    if (initiated) {
      return;
    }
    fetchData();
    initiated = true;
  }, [searchTerm]);

  return (
    <>
      <div className="my-5 container mx-auto border-2 border-black">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul>
          {postsList
            .filter((post) => post.published)
            .map((post) => (
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
                  {/* {<h5 className="font-bold">Categoria: {post.tags[0]}</h5>} */}
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
                  <Link
                    className="font-bold border-2 border-black"
                    to={`/posts/${post.id}`}
                  >
                    Show
                  </Link>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default PostsList;
