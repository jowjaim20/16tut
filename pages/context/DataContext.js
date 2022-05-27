import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "../api/posts";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([]);

  const router = useRouter();

  const addPost = async (data) => {
    try {
      const res = await api.post("./items", ...data);
      console.log(res);
      const newData = [...posts, res.data];

      setPosts(newData);
      setSearchResults(newData);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  useEffect(() => {
    // const fetchData = async () => {
    //   const res = await fetch("http://localhost:3500/items");
    //   const data = await res.json();
    //   console.log("fetch");
    //   setPosts(data);
    //   setSearchResults(data);
    // };
    // fetchData();
    const fetchData = async () => {
      try {
        const response = await api.get("/items");
        setPosts(response.data);
        setSearchResults(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchData();
  }, []);

  const handleEdit = async (id, data) => {
    try {
      const res = await api.put("/items/" + id, ...data);
      const newData = posts.map((post) => (+post.id === +id ? data[0] : post));
      console.log(newData);
      console.log(data[0]);
      setPosts(newData);
      setSearchResults(newData);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete("./items/" + id);
      const data = posts.filter((post) => post.id != id);

      setPosts(data);
      setSearchResults(data);
      router.push("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    const handleSearch = () => {
      const newSearch = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.body.toLowerCase().includes(search.toLowerCase())
      );

      setSearchResults(newSearch);
    };
    handleSearch();

    return () => {
      handleSearch();
    };
  }, [search]);

  return (
    <DataContext.Provider
      value={{
        posts,
        search,
        setSearch,
        searchResults,
        handleDelete,
        addPost,
        handleEdit,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
