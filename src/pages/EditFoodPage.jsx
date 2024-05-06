import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import { MenuContext } from "../context/MenuContext";
import "./EditFoodPage.css";

export const EditFoodPage = () => {
  const env = import.meta.env;
  const { token } = useContext(AuthContext);
  const { updateFood, menuData, loading } = useContext(MenuContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodData, setFoodData] = useState({
    food_name: "",
    description: "",
    ingredients: "",
    allergens: "",
    price: 0,
    sale_price: "null",
    diet_type: "",
    featured: "0",
  });
  const [currentImages, setCurrentImages] = useState({
    photo_path_1: "",
    photo_path_2: "",
    photo_path_3: "",
  });

  const possibleAllergens = [
    "huevo",
    "leche",
    "gluten",
    "pescado",
    "molusco",
    "mostaza",
    "sesamo",
    "soja",
    "altramuces",
    "sulfitos",
    "apio",
    "frutos de cascara",
    "cacahuetes",
    "crustaceos",
  ];
  const handleImageChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];

    if (file instanceof File) {
      setCurrentImages((prevImages) => ({
        ...prevImages,
        [name]: file,
      }));
    }
  };

  useEffect(() => {
    if (!loading && menuData) {
      const selectedFood = menuData.food.find(
        (food) => food.food_id.toString() === id
      );
      if (selectedFood) {
        const featuredValue = selectedFood.featured == "1" ? "1" : "0";

        setFoodData({
          ...selectedFood,
          featured: featuredValue,
        });

        setCurrentImages({
          photo_path_1: selectedFood.photo_path_1,
          photo_path_2: selectedFood.photo_path_2,
          photo_path_3: selectedFood.photo_path_3,
        });
      }
    }
  }, [id, loading, menuData]);
  const handleAllergenChange = (allergen) => {
    // Toggle para agregar o quitar alérgenos de la lista seleccionada
    const updatedAllergens = foodData.allergens.includes(allergen)
      ? foodData.allergens
          .split(", ")
          .filter((item) => item !== allergen)
          .join(", ")
      : [...foodData.allergens.split(", "), allergen].join(", ");

    setFoodData({ ...foodData, allergens: updatedAllergens });
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox" && name === "allergen") {
      handleAllergenChange(value);
    } else {
      setFoodData({ ...foodData, [name]: value });
    }
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();

      Object.keys(currentImages).forEach((key) => {
        if (currentImages[key]) {
          formData.append(key, currentImages[key]);
        }
      });

      Object.keys(foodData).forEach((key) => {
        if (foodData[key] !== null) {
          formData.append(key, foodData[key]);
        }
      });

      const response = await fetch(`${env.VITE_BACKEND}/admin/${id}`, {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Error al actualizar la comida: ${response.statusText}`
        );
      }
      const updatedFood = await response.json();
      await updateFood(updatedFood.data.food);
      navigate("/admin");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  const renderImage = (key, index) => {
    const imageUrl =
      currentImages[key] instanceof File
        ? URL.createObjectURL(currentImages[key])
        : `${env.VITE_BACKEND}/uploads/${currentImages[key]}`;

    return <img src={imageUrl} alt={`Current ${index + 1}`} />;
  };

  return (
    <div>
      <Header />
      <main className="edit_page">
        <div className="edit_food_page">
          <h2>Editar plato</h2>

          <form>
            <div className="current-images">
              {Object.keys(currentImages).map((key, index) => (
                <div className="edit_image" key={index}>
                  {currentImages[key] ? (
                    <>
                      {renderImage(key, index)}
                      <label className="custom">
                        Modificar
                        <input
                          type="file"
                          name={key}
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                      </label>
                    </>
                  ) : (
                    <label className="custom">
                      Seleccionar
                      <input
                        type="file"
                        name={key}
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
            <div className="current_description">
              <label className="edit_food">
                Nombre{" "}
                <input
                  type="text"
                  name="food_name"
                  value={foodData.food_name}
                  onChange={handleInputChange}
                />
              </label>
              <div className="edit_price_sale_price">
                <label>
                  Precio{" "}
                  <input
                    type="number"
                    name="price"
                    value={foodData.price}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Oferta{" "}
                  <input
                    type="number"
                    name="sale_price"
                    value={
                      foodData.sale_price !== null ? foodData.sale_price : ""
                    }
                    onChange={handleInputChange}
                  />
                </label>
                <label className="edit_diet_type">
                  Tipo de Dieta{" "}
                  <select
                    id="diet_type"
                    name="diet_type"
                    value={foodData.diet_type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="normal">Normal</option>
                    <option value="vegano">Vegano</option>
                    <option value="vegetariano">Vegetariano</option>
                    <option value="celíaco">Celíaco</option>
                  </select>
                </label>
                <label>
                  Destacado
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={foodData.featured === "1"}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <label className="edit_food">
                Descripción{" "}
                <textarea
                  name="description"
                  value={foodData.description}
                  onChange={handleInputChange}
                />
              </label>
              <label className="edit_food">
                Ingredientes
                <textarea
                  name="ingredients"
                  value={foodData.ingredients}
                  onChange={handleInputChange}
                />
              </label>

              <div className="edit_allergens">
                <label>Alergenos</label>

                <div className="allergens">
                  {possibleAllergens.map((allergen) => (
                    <div key={allergen} className="allergen-checkbox">
                      <input
                        type="checkbox"
                        id={allergen}
                        name="allergen"
                        value={allergen}
                        checked={foodData.allergens.includes(allergen)}
                        onChange={handleInputChange}
                      />
                      <label htmlFor={allergen}>{allergen}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="save_changes">
              <button
                type="button"
                className="save_changes"
                onClick={handleSaveChanges}
              >
                Guardar cambios
              </button>
              <Link to="/admin">Cancelar edición</Link>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};
