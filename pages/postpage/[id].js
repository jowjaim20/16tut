import { useContext, useState, useEffect } from "react";
import DataContext from "../context/DataContext";

// export const getStaticPaths = async () => {
//   const res = await fetch("http://localhost:3500/items");
//   const data = await res.json();

//   const paths = data.map((data) => {
//     return {
//       params: { id: data.id.toString() },
//     };
//   });
//   return {
//     paths,
//     fallback: false,
//   };
// };
// export const getStaticProps = async ({ params }) => {
//   const id = params.id;
//   const res = await fetch("http://localhost:3500/items/" + id);
//   const data = await res.json();

//   return {
//     props: { post: data },
//   };
// };

export function getServerSideProps({ params }) {
  const id = params.id;
  console.log(`${params} this id`);
  //   const res = await fetch("http://localhost:3500/items/" + id);
  //   const data = await res.json();

  return {
    props: {
      id,
      fallback: false,
    },
  };
}

const SinglePost = ({ id }) => {
  const { searchResults, handleDelete } = useContext(DataContext);
  const [post] = useState([
    searchResults.find((post) => post.id.toString() === id),
  ]);
  console.log(post);

  return (
    <main className="main shadow p-1">
      <article className=" p-2 space-y-3">
        <h2 className="font-bold uppercase">{post[0].title}</h2>
        <p className="text-gray-300">{post[0].datetime}</p>
        <p>{post[0].body}</p>
        <button
          onClick={() => handleDelete(post[0].id)}
          className="text-white shadow-lg bg-red-500 rounded px-4 py-1"
        >
          Delete Post
        </button>
      </article>
    </main>
  );
};

export default SinglePost;
