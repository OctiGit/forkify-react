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
      state.data.push(action.payload);
    },
    // Assumption:
    // action.payload === the id of the recipe bookmarked
    deleteBookmark(state, action) {
      const updated = state.data.filter(
        (bookmark) => bookmark.id !== action.payload
      );
      state.data = updated;
    },
  },
});

export const { addBookmark, deleteBookmark } = bookmarksSlice.actions;
export const bookmarksReducer = bookmarksSlice.reducer;
