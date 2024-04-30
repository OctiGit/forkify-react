import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { bookmarksReducer } from "./slices/bookmarksSlice";
import { recipeReducer } from "./slices/recipeSlice";
import { searchReducer } from "./slices/searchSlice";
import { pageReducer } from "./slices/pageSlice";

export const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    bookmarks: bookmarksReducer,
    search: searchReducer,
    page: pageReducer,
  },
});

setupListeners(store.dispatch);

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
