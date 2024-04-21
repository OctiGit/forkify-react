import { useDispatch, useSelector } from "react-redux";
import { Fraction } from "fractional";
import { useEffect, useState } from "react";
import {
  setRecipe,
  updateServings,
  addBookmark,
  deleteBookmark,
  setBookmarked,
  useFetchRecipeQuery,
} from "../store";
import { API_URL, ICONS_PATH, KEY } from "../config";
import axios from "axios";

// { id = "6186d719649f7300185d741b" }

function RecipeView({ id = "6186d719649f7300185d741b" }) {
  const dispatch = useDispatch();
  const recipeId = useSelector((state) => state.recipe.resultId);
  // const { data, error, isFetching } = useFetchRecipeQuery(recipeId);
  const recipe = useSelector((state) => state.recipe.data);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const bookmarks = useSelector((state) => state.bookmarks.data);

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
            // bookmarked: recipe.bookmarked ? true : false,
            ...(recipe.key && { key: recipe.key }),
          };
          // return { data: newRecipe };
          console.log("setRecipe", newRecipe);
          dispatch(setRecipe(newRecipe));
        }
      } catch (error) {
        // return { error };
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [recipeId, dispatch]);

  // useEffect(() => {
  //   if (data) {
  //     dispatch(setRecipe(data));
  //     if (bookmarks.some((b) => b.id === recipe.id)) {
  //       console.log(bookmarks);
  //       dispatch(setBookmarked(true));
  //     } else dispatch(setBookmarked(false));
  //   }
  // }, [data, dispatch, recipe.id, bookmarks]);

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
    // update local storage with the bookmark (model.js:84)
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
    // recipe.id === recipeId && (
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
              // data-update-to={recipe.servings - 1}
              className="btn--tiny btn--update-servings"
            >
              <svg>
                <use href={`${ICONS_PATH}#icon-minus-circle`}></use>
              </svg>
            </button>
            <button
              onClick={() => updateServingsHandler(recipe.servings + 1)}
              // data-update-to={recipe.servings + 1}
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
    // ) : !data ? (
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
