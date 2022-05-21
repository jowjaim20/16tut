import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const handleDelete = (id) => {
    const data = posts.filter((post) => post.id !== id);
    setPosts(data);
    setSearchResults(data);
    router.push("/");
  };

  useEffect(() => {
    const handleSearch = () => {
      const newSearch = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );

      setSearchResults(newSearch);
    };
    handleSearch();
    console.log("handleSearch");
    return () => {
      handleSearch();
    };
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3500/items");
      const data = await res.json();
      console.log("fetch");
      setPosts(data);
      setSearchResults(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3500/items");
      const data = await res.json();

      setPosts(data);
      setSearchResults(data);
    };
    fetchData();
  }, []);
  return (
    <DataContext.Provider
      value={{
        posts,
        search,
        setSearch,
        searchResults,
        handleDelete,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
