import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import "./CreateFood.css";

const CreateFood = ({ addFood }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [foodData, setFoodData] = useState({
    food_name: "",
    description: "",
    ingredients: "",
    price: "",
    featured: "",
    sale_price: "",
    diet_type: "",
    allergens: "",
    photo_path_1: null,
    photo_path_2: null,
    photo_path_3: null,
  });

  // Lista de allergens posibles
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
    "frutosdecascara",
    "cacahuetes",
    "crustaceos",
  ];

  // Estado para almacenar los allergens seleccionados
  const [selectedAllergens, setSelectedAllergens] = useState([]);

  const { token } = useContext(AuthContext);

  const toggleForm = () => {
    setFoodData({
      food_name: "",
      description: "",
      ingredients: "",
      price: "",
      featured: "0",
      sale_price: "null",
      diet_type: "normal",
      allergens: "null",
      photo_path_1: null,
      photo_path_2: null,
      photo_path_3: null,
    });

    setSelectedAllergens([]);
    setError("");
    setSending(false);
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    // Si es un campo de tipo checkbox, maneja la lógica de featured
    if (type === "checkbox") {
      setFoodData({ ...foodData, [name]: e.target.checked ? 1 : "" });
    } else {
      setFoodData({ ...foodData, [name]: value });
    }
  };
  const showPreview = (file, previewId) => {
    const reader = new FileReader();

    // Maneja el evento load del lector de archivos
    reader.onload = (e) => {
      const previewElement = document.getElementById(previewId);
      previewElement.src = e.target.result; // Asigna la URL de la previsualización
    };

    // Lee el archivo como una URL de datos
    reader.readAsDataURL(file);
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const inputId = e.target.id; // Obtiene el id del input de archivo
    const file = e.target.files[0]; // Obtiene el archivo seleccionado
    console.log("Nombre del archivo:", name);
    console.log("Archivo seleccionado:", files[0]);
    setFoodData({ ...foodData, [name]: files[0] });
    switch (inputId) {
      case "photo_path_1":
        // Lógica para mostrar la previsualización de la foto 1
        showPreview(file, "preview_1");
        break;
      case "photo_path_2":
        // Lógica para mostrar la previsualización de la foto 2
        showPreview(file, "preview_2");
        break;
      case "photo_path_3":
        // Lógica para mostrar la previsualización de la foto 3
        showPreview(file, "preview_3");
        break;
      default:
        break;
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const formData = new FormData();

      formData.append("food_name", foodData.food_name);
      formData.append("description", foodData.description);
      formData.append("ingredients", foodData.ingredients);
      formData.append("price", foodData.price);
      formData.append("featured", foodData.featured);
      formData.append("sale_price", foodData.sale_price);
      formData.append("diet_type", foodData.diet_type);
      formData.append("allergens", foodData.allergens);

      // Manejar archivos
      formData.append("photo_path_1", foodData.photo_path_1);
      formData.append("photo_path_2", foodData.photo_path_2);
      formData.append("photo_path_3", foodData.photo_path_3);

      console.log("Datos del formulario:", formData);

      await addFood(formData, token);
      //const responseData = await response.json();

      // Obtener food_id de la respuesta del servidor
      //const foodId = responseData.data.food.food_id;

      toggleForm();
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
    }
  };

  const handleAllergenChange = (allergen) => {
    // Toggle para agregar o quitar allergens de la lista seleccionada
    setSelectedAllergens((prevAllergens) =>
      prevAllergens.includes(allergen)
        ? prevAllergens.filter((item) => item !== allergen)
        : [...prevAllergens, allergen]
    );

    // Actualizar foodData.allergens con la lista seleccionada
    const updatedAllergens = selectedAllergens.includes(allergen)
      ? selectedAllergens.filter((item) => item !== allergen)
      : [...selectedAllergens, allergen];

    setFoodData({ ...foodData, allergens: updatedAllergens.join(", ") });
  };

  return (
    <section className="create_food">
      <motion.button
        className="button-create-food"
        onClick={() => toggleForm()}
      >
        {isOpen ? "Cancelar" : "Añadir un plato"}
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.form
            onSubmit={handleForm}
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
          >
            <fieldset className="name-and-featured">
              <div className="name-fieldset">
                <label htmlFor="food_name">Nombre:</label>
                <input
                  type="text"
                  id="food_name"
                  name="food_name"
                  value={foodData.food_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="featured-fieldset">
                <label htmlFor="featured">Destacado:</label>
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={foodData.featured === "1"}
                  onChange={handleInputChange}
                />
              </div>
            </fieldset>

            <fieldset>
              <label htmlFor="description">Descripción:</label>
              <textarea
                id="description"
                name="description"
                value={foodData.description}
                onChange={handleInputChange}
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor="description">Ingredientes:</label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={foodData.ingredients}
                onChange={handleInputChange}
                required
              />
            </fieldset>
            <fieldset className="price_and_sale_price">
              <div className="price_fieldset">
                <label htmlFor="price">Precio:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={foodData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="sale_price_fieldset">
                <label htmlFor="sale_price">Oferta:</label>
                <input
                  type="number"
                  id="sale_price"
                  name="sale_price"
                  value={foodData.sale_price}
                  onChange={handleInputChange}
                />
              </div>
            </fieldset>

            <fieldset>
              <label>Tipo de dieta</label>
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
            </fieldset>
            <fieldset className="allergens">
              <div className="label">
                <label>Alergenos</label>
              </div>
              <div className="allergens">
                {possibleAllergens.map((allergen) => (
                  <div key={allergen} className="allergen-checkbox">
                    <input
                      type="checkbox"
                      id={allergen}
                      name="allergen"
                      value={allergen}
                      checked={selectedAllergens.includes(allergen)}
                      onChange={() => handleAllergenChange(allergen)}
                    />
                    <label htmlFor={allergen}>{allergen}</label>
                  </div>
                ))}
              </div>
            </fieldset>
            <fieldset className="photos_fieldset">
              <div className="photo_input">
                <label htmlFor="photo_path_1">Imagen 1</label>
                <input
                  type="file"
                  id="photo_path_1"
                  name="photo_path_1"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />

                <label htmlFor="photo_path_2">Imagen 2</label>
                <input
                  type="file"
                  id="photo_path_2"
                  name="photo_path_2"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />

                <label htmlFor="photo_path_3">Imagen 3</label>
                <input
                  type="file"
                  id="photo_path_3"
                  name="photo_path_3"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <div className="preview_images">
                {foodData.photo_path_1 && (
                  <div className="image">
                    <p className="image_number">Imagen 1</p>
                    <img
                      className="image_preview"
                      id="preview_1"
                      alt="Preview 1"
                    />
                  </div>
                )}
                {foodData.photo_path_2 && (
                  <div className="image">
                    <p className="image_number">Imagen 2</p>
                    <img
                      className="image_preview"
                      id="preview_2"
                      alt="Preview 2"
                    />
                  </div>
                )}
                {foodData.photo_path_3 && (
                  <div className="image">
                    <p className="image_number">Imagen 3</p>
                    <img
                      className="image_preview"
                      id="preview_3"
                      alt="Preview 3"
                    />
                  </div>
                )}
              </div>
            </fieldset>

            <button className="publicar">Añadir nuevo plato</button>
            {sending && <p>Creando comida...</p>}
            {error && <p>{error}</p>}
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CreateFood;
//////////////////////
