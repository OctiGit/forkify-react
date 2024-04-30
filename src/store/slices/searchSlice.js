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
      state.query = action.payload;
    },
    setSearchResults(state, action) {
      state.results = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const { setSearchQuery, setSearchResults, setPage } =
  searchSlice.actions;
export const searchReducer = searchSlice.reducer;
