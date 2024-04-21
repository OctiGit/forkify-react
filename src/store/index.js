import { configureStore } from "@reduxjs/toolkit";
import { recipeApi } from "./apis/recipeApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { bookmarksReducer } from "./slices/bookmarksSlice";
import { recipeReducer } from "./slices/recipeSlice";
import { searchReducer } from "./slices/searchSlice";
import { resultsApi } from "./apis/resultsApi";
import { pageReducer } from "./slices/pageSlice";

export const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    bookmarks: bookmarksReducer,
    search: searchReducer,
    page: pageReducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
    [resultsApi.reducerPath]: resultsApi.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      .concat(recipeApi.middleware)
      .concat(resultsApi.middleware);
  },
});

setupListeners(store.dispatch);

export { useFetchRecipeQuery, useAddRecipeMutation } from "./apis/recipeApi";
export { useFetchResultsQuery } from "./apis/resultsApi";
export {
  setRecipe,
  setRecipeId,
  updateServings,
  setBookmarked,
} from "./slices/recipeSlice";
export {
  addBookmark,
  deleteBookmark,
  setBookmarks,
} from "./slices/bookmarksSlice";
export {
  setSearchQuery,
  setSearchResults,
  setPage,
} from "./slices/searchSlice";
export { toggleAddRecipeWindow, setSuccessMessage } from "./slices/pageSlice";
