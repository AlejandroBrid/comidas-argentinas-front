import { useEffect, useState } from "react";
import {
  deleteFoodService,
  getMenuService,
  getUserFoodsService,
  // sendFoodService,
} from "../services"; // Asumiendo que ya tienes servicios similares para las comidas

const useMenu = (token, id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
};
/*
  useEffect(() => {
    const loadFoods = async () => {
      try {
        setLoading(true);
        const data = id
          ? getUserFoodsService(id)
          : await getMenuService({ token });
        setFoods(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadFoods();
  }, [id]);

  /*
  const addFood = async (oneFood, token) => {
    await sendFoodService(oneFood, token);
    const allFoods = await getMenuService({ token });
    setFoods(allFoods);
  };
*/
/*
  const removeFood = async (id, token) => {
    await deleteFoodService(id, token);
    const allFoods = await getMenuService({ token });
    setFoods(allFoods);
  };

  const categoryFoods = async (category) => {
    const allFoods = await getMenuService({ token, category });
    setFoods(allFoods);
  };

  const popularFoods = async () => {
    const allFoods = await getMenuService({ token });
    allFoods.foods.sort((a, b) => b.likes - a.likes); // Asumiendo que tienes un campo 'likes' en tus comidas
    setFoods(allFoods);
  };

  const showAllFoods = async () => {
    const allFoods = await getMenuService({ token });
    setFoods(allFoods);
  };

  return {
    foods,
    setFoods,
    loading,
    error,
    // addFood,
    removeFood,
    categoryFoods,
    popularFoods,
    showAllFoods,
  };
};
*/
export default useMenu;
