import Post from "./Post";
import { useContext } from "react";
import DataContext from "../pages/context/DataContext";

const Feed = () => {
  const { searchResults } = useContext(DataContext);
  console.log(searchResults);
  return (
    <article className="h-full p-2 flex flex-col items-center text-gray-900 font-bold gap-2">
      {searchResults.length > 0 ? (
        searchResults.map((post) => <Post key={post.id} {...post} />)
      ) : (
        <div className="main">NO POST TO SHOW</div>
      )}
    </article>
  );
};

export default Feed;
