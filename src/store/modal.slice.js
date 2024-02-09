import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: false,
  reducers: {
    open(state) {
      return true;
    },

    close(state) {
      return false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
