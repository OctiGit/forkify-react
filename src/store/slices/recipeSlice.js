// import { createSlice } from "@reduxjs/toolkit";

// const recipeSlice = createSlice({
//   name: "recipe",
//   initialState: {
//     data: {},
//   },
//   reducers: {
//     changeRecipe(state, action) {
//       const recipe = {
//         id: action.payload.id,
//         title: action.payload.title,
//         publisher: action.payload.publisher,
//         sourceUrl: action.payload.source_url,
//         image: action.payload.image_url,
//         ingredients: action.payload.ingredients,
//         servings: action.payload.servings,
//         cookingTime: action.payload.cooking_time,
//         ...(action.payload.key && { key: action.payload.key }),
//       };
//       state.data = recipe;
//     },
//   },
// });

// export const { changeRecipe } = recipeSlice.actions;
// export const recipeReducer = recipeSlice.reducer;
