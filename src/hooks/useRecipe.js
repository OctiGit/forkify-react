import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRecipe } from "../store";
import axios from "axios";
import { API_URL, KEY } from "../config";

const useRecipe = () => {
  const dispatch = useDispatch();
  const recipeId = useSelector((state) => state.recipe.resultId);
  const recipe = useSelector((state) => state.recipe.data);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!recipeId) {
          return;
        } else {
          setIsLoading(true);
          const { data } = await axios.get(`${API_URL}${recipeId}?key=${KEY}`);
          const recipe = data.data.recipe;
          const newRecipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            source_url: recipe.source_url,
            image_url: recipe.image_url,
            ingredients: recipe.ingredients,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ...(recipe.key && { key: recipe.key }),
          };
          dispatch(setRecipe(newRecipe));
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [recipeId, dispatch]);

  return { recipe, error, isLoading };
};

export default useRecipe;
