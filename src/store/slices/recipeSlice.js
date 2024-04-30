import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    data: {},
    resultId: "",
  },
  reducers: {
    setRecipe(state, action) {
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
