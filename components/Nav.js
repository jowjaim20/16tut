import Link from "next/link";
import { useContext } from "react";
import DataContext from "../pages/context/DataContext";

const Nav = () => {
  const { search, setSearch } = useContext(DataContext);
  return (
    <nav className="flex py-3 px-2 text-gray-900 font-bold bg-gray-800 ">
      <form
        className="flex gap-6"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="search" className="hidden">
          search post
        </label>
        <input
          id="search"
          type="text"
          placeholder="search post"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
        <ul className="flex gap-3 text-white">
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/postpage">
              <a>Post</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
        </ul>
      </form>
    </nav>
  );
};

export default Nav;
