import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./modal.slice";
import customerSlice from "./customer.slice";
import userSlice from "./user.slice";
const store = configureStore({
  reducer: {
    customer: customerSlice,
    userInterface: uiSlice,
    user: userSlice,
  },
});

export default store;
