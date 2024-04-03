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
  },
});

export const { setSearchQuery } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
