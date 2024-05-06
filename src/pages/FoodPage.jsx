import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./FoodPage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const FoodPage = () => {
  const { id } = useParams();
  const [foodData, setFoodData] = useState(null);
  const [quantity, setQuantity] = useState({});
  const env = import.meta.env;
  useEffect(() => {
    const env = import.meta.env;

    const fetchFoodDetails = async () => {
      try {
        const response = await fetch(`${env.VITE_BACKEND}/menu/${id}`);
        if (!response.ok) {
          throw new Error(
            `Error al obtener los detalles de la comida: ${response.statusText}`
          );
        }

        const data = await response.json();
        setFoodData(data.data.food);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFoodDetails();
  }, [id]);

  if (!foodData) {
    return <div>Cargando...</div>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Convertir la cadena de allergens en un array
  const allergensArray = foodData.allergens
    .split(",")
    .map((allergen) => allergen.trim());

  // Definir las imágenes de los allergens
  const allergenImages = {
    huevo: "/huevos.png",
    leche: "/lacteos.png",
    pescado: "/pescado.png",
    mostaza: "/mostaza.png",
    sesamo: "/sesamo.png",
    molusco: "/moluscos.png",
    soja: "/soja.png",
    gluten: "/gluten.png",
    altramuces: "/altramuces.png",
    sulfitos: "/sulfitos.png",
    apio: "/apio.png",
    frutosdecascara: "/frutosdecascara.png",
    cacahuetes: "/cacahuetes.png",
    crustaceos: "/crustaceos.png",
  };

  return (
    <div>
      <Header />
      <main>
        <div className="food_page">
          <div className="food_images">
            <Slider {...sliderSettings} className="custom-slider">
              <img
                src={`${env.VITE_BACKEND}/uploads/${foodData.photo_path_1}`}
                alt="Slide 1"
              />
              <img
                src={`${env.VITE_BACKEND}/uploads/${foodData.photo_path_2}`}
                alt="Slide 2"
              />
              <img
                src={`${env.VITE_BACKEND}/uploads/${foodData.photo_path_3}`}
                alt="Slide 3"
              />
            </Slider>
            {(foodData.diet_type === "vegano" ||
              foodData.diet_type === "vegetariano" ||
              foodData.diet_type === "celíaco") && (
              <img
                className="diet-icon"
                src={
                  foodData.diet_type === "vegano"
                    ? "/vegano.png"
                    : foodData.diet_type === "vegetariano"
                    ? "/vegetarian.png"
                    : "/singluten.png"
                }
                alt={
                  foodData.diet_type === "vegano"
                    ? "Vegano"
                    : foodData.diet_type === "vegetariano"
                    ? "Vegetariano"
                    : "Celíaco"
                }
              />
            )}
          </div>
          <div className="food_description">
            <h2>{foodData.food_name}</h2>
            <p className="food_price">
              {foodData.sale_price !== null && foodData.sale_price !== 0 ? (
                <>
                  <span>{foodData.sale_price}€</span>
                  <span className="original_price">{foodData.price}€</span>
                </>
              ) : (
                <span>{foodData.price}€</span>
              )}
            </p>
            <p className="description">{foodData.description}</p>
            <p>{foodData.ingredients}</p>
            <div className="allergen_icons">
              {allergensArray.map((allergen, index) => (
                <img
                  key={index}
                  className="allergen-icon"
                  src={allergenImages[allergen]}
                  alt={allergen}
                />
              ))}
            </div>
            <div className="add_to_cart">
              <input
                type="number"
                className="amount-input"
                value={quantity[foodData.food_id] || 0}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setQuantity({
                    ...quantity,
                    [foodData.food_id]: isNaN(value) ? 1 : Math.max(1, value),
                  });
                }}
              />
              <button className="add_to_cart_food">
                <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                Añadir
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};
