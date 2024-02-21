import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isLoading: true,
  isAddingSuccess: false,
  isEditingSuccess: false,
  isDeletingSuccess: false,
  deleteLoading: false,
  addLoading: false,
  userIdToDelete: "",
  error: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    FETCH_START(state) {
      state.isLoading = true;
    },

    FETCH_SUCCESS(state, action) {
      state.items = action.payload.items;
      console.log(state.items);
      state.isLoading = false;
    },

    FETCH_DATA_ERROR(state, action) {
      state.isLoading = true;
      state.error = action.payload.success ? "" : action.payload.error;
    },

    ADD_CUSTOMER(state, action) {
      state.items.push(action.payload.newData);
      state.isAddingSuccess = action.payload.success;
      state.error = action.payload.success ? "" : action.payload.error;
    },

    ADD_LOADING(state) {
      state.addLoading = true;
    },

    ADD_CUSTOMER_SUCCESS(state) {
      state.isAddingSuccess = false;
      state.addLoading = false;
    },

    SET_USERID_TO_DELETE(state, action) {
      state.userIdToDelete = action.payload;
    },

    DELETE_ON_PROCESS(state) {
      state.deleteLoading = true;
    },

    DELETE_CUSTOMER(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.isDeletingSuccess = action.payload.success;
      state.error = action.payload.success ? "" : action.payload.error;
    },

    DELETE_CUSTOMER_SUCCESS(state) {
      state.isDeletingSuccess = false;
      state.deleteLoading = false;
      state.userIdToDelete = "";
    },

    EDIT_CUSTOMER(state, action) {
      state.items = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.newData }
          : item
      );
      state.isAddingSuccess = false;
      state.isDeletingSuccess = false;
      state.isEditingSuccess = action.payload.success;
      state.error = action.payload.success ? "" : action.payload.error;
    },

    EDIT_CUSTOMER_SUCCESS(state) {
      state.isEditingSuccess = false;
    },
  },
});

export const customerActions = customerSlice.actions;
export default customerSlice.reducer;
