import { useContext, useState } from "react";
import { MenuContext } from "../context/MenuContext";

import Header from "../components/Header";
import MenuList from "../components/MenuList";
import Footer from "../components/Footer";
import "./MenuPage.css";

export const MenuPage = () => {
  const { menuData, loading, error } = useContext(MenuContext);
  const [searchResult, setSearchResult] = useState([]);

  return (
    <div>
      <Header setSearchResult={setSearchResult} />
      <main>
        {loading && <p>Cargando datos...</p>}
        {error && <p>{error}</p>}
        <section className="menu">
          {menuData && (
            <MenuList menuData={menuData} searchResults={searchResult} />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};
