import { useDispatch, useSelector } from "react-redux";
import { Fraction } from "fractional";
import {
  updateServings,
  addBookmark,
  deleteBookmark,
  setBookmarked,
} from "../store";
import { ICONS_PATH } from "../config";
import useRecipe from "../hooks/useRecipe";

function RecipeView() {
  const dispatch = useDispatch();
  const { recipe, error, isLoading } = useRecipe();

  const updateServingsHandler = (newServings) => {
    if (newServings > 0) {
      dispatch(updateServings(newServings));
    }
  };

  const bookmarkHandler = () => {
    if (!recipe.bookmarked) {
      dispatch(addBookmark(recipe));
      dispatch(setBookmarked(true));
    } else {
      dispatch(deleteBookmark(recipe.id));
      dispatch(setBookmarked(false));
    }
  };

  return error ? (
    <div className="recipe">
      <div className="error">
        <div>
          <svg>
            <use href={`${ICONS_PATH}#icon-alert-triangle`}></use>
          </svg>
        </div>
        <p>No recipes found for your query. Please try again!</p>
      </div>
    </div>
  ) : isLoading ? (
    <div className="recipe">
      <div className="spinner">
        <svg>
          <use href={`${ICONS_PATH}#icon-loader`}></use>
        </svg>
      </div>
    </div>
  ) : recipe.id ? (
    <div className="recipe">
      <figure className="recipe__fig">
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="recipe__img"
        />
        <h1 className="recipe__title">
          <span>{recipe.title}</span>
        </h1>
      </figure>

      <div className="recipe__details">
        <div className="recipe__info">
          <svg className="recipe__info-icon">
            <use href={`${ICONS_PATH}#icon-clock`}></use>
          </svg>
          <span className="recipe__info-data recipe__info-data--minutes">
            {recipe.cookingTime}
          </span>
          <span className="recipe__info-text">minutes</span>
        </div>
        <div className="recipe__info">
          <svg className="recipe__info-icon">
            <use href={`${ICONS_PATH}#icon-users`}></use>
          </svg>
          <span className="recipe__info-data recipe__info-data--people">
            {recipe.servings}
          </span>
          <span className="recipe__info-text">servings</span>
          <div className="recipe__info-buttons">
            <button
              onClick={() => updateServingsHandler(recipe.servings - 1)}
              className="btn--tiny btn--update-servings"
            >
              <svg>
                <use href={`${ICONS_PATH}#icon-minus-circle`}></use>
              </svg>
            </button>
            <button
              onClick={() => updateServingsHandler(recipe.servings + 1)}
              className="btn--tiny btn--update-servings"
            >
              <svg>
                <use href={`${ICONS_PATH}#icon-plus-circle`}></use>
              </svg>
            </button>
          </div>
        </div>
        <div className={`recipe__user-generated ${recipe.key ? "" : "hidden"}`}>
          <svg>
            <use href={`${ICONS_PATH}#icon-user`}></use>
          </svg>
        </div>
        <button onClick={bookmarkHandler} className="btn--round btn--bookmark">
          <svg className="">
            <use
              href={`${ICONS_PATH}#icon-bookmark${
                recipe.bookmarked ? "-fill" : ""
              }`}
            ></use>
          </svg>
        </button>
      </div>

      <div className="recipe__ingredients">
        <h2 className="heading--2">Recipe ingredients</h2>
        <ul className="recipe__ingredient-list">
          {recipe.ingredients.map((ing, key) => (
            <li key={key} className="recipe__ingredient">
              <svg className="recipe__icon">
                <use href={`${ICONS_PATH}#icon-check`}></use>
              </svg>
              {ing.quantity ? (
                <div className="recipe__quantity">
                  {new Fraction(ing.quantity).toString()}
                </div>
              ) : (
                ""
              )}
              <div className="recipe__description">
                <span className="recipe__unit">{ing.unit ?? ""}</span>
                {ing.description}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="recipe__directions">
        <h2 className="heading--2">How to cook it</h2>
        <p className="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span className="recipe__publisher">{recipe.publisher}</span>. Please
          check out directions at their website.
        </p>
        <a
          className="btn--small recipe__btn"
          href={recipe.source_url}
          target="_blank"
          rel="noreferrer"
        >
          <span>Directions</span>
          <svg className="search__icon">
            <use href={`${ICONS_PATH}#icon-arrow-right`}></use>
          </svg>
        </a>
      </div>
    </div>
  ) : (
    <div className="recipe">
      <div className="message">
        <div>
          <svg>
            <use href={`${ICONS_PATH}#icon-smile`}></use>
          </svg>
        </div>
        <p>Start by searching for a recipe or an ingredient. Have fun!</p>
      </div>
    </div>
  );
}

export default RecipeView;
