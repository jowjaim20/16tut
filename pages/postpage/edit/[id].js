import { useState, useEffect, useContext, useReducer } from "react";
import DataContext from "../../context/DataContext";
import { format } from "date-fns";
import { useRouter } from "next/router";

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
const reducer = (state, action) => {
  switch (action.type) {
    case "editTitle":
      return {
        ...state,
        editTitle: action.payload,
      };
    case "date":
      return {
        ...state,
        date: action.payload,
      };
    case "editBody":
      return {
        ...state,
        editBody: action.payload,
      };
    case "newpost":
      return {
        ...state,
        newPost: action.payload,
      };

    default:
      throw new Error();
  }
};

const PostPage = ({ id, data }) => {
  const router = useRouter();
  const { handleEdit } = useContext(DataContext);

  const [state, dispatch] = useReducer(reducer, {
    editTitle: data.title,
    date: data.datetime,
    editBody: data.body,
    newPost: [
      {
        id: id,
        title: "",
        datetime: "",
        body: "",
      },
    ],
  });

  useEffect(() => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    dispatch({
      type: "newpost",
      payload: [
        {
          id: id,
          title: state.editTitle,
          datetime: datetime,
          body: state.editBody,
        },
      ],
    });
  }, [state.editTitle, state.editBody, id]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleEdit(id, state.newPost);
        router.push("/");
      }}
      className="main text-gray-900 font-bold flex flex-col gap-4"
    >
      <div>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          placeholder="text here"
          value={state.editTitle}
          onChange={(e) =>
            dispatch({ type: "editTitle", payload: e.target.value })
          }
          required
        />
      </div>

      <div className="flex gap-1">
        <div>Date: </div>
        <div>{state.date}</div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="body">Body</label>
        <textarea
          className="outline"
          name="body"
          id="body"
          cols="30"
          rows="10"
          placeholder="enter text here"
          value={state.editBody}
          onChange={(e) => {
            dispatch({ type: "editBody", payload: e.target.value });
          }}
          required
        ></textarea>
      </div>
      <div className="self-center">
        <button
          type="submit"
          href={`/postpage/` + id}
          className="shadow shadow-green-500 hover:shadow-green-300 text-white bg-green-900 hover:bg-green-800 active:translate-y-1 rounded px-5 py-1"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default PostPage;
