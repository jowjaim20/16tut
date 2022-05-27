import Header from "./Header";
import Footer from "./Footer";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col m-auto max-w-500 h-screen">
      <Header />
      <Nav />

      {children}

      <Footer />
    </div>
  );
};

export default Layout;
