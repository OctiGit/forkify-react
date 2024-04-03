import { configureStore } from "@reduxjs/toolkit";
import { recipeApi } from "./apis/recipeApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { bookmarksReducer } from "./slices/bookmarksSlice";
import { recipeReducer } from "./slices/recipeSlice";
import { searchReducer } from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    bookmarks: bookmarksReducer,
    search: searchReducer,
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
export { setSearchQuery } from "./slices/searchSlice";
