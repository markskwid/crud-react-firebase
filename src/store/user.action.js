import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { userActions } from "./user.slice";
import { authErrors } from "../modules/firebase-errors";

export const signInUser = (email, password) => {
  return async (dispatch) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(
        userActions.SIGN_IN_SUCCESS({
          uid: userCredentials.user.uid,
          email: userCredentials.user.email,
        })
      );

      return true;
    } catch (error) {
      const error_code = error.code.replace("auth/", "");
      console.log(authErrors[error_code]);
      dispatch(userActions.SIGN_IN_FAILED(authErrors[error_code]));
      throw error;
    }
  };
};

export const signUpGoogle = () => {
  return async (dispatch) => {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      dispatch(
        userActions.SIGN_IN_SUCCESS({
          uid: response.user.uid,
          email: response.user.email,
          displayName: response.user.displayName,
        })
      );
      return true;
    } catch (error) {
      const error_code = error.code.replace("auth/", "");
      console.log(authErrors[error_code]);
      dispatch(userActions.SIGN_IN_FAILED(authErrors[error_code]));
      throw error;
    }
  };
};

export const signUpUser = (email, password) => {
  return async (dispatch) => {
    try {
      const userSignUp = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(userActions.SIGN_UP_SUCCESS());
      console.log("success");
      return true;
    } catch (error) {
      const error_code = error.code.replace("auth/", "");
      console.log(authErrors[error_code]);
      dispatch(userActions.SIGN_UP_FAILED(authErrors[error_code]));
      throw error;
    }
  };
};
