import { useState, useContext } from "react";
import "./MenuListAdmin.css";
import CreateFood from "./CreateFood";
import { MenuContext } from "../context/MenuContext";
import { Link, useNavigate } from "react-router-dom";
import { EditFoodPage } from "../pages/EditFoodPage";
const MenuList = ({ menuData, searchResults }) => {
  const env = import.meta.env;
  const navigate = useNavigate();
  const [orderBy, setOrderBy] = useState("");
  const [editingFood, setEditingFood] = useState(null);
  const { setMenuData, deleteFood } = useContext(MenuContext);
  if (!menuData || !menuData.food) {
    return <div>No hay datos de menú disponibles.</div>;
  }

  const baseUrl = `${env.VITE_BACKEND}/uploads`;

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

  const addFood = async (formData, json) => {
    try {
      const response = await fetch(`${env.VITE_BACKEND}/admin`, {
        method: "POST",
        headers: {
          Authorization: json,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (response.ok) {
        setMenuData((prevMenuData) => {
          const updatedMenuData = {
            ...prevMenuData,
            food: [...prevMenuData.food, data.data.food],
          };

          console.log("Menú actualizado:", updatedMenuData);
          return updatedMenuData;
        });
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      throw new Error("Error al crear la comida");
    }
  };

  const handleDeleteFood = async (foodId) => {
    try {
      await deleteFood(foodId);
    } catch (error) {
      console.error("Error al eliminar la comida:", error);
    }
  };

  const handleEditFood = (foodId) => {
    navigate(`/admin/${foodId}`);
  };

  const handleCancelEdit = () => {
    setEditingFood(null);
  };

  const handleSaveEdit = async (editedFood, json) => {
    try {
      const formData = new FormData();
      formData.append("food_name", editedFood.food_name);
      formData.append("description", editedFood.description);
      formData.append("price", editedFood.price);
      formData.append("featured", editedFood.featured);
      formData.append("sale_price", editedFood.sale_price);
      formData.append("diet_type", editedFood.diet_type);
      formData.append("allergens", editedFood.allergens);
      formData.append("ingredients", editedFood.ingredients);

      const response = await fetch(
        `${env.VITE_BACKEND}/menu/${editedFood.food_id}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: json,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMenuData((prevMenuData) => {
          const updatedMenuData = {
            ...prevMenuData,
            food: prevMenuData.food.map((item) =>
              item.food_id === editedFood.food_id ? data.data.food : item
            ),
          };
          return updatedMenuData;
        });

        setEditingFood(null);
      }
    } catch (error) {
      console.error("Error al editar la comida:", error);
    }
  };

  return (
    <div className="menu_main">
      <section className="menu_admin">
        <section className="show_menu">
          <div className="menu_text">
            <Link
              to="/menu"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h2>Platos</h2>
            </Link>
          </div>
          <div className="display_type_admin">
            <select value={orderBy} onChange={handleOrderByChange}>
              <option value="">Ordenar por:</option>
              <option value="nameAsc">Nombre A - Z</option>
              <option value="nameDesc">Nombre Z - A</option>
              <option value="priceAsc">Precio de más bajo a más alto</option>
              <option value="priceDesc">Precio de más alto a más bajo</option>
            </select>
          </div>
          <CreateFood addFood={addFood} />
          <ul className="menu-list">
            {orderedFoodList.map((item) => (
              <li key={item.food_id} className="food_cards">
                <Link
                  to={`/menu/${item.food_id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="food-card-container">
                    <div className="food_image_container">
                      {item?.photo_path_1 && (
                        <img
                          src={`${baseUrl}/${item.photo_path_1}`}
                          alt={item.food_name}
                          className="food-image"
                        />
                      )}
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
                  </div>
                  <div className="food_name_price_admin">
                    <p className="food_name_admin">{item.food_name}</p>

                    {item.featured === 1 && (
                      <p className="featured-text">Destacado</p>
                    )}

                    <p className="food_price">
                      {item.sale_price ? (
                        <>
                          <span className="discounted_price">
                            {item.sale_price}€
                          </span>
                          <span className="original_price">{item.price}€</span>
                        </>
                      ) : (
                        <span>{item.price}€</span>
                      )}
                    </p>
                  </div>
                </Link>
                <div className="edit_food">
                  <button
                    className="edit-button"
                    onClick={() => handleEditFood(item.food_id)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteFood(item.food_id)}
                  >
                    Eliminar
                  </button>
                </div>
                {editingFood && editingFood.food_id === item.food_id && (
                  <EditFoodPage
                    food={editingFood}
                    onCancel={handleCancelEdit}
                    onSave={handleSaveEdit}
                  />
                )}
              </li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
};

export default MenuList;
