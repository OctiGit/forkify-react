import { createSlice } from "@reduxjs/toolkit";
import { RES_PER_PAGE } from "../../config";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  reducers: {
    setSearchQuery(state, action) {
      console.log(action.payload);
      state.query = action.payload;
    },
    setSearchResults(state, action) {
      const recipes = action.payload;
      console.log(recipes);
      state.results = recipes.map((rec) => {
        return {
          id: rec.id,
          title: rec.title,
          publisher: rec.publisher,
          image: rec.image_url,
          ...(rec.key && { key: rec.key }),
        };
      });
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const { setSearchQuery, setSearchResults, setPage } =
  searchSlice.actions;
export const searchReducer = searchSlice.reducer;
