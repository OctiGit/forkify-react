import { useState } from "react";
import { API_URL, ICONS_PATH, KEY, MODAL_CLOSE_SEC } from "../config";
import {
  addBookmark,
  setBookmarked,
  setRecipe,
  setRecipeId,
  setSuccessMessage,
  toggleAddRecipeWindow,
  useAddRecipeMutation,
} from "../store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function AddRecipeView() {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { successMessage } = useSelector((state) => state.page);
  // const [successMessage, setSuccessMessage] = useState();
  const [values, setValues] = useState({
    title: "TEST23",
    source_url: "TEST23",
    image_url: "TEST23",
    publisher: "TEST23",
    cookingTime: "23",
    servings: "23",
    ingredient1: "0.5,kg,Rice",
    ingredient2: "1,,Avocado",
    ingredient3: ",,salt",
    ingredient4: "",
    ingredient5: "",
    ingredient6: "",
  });
  // const [addRecipe, results] = useAddRecipeMutation();
  // const [isHidden, setIsHidden] = useState(false);
  const { hideAddRecipeWindow } = useSelector((state) => state.page);
  const recipe = useSelector((state) => state.recipe.data);

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const ingredients = Object.entries(values)
        .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
        .map((ing) => {
          // const ingArr = ing[1].replaceAll(' ', '').split(',');
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
      const recipeToPost = {
        // id: values.id,
        title: values.title,
        publisher: values.publisher,
        source_url: values.source_url,
        image_url: values.image_url,
        servings: +values.servings,
        cooking_time: +values.cookingTime,
        ingredients,
      };

      setIsLoading(true);
      const { data } = await axios.post(`${API_URL}?key=${KEY}`, recipeToPost);
      const newRecipe = {
        ...data.data.recipe,
        bookmarked: true,
      };
      dispatch(setRecipe(newRecipe));
      dispatch(addBookmark(newRecipe));
      // dispatch recipeId too????
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      dispatch(setSuccessMessage("Recipe was successfully uploaded :)"));
      // setSuccessMessage("Recipe was successfully uploaded :)");
      setTimeout(() => {
        dispatch(toggleAddRecipeWindow(true));
        // setSuccessMessage("");
      }, [MODAL_CLOSE_SEC * 1000]);
    }
    // const { data } = await addRecipe(recipeToAdd);
    // console.log(data);
    // dispatch(setRecipe(data));
    // dispatch(addBookmark(recipe));
    // dispatch(setBookmarked(true));
    // dispatch(setRecipeId(data.id));
  };

  const toggleWindow = () => dispatch(toggleAddRecipeWindow());

  return (
    <>
      <div
        onClick={toggleWindow}
        className={`overlay ${hideAddRecipeWindow && "hidden"}`}
      ></div>
      <div className={`add-recipe-window ${hideAddRecipeWindow && "hidden"}`}>
        <button onClick={toggleWindow} className="btn--close-modal">
          &times;
        </button>
        {error ? (
          <div className="error">
            <div>
              <svg>
                <use href={`${ICONS_PATH}#icon-alert-triangle`}></use>
              </svg>
            </div>
            <p>{error}</p>
          </div>
        ) : isLoading ? (
          <div className="spinner">
            <svg>
              <use href={`${ICONS_PATH}#icon-loader`}></use>
            </svg>
          </div>
        ) : successMessage ? (
          <div className="error">
            <div>
              <svg>
                <use href={`${ICONS_PATH}#icon-smile`}></use>
              </svg>
            </div>
            <p>{successMessage}</p>
          </div>
        ) : (
          <form onSubmit={onSubmitHandler} className="upload">
            <div className="upload__column">
              <h3 className="upload__heading">Recipe data</h3>
              <label>Title</label>
              <input
                value={values.title}
                required
                name="title"
                type="text"
                onChange={onChangeHandler}
              />
              <label>URL</label>
              <input
                value={values.source_url}
                required
                name="source_url"
                type="text"
                onChange={onChangeHandler}
              />
              <label>Image URL</label>
              <input
                value={values.image_url}
                required
                name="image_url"
                type="text"
                onChange={onChangeHandler}
              />
              <label>Publisher</label>
              <input
                value={values.publisher}
                required
                name="publisher"
                type="text"
                onChange={onChangeHandler}
              />
              <label>Prep time</label>
              <input
                value={values.cookingTime}
                required
                name="cookingTime"
                type="number"
                onChange={onChangeHandler}
              />
              <label>Servings</label>
              <input
                value={values.servings}
                required
                name="servings"
                type="number"
                onChange={onChangeHandler}
              />
            </div>

            <div className="upload__column">
              <h3 className="upload__heading">Ingredients</h3>
              <label>Ingredient 1</label>
              <input
                value={values.ingredient1}
                type="text"
                required
                name="ingredient1"
                placeholder="Format: 'Quantity,Unit,Description'"
                onChange={onChangeHandler}
              />
              <label>Ingredient 2</label>
              <input
                value={values.ingredient2}
                type="text"
                name="ingredient2"
                placeholder="Format: 'Quantity,Unit,Description'"
                onChange={onChangeHandler}
              />
              <label>Ingredient 3</label>
              <input
                value={values.ingredient3}
                type="text"
                name="ingredient3"
                placeholder="Format: 'Quantity,Unit,Description'"
                onChange={onChangeHandler}
              />
              <label>Ingredient 4</label>
              <input
                type="text"
                name="ingredient4"
                placeholder="Format: 'Quantity,Unit,Description'"
                onChange={onChangeHandler}
              />
              <label>Ingredient 5</label>
              <input
                type="text"
                name="ingredient5"
                placeholder="Format: 'Quantity,Unit,Description'"
                onChange={onChangeHandler}
              />
              <label>Ingredient 6</label>
              <input
                type="text"
                name="ingredient6"
                placeholder="Format: 'Quantity,Unit,Description'"
                onChange={onChangeHandler}
              />
            </div>

            <button className="btn upload__btn">
              <svg>
                <use href={`${ICONS_PATH}#icon-upload-cloud`}></use>
              </svg>
              <span>Upload</span>
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default AddRecipeView;
