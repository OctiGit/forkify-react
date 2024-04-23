import axios from "axios";
import { addBookmark, setRecipe } from "../store";
import { API_URL, KEY } from "../config";
import { useState } from "react";
import { useDispatch } from "react-redux";

const useSubmitRecipe = (initialValues, finallyFn) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(initialValues);
  const [error, setError] = useState(null);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    setError(null);

    try {
      const ingredients = Object.entries(formValues)
        .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
        .map((ing) => {
          const ingArr = ing[1].split(",").map((el) => el.trim());

          if (ingArr.length !== 3)
            throw new Error(
              "Wrong ingredient format. Please use the correct format :)"
            );
          const [quantity, unit, description] = ingArr;
          return {
            quantity: quantity ? +quantity : null,
            unit,
            description,
          };
        });
      const recipeToSubmit = {
        title: formValues.title,
        publisher: formValues.publisher,
        source_url: formValues.source_url,
        image_url: formValues.image_url,
        servings: +formValues.servings,
        cooking_time: +formValues.cookingTime,
        ingredients,
      };

      const { data } = await axios.post(
        `${API_URL}?key=${KEY}`,
        recipeToSubmit
      );
      const recipe = {
        ...data.data.recipe,
        bookmarked: true,
      };
      dispatch(setRecipe(recipe));
      dispatch(addBookmark(recipe));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmiting(false);
      finallyFn();
    }
  };

  return { onSubmitHandler, onChangeHandler, error, isSubmiting, formValues };
};

export default useSubmitRecipe;
