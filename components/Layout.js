import Header from "./Header";
import Footer from "./Footer";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Nav />

      {children}

      <Footer />
    </div>
  );
};

export default Layout;
