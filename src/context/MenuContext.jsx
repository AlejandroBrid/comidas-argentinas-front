import { AuthContext } from "../context/AuthContext";

import { createContext, useState, useEffect, useContext } from "react";

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const env = import.meta.env.VITE_BACKEND;
    const fetchMenuData = async () => {
      try {
        const response = await fetch(`${env}/menu`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        });

        const data = await response.json();
        setMenuData(data.data);
      } catch (error) {
        setError("Error al obtener datos del menú.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const { token } = useContext(AuthContext);

  const deleteFood = async (foodId) => {
    try {
      const env = import.meta.env.VITE_BACKEND;
      const response = await fetch(`${env}/menu/${foodId}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
        mode: "cors",
      });

      const data = await response.json();

      if (data.status === "OK") {
        setMenuData((prevMenu) => {
          if (prevMenu && Array.isArray(prevMenu.food)) {
            const updatedMenu = {
              ...prevMenu,
              food: prevMenu.food.filter((food) => food.food_id !== foodId),
            };
            return updatedMenu;
          } else {
            return prevMenu;
          }
        });
      } else {
        console.error("Error al eliminar la comida", data.message);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud de eliminación", error);
    }
  };

  const updateFood = (updatedFood) => {
    setMenuData((prevMenu) => {
      if (prevMenu && Array.isArray(prevMenu.food)) {
        const updatedFoodList = prevMenu.food.map((food) =>
          food.food_id === updatedFood[0].food_id ? updatedFood[0] : food
        );
        console.log(updatedFood);
        console.log(updatedFood[0].food_id);
        console.log(prevMenu.food);
        console.log("updatedFoodList", updatedFoodList);
        return { ...prevMenu, food: updatedFoodList };
      } else {
        console.log("Error: prevMenu no es válido:", prevMenu);
        return prevMenu;
      }
    });
  };

  useEffect(() => {}, [menuData]);

  const contextValue = {
    menuData,
    setMenuData, // Incluye setMenuData en el contexto
    loading,
    error,
    deleteFood,
    updateFood,
  };

  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  );
};

export { MenuProvider, MenuContext };
