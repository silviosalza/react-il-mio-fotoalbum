import { useEffect, useState } from "react";
import {
  useNavigate,
  useNavigation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Link } from "react-router-dom";

export function Post() {
  const { id } = useParams();
  const [postsList, setPostsList] = useState({});
  let initiated = false;

  //gestisco chiamata API
  async function fetchData() {
    const postsData = await (
      await fetch("http://localhost:3000/posts/" + id)
    ).json();
    setPostsList(postsData);
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
      {postsList.published && (
        <div className="show-container w-full h-full container mx-auto">
          <ul>
            <li
              key={postsList.id}
              className="flex-wrap mb-4 p-4 flex items-center"
            >
              <div className="flex flex-col">
                <img
                  className="w-full h-full mb-2"
                  src={
                    postsList.image
                      ? postsList.image
                      : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                  }
                  alt=""
                />
                <h5 className="font-bold mb-2">
                  Titolo: {postsList.title} -{" "}
                  <span className={postsList.published ? "" : "hidden"}>
                    Pubblicato{" "}
                  </span>
                  <span className={postsList.published ? "hidden" : ""}>
                    Non Pubblicato{" "}
                  </span>
                  <span
                    className={`text-xl ${
                      postsList.published ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    &#x2022;
                  </span>
                </h5>
                {/* {<h5 className="font-bold">Categoria: {postsList.tags}</h5>} */}
                <h5 className="font-bold mb-2">Contenuto:</h5>
                <span className="max-w-full text-center">
                  {postsList.content}
                </span>
              </div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Post;
