import "./Header.css";
import { Auth } from "./Auth";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useContext } from "react";
import { MenuContext } from "../context/MenuContext";

const Header = ({ setSearchResult }) => {
  const { menuData } = useContext(MenuContext);
  const location = useLocation();

  const handleSearch = (searchKeyword) => {
    if (!menuData) {
      // Manejar la situación en la que los datos aún no se han cargado
      console.warn("Los datos del menú aún no se han cargado.");
      return;
    }

    // Realiza la búsqueda en el contexto menuData
    const filteredData = menuData.food.filter((item) => {
      // Ajusta la lógica de búsqueda según tus necesidades
      return (
        item.food_name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.allergens.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.diet_type.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    });

    setSearchResult(filteredData);
  };

  return (
    <header>
      <Link to="/" className="header-link">
        <img src="/Logo.png" alt="logo" className="logo" />
      </Link>
      {location.pathname === "/menu" && <SearchBar onSearch={handleSearch} />}
      <nav className="login">
        <Auth />
      </nav>
    </header>
  );
};

export default Header;
