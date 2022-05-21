import styles from "../styles/Home.module.css";
import Feed from "../components/Feed";
import { useContext } from "react";
import DataContext from "./context/DataContext";

export default function Home() {
  const { posts } = useContext(DataContext);
  return (
    <main className="main">
      {posts.length ? <Feed posts={posts} /> : <p>No post to display</p>}
    </main>
  );
}
