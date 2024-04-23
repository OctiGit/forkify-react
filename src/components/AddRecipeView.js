import { ICONS_PATH, MODAL_CLOSE_SEC } from "../config";
import { setSuccessMessage, toggleAddRecipeWindow } from "../store";
import { useDispatch, useSelector } from "react-redux";
import useSubmitRecipe from "../hooks/useSubmitRecipe";

function AddRecipeView() {
  const dispatch = useDispatch();
  const initialValues = {
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
  };
  const { hideAddRecipeWindow } = useSelector((state) => state.page);
  const { successMessage } = useSelector((state) => state.page);

  const finallyFn = () => {
    dispatch(setSuccessMessage("Recipe was successfully uploaded :)"));
    setTimeout(() => {
      dispatch(toggleAddRecipeWindow(true));
    }, [MODAL_CLOSE_SEC * 1000]);
  };

  const { onSubmitHandler, onChangeHandler, error, isSubmiting, formValues } =
    useSubmitRecipe(initialValues, finallyFn);

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
        ) : isSubmiting ? (
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
                value={formValues.title}
                required
                name="title"
                type="text"
                onChange={onChangeHandler}
              />
              <label>URL</label>
              <input
                value={formValues.source_url}
                required
                name="source_url"
                type="text"
                onChange={onChangeHandler}
              />
              <label>Image URL</label>
              <input
                value={formValues.image_url}
                required
                name="image_url"
                type="text"
                onChange={onChangeHandler}
              />
              <label>Publisher</label>
              <input
                value={formValues.publisher}
                required
                name="publisher"
                type="text"
                onChange={onChangeHandler}
              />
              <label>Prep time</label>
              <input
                value={formValues.cookingTime}
                required
                name="cookingTime"
                type="number"
                onChange={onChangeHandler}
              />
              <label>Servings</label>
              <input
                value={formValues.servings}
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
                value={formValues.ingredient1}
                type="text"
                required
                name="ingredient1"
                placeholder="Format: 'Quantity,Unit,Description'"
                onChange={onChangeHandler}
              />
              <label>Ingredient 2</label>
              <input
                value={formValues.ingredient2}
                type="text"
                name="ingredient2"
                placeholder="Format: 'Quantity,Unit,Description'"
                onChange={onChangeHandler}
              />
              <label>Ingredient 3</label>
              <input
                value={formValues.ingredient3}
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
