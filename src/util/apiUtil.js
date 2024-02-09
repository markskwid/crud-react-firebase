import axios from "axios";

const API_BASE_URL = "http://localhost:3001/users/";

export const fetchData = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addCustomer = async (data) => {
  try {
    const response = await axios.post(API_BASE_URL, data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editUser = async (id, data) => {
  try {
    const response = await axios.patch(API_BASE_URL + id, data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    const response = await axios.get(API_BASE_URL + id);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(API_BASE_URL + id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
