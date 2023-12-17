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
    console.log(postsData);
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
        <div className="show-container container mx-auto text-white">
          <ul>
            <li key={postsList.id} className="flex-wrap  flex items-center">
              <div className="flex flex-col">
                <img
                  className="w-full h-full mb-2"
                  src={"http://localhost:3000/" + postsList.image}
                  alt=""
                />
                <span>
                  <span className="font-bold">TITOLO -</span> {postsList.title}
                </span>
                <span className="gap-1 flex">
                  <span className="font-bold">CATEGORIE -</span>
                  {postsList.tags && postsList.tags.length > 0 ? (
                    <ul className="flex gap-2">
                      {postsList.tags.map((tag) => (
                        <li key={tag.id}>{tag.name}</li>
                      ))}
                    </ul>
                  ) : (
                    "Nessuna tag"
                  )}
                </span>
                <span>
                  <span className="font-bold">DESCRIZIONE -</span>{" "}
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
