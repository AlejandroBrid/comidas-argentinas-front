import { useContext, useState } from "react";
import "./MenuList.css";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // Importa el contexto del carrito

const MenuList = ({ menuData, searchResults }) => {
  const env = import.meta.env;
  const [displayType, setDisplayType] = useState("grid");
  const [quantity, setQuantity] = useState({});
  const [orderBy, setOrderBy] = useState("");
  const { addToCart } = useContext(CartContext);

  if (!menuData || !menuData.food) {
    return <div>No hay datos de menú disponibles.</div>;
  }

  const baseUrl = `${env.VITE_BACKEND}/uploads`;

  const setDisplayGrid = () => {
    setDisplayType("grid");
    setQuantity({});
  };

  const setDisplayFullWidth = () => {
    setDisplayType("fullWidth");
    setQuantity({});
  };

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  const orderedFood = () => {
    const dataToSort = searchResults.length > 0 ? searchResults : menuData.food;

    switch (orderBy) {
      case "nameAsc":
        return dataToSort
          .slice()
          .sort((a, b) => a.food_name.localeCompare(b.food_name));
      case "nameDesc":
        return dataToSort
          .slice()
          .sort((a, b) => b.food_name.localeCompare(a.food_name));
      case "priceAsc":
        return dataToSort
          .slice()
          .sort(
            (a, b) => (a.sale_price || a.price) - (b.sale_price || b.price)
          );
      case "priceDesc":
        return dataToSort
          .slice()
          .sort(
            (a, b) => (b.sale_price || b.price) - (a.sale_price || a.price)
          );
      default:
        return dataToSort;
    }
  };

  const orderedFoodList = orderedFood();

  return (
    <div className="menu_main">
      <section className="menu_main">
        <div className="menu_bar">
          <h2 className="memu_bar_text">Destacados</h2>
          <div className="menu_bar_foods">
            {menuData.food
              .filter((item) => item.featured === 1)

              .map((featuredItem) => (
                <div key={featuredItem.food_id} className="menu_bar_card">
                  <Link
                    to={`/menu/${featuredItem.food_id}`}
                    style={{ textDecoration: "none", display: "flex" }}
                  >
                    <div className="menu_bar_image_container">
                      <img
                        className="menu_bar_img"
                        src={`${baseUrl}/${featuredItem.photo_path_1}`}
                        alt={featuredItem.food_name}
                      />
                    </div>
                    <div className="menu_bar_name_price">
                      <p className="menu_bar_food_name">
                        {featuredItem.food_name}
                      </p>
                      <p className="food_price">{featuredItem.price}€</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
          <h2 className="memu_bar_text">Ofertas</h2>
          <div className="menu_bar_food">
            {menuData.food
              .filter((item) => item.sale_price !== null)

              .map((offerItem) => (
                <div key={offerItem.food_id} className="menu_bar_card">
                  <Link
                    to={`/menu/${offerItem.food_id}`}
                    style={{ textDecoration: "none", display: "flex" }}
                  >
                    <div className="menu_bar_image_container">
                      <img
                        className="menu_bar_img"
                        src={`${baseUrl}/${offerItem.photo_path_1}`}
                        alt={offerItem.food_name}
                      />
                    </div>
                    <div className="menu_bar_name_price">
                      <p className="menu_bar_food_name">
                        {offerItem.food_name}
                      </p>
                      <p className="food_price">
                        <span>{offerItem.sale_price}€</span>
                        <span className="original_price">
                          {offerItem.price}€
                        </span>
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <section className="show_menu">
          <div className="menu_text">
            <h2>Platos</h2>
            <p>
              Más de 50 platos caseros, sin conservantes ni colorantes añadidos,
              para todos los gustos e intolerancias alimentarias.
            </p>
          </div>
          <div className="display_type">
            <div>
              <button
                className={`grid_button ${
                  displayType === "grid" ? "active" : ""
                }`}
                onClick={setDisplayGrid}
                disabled={displayType === "grid"}
              >
                <i className="fa fa-th"></i>
              </button>
              <button
                className={`grid_button ${
                  displayType === "fullWidth" ? "active" : ""
                }`}
                onClick={setDisplayFullWidth}
                disabled={displayType === "fullWidth"}
              >
                <i className="fa fa-th-list"></i>
              </button>
            </div>
            <select value={orderBy} onChange={handleOrderByChange}>
              <option value="">Ordenar por:</option>
              <option value="nameAsc">Nombre A - Z</option>
              <option value="nameDesc">Nombre Z - A</option>
              <option value="priceAsc">Precio de más bajo a más alto</option>
              <option value="priceDesc">Precio de más alto a más bajo</option>
            </select>
          </div>
          <ul
            className={`menu-list ${
              displayType === "fullWidth" ? "full-width" : ""
            }`}
          >
            {orderedFoodList.map((item) => (
              <li key={item.food_id} className="food_cards">
                <div className="food_card_container">
                  <Link
                    to={`/menu/${item.food_id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="food_image_container_menu">
                      <img
                        src={`${baseUrl}/${item.photo_path_1}`}
                        alt={item.food_name}
                        className="food_image_menu"
                      />
                      {(item.diet_type === "vegano" ||
                        item.diet_type === "vegetariano" ||
                        item.diet_type === "celíaco") && (
                        <img
                          className="diet-icon"
                          src={
                            item.diet_type === "vegano"
                              ? "/vegano.png"
                              : item.diet_type === "vegetariano"
                              ? "/vegetarian.png"
                              : "/singluten.png"
                          }
                          alt={
                            item.diet_type === "vegano"
                              ? "Vegano"
                              : item.diet_type === "vegetariano"
                              ? "Vegetariano"
                              : "Celíaco"
                          }
                        />
                      )}
                    </div>
                  </Link>
                  <Link
                    to={`/menu/${item.food_id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="food_name_price">
                      <p className="food_name">{item.food_name}</p>
                      {displayType === "fullWidth" && (
                        <p className="food_description">{item.description}</p>
                      )}
                    </div>
                  </Link>
                  <div className="add_to_cart">
                    <Link
                      to={`/menu/${item.food_id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="price">
                        <p className="food_price">
                          {item.sale_price ? (
                            <>
                              <span className="discounted_price">
                                {item.sale_price}€
                              </span>
                              <span className="original_price">
                                {item.price}€
                              </span>
                            </>
                          ) : (
                            <span>{item.price}€</span>
                          )}
                        </p>
                      </div>
                    </Link>
                    <div className="add_to_cart_buttons">
                      <input
                        type="number"
                        className="amount-input"
                        value={quantity[item.food_id] || 0}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          setQuantity({
                            ...quantity,
                            [item.food_id]: isNaN(value)
                              ? 1
                              : Math.max(1, value),
                          });
                        }}
                      />
                      <button
                        className="add_to_cart"
                        onClick={() =>
                          addToCart(item, quantity[item.food_id] || 1)
                        }
                      >
                        <i
                          className="fa fa-shopping-bag"
                          aria-hidden="true"
                        ></i>
                        Añadir
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
};

export default MenuList;
