import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleInputChange = (e) => {
    const newSearchKeyword = e.target.value;
    setSearchKeyword(newSearchKeyword);

    // Llamar a la función onSearch con la nueva palabra clave de búsqueda
    onSearch(newSearchKeyword);
  };

  const handleSearch = () => {
    // Llamar a la función onSearch con la palabra clave de búsqueda actual
    onSearch(searchKeyword);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="search-bar">
      <div className="search_bar_container">
        <input
          type="text"
          className="search-input"
          placeholder="Busca en nuestro catálogo"
          onChange={handleInputChange}
          value={searchKeyword}
          onKeyPress={handleKeyPress}
        />
        <button className="search-button" onClick={handleSearch}>
          <i className="fa fa-search"></i>
        </button>
      </div>
    </section>
  );
};

export default SearchBar;
