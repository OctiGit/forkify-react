import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    data: {},
  },
  reducers: {
    setRecipe(state, action) {
      const recipe = {
        id: action.payload.id,
        title: action.payload.title,
        publisher: action.payload.publisher,
        sourceUrl: action.payload.source_url,
        image: action.payload.image,
        ingredients: action.payload.ingredients,
        servings: action.payload.servings,
        cookingTime: action.payload.cooking_time,
        ...(action.payload.key && { key: action.payload.key }),
      };
      state.data = recipe;
    },
    updateServings(state, action) {
      console.log(action.payload);
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

export const { setRecipe, updateServings, setBookmarked } = recipeSlice.actions;
export const recipeReducer = recipeSlice.reducer;
