import Footer from "../components/Footer";
import { PostsList } from "../components/PostsList";
import "../css/home.css";
export default function Blog() {
  return (
    <>
      <div className="homepage overflow-hidden">
        <PostsList></PostsList>
      </div>
      <Footer></Footer>
    </>
  );
}
