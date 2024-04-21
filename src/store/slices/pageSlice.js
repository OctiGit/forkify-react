import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "page",
  initialState: {
    hideAddRecipeWindow: true,
    successMessage: "",
  },
  reducers: {
    toggleAddRecipeWindow(state, action) {
      if (state.hideAddRecipeWindow === action.payload) return;
      state.hideAddRecipeWindow = !state.hideAddRecipeWindow;
    },
    setSuccessMessage(state, action) {
      state.successMessage = action.payload;
    },
  },
});

export const { toggleAddRecipeWindow, setSuccessMessage } = pageSlice.actions;
export const pageReducer = pageSlice.reducer;
