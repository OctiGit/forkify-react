import { createSlice } from "@reduxjs/toolkit";

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: {
    data: [],
  },
  reducers: {
    addBookmark(state, action) {
      // Assumption:
      // action.payload === the recipe bookmarked
      const recipeToAdd = {
        ...action.payload,
        bookmarked: true,
      };

      state.data.push(recipeToAdd);
      localStorage.setItem("bookmarks", JSON.stringify(state.data));
    },
    // Assumption:
    // action.payload === the id of the recipe bookmarked
    deleteBookmark(state, action) {
      const updated = state.data.filter(
        (bookmark) => bookmark.id !== action.payload
      );
      state.data = updated;
      localStorage.removeItem("bookmarks");
      localStorage.setItem("bookmarks", JSON.stringify(state.data));
    },
    setBookmarks(state, action) {
      state.data = action.payload;
    },
  },
});

export const { addBookmark, deleteBookmark, setBookmarks } =
  bookmarksSlice.actions;
export const bookmarksReducer = bookmarksSlice.reducer;
