import { PostsList } from "../components/PostsList";
import "../css/home.css";
export default function Blog() {
  return (
    <>
      <div className="homepage">
        <PostsList></PostsList>
      </div>
    </>
  );
}
