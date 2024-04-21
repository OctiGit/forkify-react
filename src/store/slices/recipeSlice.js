import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    data: {},
    resultId: "",
  },
  reducers: {
    setRecipe(state, action) {
      // const recipe = {
      //   id: action.payload.id,
      //   title: action.payload.title,
      //   publisher: action.payload.publisher,
      //   source_url: action.payload.source_url,
      //   image_url: action.payload.image_url,
      //   ingredients: action.payload.ingredients,
      //   servings: action.payload.servings,
      //   cookingTime: action.payload.cooking_time,
      //   // bookmarked: action.payload.bookmarked ? true : false,
      //   ...(action.payload.key && { key: action.payload.key }),
      // };
      // state.data = recipe;
      state.data = action.payload;
    },
    setRecipeId(state, action) {
      state.resultId = action.payload;
    },
    updateServings(state, action) {
      const newIngredients = state.data.ingredients.map((ings) => ({
        ...ings,
        quantity: (ings.quantity * action.payload) / state.data.servings,
      }));
      state.data = {
        ...state.data,
        ingredients: newIngredients,
        servings: action.payload,
      };
    },
    setBookmarked(state, action) {
      state.data.bookmarked = action.payload;
    },
  },
});

export const { setRecipe, setRecipeId, updateServings, setBookmarked } =
  recipeSlice.actions;
export const recipeReducer = recipeSlice.reducer;
