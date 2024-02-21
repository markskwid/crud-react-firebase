import { customerActions } from "./customer.slice";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import db from "../firebase/firebase";

export const fetchCustomerData = () => {
  return async (dispatch) => {
    try {
      dispatch(customerActions.FETCH_START());

      const q = query(collection(db, "users"));
      const querySnapshots = await getDocs(q);

      const data = [];

      querySnapshots.forEach((doc) => {
        data.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      console.log("fetched_data", data);

      dispatch(
        customerActions.FETCH_SUCCESS({
          items: data,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        customerActions.FETCH_DATA_ERROR({
          error: "Error getting data",
        })
      );
    }
  };
};

export const addCustomerInfo = (customerData) => {
  return async (dispatch) => {
    dispatch(customerActions.ADD_LOADING());
    try {
      // const response = await addCustomer(customerData);

      const response = await addDoc(collection(db, "users"), {
        ...customerData,
      });

      dispatch(
        customerActions.ADD_CUSTOMER({
          newData: {
            ...customerData,
            id: response.id,
          },
          success: true,
        })
      );

      setTimeout(() => dispatch(customerActions.ADD_CUSTOMER_SUCCESS()), 1100);
    } catch (error) {
      console.log(error);
      dispatch(
        customerActions.ADD_CUSTOMER({
          success: false,
          error: "Error adding data",
        })
      );
    }
  };
};

export const updateUserInfo = (data) => {
  return async (dispatch) => {
    const { id } = data;
    try {
      // const response = await editUser(id, data);
      delete data.id; // delete the id, so that it doesnt insert in the json
      const response = await updateDoc(doc(db, "users", id), { ...data });
      dispatch(
        customerActions.EDIT_CUSTOMER({
          id,
          newData: { ...data, id },
          success: true,
        })
      );
      setTimeout(() => dispatch(customerActions.EDIT_CUSTOMER_SUCCESS()), 1100);
    } catch (error) {
      dispatch(
        customerActions.EDIT_CUSTOMER({
          success: false,
          error: "Error updating user",
        })
      );
      console.log(error);
    }
  };
};

export const deleteUserInfo = (id) => {
  return async (dispatch) => {
    dispatch(customerActions.DELETE_ON_PROCESS());
    try {
      await deleteDoc(doc(db, "users", id));
      dispatch(
        customerActions.DELETE_CUSTOMER({
          id,
          success: true,
        })
      );

      setTimeout(
        () => dispatch(customerActions.DELETE_CUSTOMER_SUCCESS()),
        1100
      );

      return true;
    } catch (error) {
      dispatch(
        customerActions.DELETE_CUSTOMER({
          error: "Error deleting data",
          success: false,
        })
      );
      console.log(error);
      throw error;
    }
  };
};

// add loading for adding and updating
// update the dynamic modal component so that it can use it logout
