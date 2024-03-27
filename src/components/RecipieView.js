// import { useDispatch } from "react-redux";
import { Fraction } from "fractional";
import { useFetchRecipeQuery } from "../store";
import { useEffect, useState } from "react";

function RecipeView() {
  const { data, error, isFetching } = useFetchRecipeQuery(
    "5ed6604591c37cdc054bc886"
  );
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    if (!isFetching && data) {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        id: data.id,
        title: data.title,
        publisher: data.publisher,
        sourceUrl: data.sourceUrl,
        image: data.image,
        ingredients: data.ingredients,
        servings: data.servings,
        cookingTime: data.cookingTime,
        ...(data.key && { key: data.key }),
      }));
    }
  }, [data, isFetching, setRecipe]);

  const updateServingsHandler = (newServings) => {
    if (newServings > 0) {
      console.log(newServings);
      const newIngredients = recipe.ingredients.map((ings) => ({
        ...ings,
        quantity: (ings.quantity * newServings) / recipe.servings,
      }));
      setRecipe({
        ...recipe,
        ingredients: newIngredients,
        servings: newServings,
      });
    }
  };

  const icons = `${process.env.PUBLIC_URL}/img/icons.svg`;
  console.log(recipe);

  return error ? (
    <div className="recipe">
      <div className="error">
        <div>
          <svg>
            <use href={`${icons}#icon-alert-triangle`}></use>
          </svg>
        </div>
        <p>No recipes found for your query. Please try again!</p>
      </div>
    </div>
  ) : isFetching ? (
    <div className="recipe">
      <div className="spinner">
        <svg>
          <use href={`${icons}#icon-loader`}></use>
        </svg>
      </div>
    </div>
  ) : (
    recipe.id && (
      <div className="recipe">
        <figure className="recipe__fig">
          <img src={recipe.image} alt={recipe.title} className="recipe__img" />
          <h1 className="recipe__title">
            <span>{recipe.title}</span>
          </h1>
        </figure>

        <div className="recipe__details">
          <div className="recipe__info">
            <svg className="recipe__info-icon">
              <use href={`${icons}#icon-clock`}></use>
            </svg>
            <span className="recipe__info-data recipe__info-data--minutes">
              {recipe.cookingTime}
            </span>
            <span className="recipe__info-text">minutes</span>
          </div>
          <div className="recipe__info">
            <svg className="recipe__info-icon">
              <use href={`${icons}#icon-users`}></use>
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
                  <use href={`${icons}#icon-minus-circle`}></use>
                </svg>
              </button>
              <button
                onClick={() => updateServingsHandler(recipe.servings + 1)}
                // data-update-to={recipe.servings + 1}
                className="btn--tiny btn--update-servings"
              >
                <svg>
                  <use href={`${icons}#icon-plus-circle`}></use>
                </svg>
              </button>
            </div>
          </div>

          <div
            className={`recipe__user-generated ${recipe.key ? "" : "hidden"}`}
          >
            <svg>
              <use href={`${icons}#icon-user`}></use>
            </svg>
          </div>
          <button className="btn--round btn--bookmark">
            <svg className="">
              <use
                href={`${icons}#icon-bookmark${
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
                  <use href={`${icons}#icon-check`}></use>
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
            <span className="recipe__publisher">{recipe.publisher}</span>.
            Please check out directions at their website.
          </p>
          <a
            className="btn--small recipe__btn"
            href={recipe.sourceUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>Directions</span>
            <svg className="search__icon">
              <use href={`${icons}#icon-arrow-right`}></use>
            </svg>
          </a>
        </div>
      </div>
    )
  );
}

export default RecipeView;
