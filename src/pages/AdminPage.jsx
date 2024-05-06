import { useContext, useState } from "react";
import { MenuContext } from "../context/MenuContext";

import Header from "../components/Header";
import MenuListAdmin from "../components/MenuListAdmin";
import Footer from "../components/Footer";
import "./AdminPage.css";

export const AdminPage = () => {
  const { menuData, loading, error } = useContext(MenuContext);
  const [searchResult, setSearchResult] = useState([]);

  return (
    <div id="root">
      <Header setSearchResult={setSearchResult} />
      <main>
        {loading && <p>Cargando datos...</p>}
        {error && <p>{error}</p>}
        <section className="menu">
          {menuData && (
            <MenuListAdmin menuData={menuData} searchResults={searchResult} />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};
