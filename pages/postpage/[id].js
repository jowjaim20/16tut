import { useContext, useState, useEffect } from "react";
import DataContext from "../context/DataContext";
import Link from "next/link";

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

export async function getServerSideProps({ params }) {
  const id = params.id;

  const res = await fetch("http://localhost:3500/items/" + id);
  const data = await res.json();

  return {
    props: {
      id,
      data,
    },
  };
}

const SinglePost = ({ id, data }) => {
  const { handleDelete } = useContext(DataContext);

  return (
    <main className="main shadow p-1">
      <article className=" p-2 space-y-3">
        <h2 className="font-bold uppercase">{data.title}</h2>
        <p className="text-gray-300">{data.datetime}</p>
        <p>{data.body}</p>
        <button
          onClick={() => handleDelete(id)}
          className="px-4 py-1 hover:bg-red-300 text-white shadow-lg bg-red-500 rounded "
        >
          Delete Post
        </button>
        <Link href={"/postpage/edit/" + id}>
          <a className="px-4 py-1 hover:bg-blue-300 text-white shadow-lg bg-blue-500 rounded ">
            Edit
          </a>
        </Link>
      </article>
    </main>
  );
};

export default SinglePost;
