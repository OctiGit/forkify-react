import { configureStore } from "@reduxjs/toolkit";
import { recipeApi } from "./apis/recipeApi";
import { setupListeners } from "@reduxjs/toolkit/query";
// import { recipeReducer } from "./slices/recipeSlice";

export const store = configureStore({
  reducer: {
    // recipe: recipeReducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(recipeApi.middleware);
  },
});

setupListeners(store.dispatch);

export { useFetchRecipeQuery } from "./apis/recipeApi";
// export { changeRecipe } from "./slices/recipeSlice";
