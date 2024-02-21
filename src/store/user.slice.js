import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  userCredentials: {
    uid: "",
    email: "",
    displayName: "",
  },
  isAuth: false,
  loginError: "",
  signUpError: "",
  signUpSuccess: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    SIGN_IN_SUCCESS(state, action) {
      state.isAuth = true;
      state.loginError = "";
      state.userCredentials.email = action.payload.email;
      state.userCredentials.uid = action.payload.uid;
      state.userCredentials.displayName = action.payload.displayName;
    },

    SIGN_UP_SUCCESS(state) {
      state.signUpSuccess = true;
      state.signUpError = "";
    },

    SIGN_UP_FAILED(state, action) {
      state.signUpError = action.payload;
    },

    RESET_SIGNUP_ERROR(state) {
      state.signUpError = "";
    },

    SIGN_IN_FAILED(state, action) {
      state.loginError = action.payload;
    },

    SIGN_OUT(state) {
      state.userCredentials.email = "";
      state.userCredentials.uid = "";
      state.userCredentials.displayName = "";
      state.isAuth = false;
      state.loginError = "";
      state.signUpError = "";
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
