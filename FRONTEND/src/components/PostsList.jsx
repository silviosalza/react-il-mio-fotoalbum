import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/postList.css";
import Footer from "../components/Footer";

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
      <div className="posts-container container w-3/4 mx-auto">
        <input
          className="font-bold w-full h-12 homepage_input bg-white bg-opacity-50 placeholder-white::placeholder"
          type="text"
          placeholder="CHOOSE A NATION: JAPAN - KOREA - VIETNAM"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="postList overflow-y-scroll border-8 border-white bg-white">
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {postsList
              .filter((post) => post.published)
              .map((post) => (
                <li key={post.id} className="flex items-center justify-center">
                  <div className="flex flex-col">
                    <Link className="font-bold" to={`/posts/${post.id}`}>
                      <img
                        className="w-full h-48 object-cover mb-2 hover:brightness-75"
                        src={"http://localhost:3000/" + post.image}
                        alt=""
                      />
                    </Link>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default PostsList;
