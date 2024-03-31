import { configureStore } from "@reduxjs/toolkit";
import { recipeApi } from "./apis/recipeApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { bookmarksReducer } from "./slices/bookmarksSlice";
import { recipeReducer } from "./slices/recipeSlice";

export const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    bookmarks: bookmarksReducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(recipeApi.middleware);
  },
});

setupListeners(store.dispatch);

export { useFetchRecipeQuery } from "./apis/recipeApi";
export { setRecipe, updateServings, setBookmarked } from "./slices/recipeSlice";
export { addBookmark, deleteBookmark } from "./slices/bookmarksSlice";
