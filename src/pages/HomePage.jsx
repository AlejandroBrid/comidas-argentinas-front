import { useState } from "react";
import { useSpring, animated } from "react-spring";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./HomePage.css";

const images = [
  { id: 1, src: "parrillada.avif", alt: "parrilla" },
  { id: 2, src: "comidas.avif", alt: "comidas" },
  { id: 3, src: "alfajorcitos.jpg", alt: "alfajorcitos" },
];

export const HomePage = () => {
  const [index, setIndex] = useState(0);

  const props = useSpring({
    opacity: 1,
    from: { opacity: 0.5 },
    reset: true,
    reverse: index % 1 === 1,
    onRest: () => setIndex((prevIndex) => (prevIndex + 1) % images.length),

    config: { duration: 3000, tension: 170, friction: 126 },
  });

  return (
    <div>
      <Header />
      <main>
        <div style={{ position: "relative", width: "100%", height: "900px" }}>
          <animated.img
            src={images[index].src}
            alt={images[index].alt}
            style={{
              ...props,
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
          <div className="title">
            <h1
              style={{
                fontFamily: "Pacifico, cursive",
                fontSize: "5em",
                textShadow: "2px 2px 2px black",
              }}
            >
              Comidas Argentinas
            </h1>
          </div>
        </div>
        <h2 className="home">
          Viaja a través de los sabores de Argentina desde la comodidad de tu
          hogar.
        </h2>
        <a className="menu" href="/menu">
          Camarero, la carta por favor
        </a>
        <h2 className="home">
          En cada plato, una experiencia unica que te transportará a las calles
          de Buenos Aires.
        </h2>
        <div className="sostenibilidad">
          <div className="home_image">
            <img src="home1.jpg" className="home1" alt="allergens" />
          </div>
          <div className="allergens_text">
            <h3>NUESTRA OFERTA GASTRONOMICA</h3>
            <p>
              Hemos seleccionado cuidadosamente una colección de recetas que te
              transportarán a la esencia de la mejor cocina casera argentina.
              Utilizamos productos frescos de la más alta calidad, sin
              conservantes, para preservar el auténtico sabor y la textura
              perfecta. Así, podrás disfrutar plenamente de los sabores
              distintivos de cada región de Argentina.
            </p>
          </div>
        </div>
        <div className="sostenibilidad">
          <div className="sostenibilidad_text">
            <h3>SOSTENIBILIDAD</h3>
            <p>
              Impacto positivo en tu vida, y en la del planeta. Nuestras
              bandejas son de polipropileno 100 % reciclables y reutilizables.
            </p>
          </div>
          <div className="home_image">
            <img src="home2.jpg" className="home2" alt="sostenibilidad" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
