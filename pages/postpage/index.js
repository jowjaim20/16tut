import { useState, useEffect, useContext } from "react";
import DataContext from "../context/DataContext";
import { format } from "date-fns";

const PostPage = () => {
  const { addPost } = useContext(DataContext);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [body, setBody] = useState("");
  const [newPost, setNewPost] = useState([]);

  useEffect(() => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newId = new Date();
    const data = [
      {
        id: newId.getTime(),
        title: title,
        datetime: datetime,
        body: body,
      },
    ];
    setDate(datetime);
    setNewPost(data);
  }, [title, body]);
  const clearField = () => {
    setTitle("");
    setBody("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addPost(newPost);
        clearField();
      }}
      className="main text-gray-900 font-bold flex flex-col gap-4"
    >
      <div>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          placeholder="text here"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />
      </div>

      <div className="flex gap-1">
        <div>Date: </div>
        <div>{date}</div>
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
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          required
        ></textarea>
      </div>
      <div className="self-center">
        <button
          className="shadow shadow-green-500 hover:shadow-green-300 text-white bg-green-900 hover:bg-green-800 active:translate-y-1 rounded px-5 py-1"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default PostPage;
