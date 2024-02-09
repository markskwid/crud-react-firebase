import { createContext, useEffect, useReducer } from "react";
import {
	fetchData,
	editUser,
	deleteUser,
	addCustomer,
} from "../util/apiUtil.js";
export const CustomerContext = createContext({
	items: [],
	isLoading: true,
	handleAddCustomer: () => {},
	handleDeleteUser: () => {},
});
const reducer = (state, action) => {
	switch (action.type) {
		case "FETCH_START":
			return {
				...state,
				isLoading: true,
			};

		case "FETCH_DATA_SUCCESS":
			return {
				...state,
				items: action.payload,
				isLoading: false,
			};

		case "FETCH_DATA_ERROR":
			return {
				...state,
				items: [],
				isLoading: true,
				error: action.payload,
			};

		case "ADD_CUSTOMER":
			return {
				...state,
				items: action.payload.success
					? [...state.items, action.payload.customer]
					: state.items,
				isAddingSuccess: action.payload.success,
				error: action.payload.success ? "" : action.payload.error,
			};

		case "DELETE_CUSTOMER":
			return {
				...state,
				items: action.payload.success
					? state.items.filter((data) => data.id !== action.payload.id)
					: state.items,
				error: action.payload.success ? "" : action.payload.error,
			};

		case "UPDATE_USER":
			return {
				...state,
				items: action.payload.success
					? state.items.map((data) =>
							data.id === action.payload.id ? action.payload.data : data
					  )
					: state.items,
				isEditingSuccess: action.payload.success,
				error: action.payload.success ? "" : action.payload.error,
			};

		case "RESET_EDITING_SUCCESS":
			return {
				...state,
				isEditingSuccess: false,
			};

		case "RESET_ADDING_SUCCESS":
			return {
				...state,
				isAddingSuccess: false,
			};

		case "RESET_ERROR": {
			return {
				...state,
				error: "",
			};
		}

		default:
			return state;
	}
};

export default function CustomerContextProvider({ children }) {
	const [customer, customerDispatcher] = useReducer(reducer, {
		items: [],
		isLoading: true,
		isAddingSuccess: false,
		isEditingSuccess: false,
		error: "",
	});

	const fetchDataAndDispatch = async () => {
		customerDispatcher({ type: "FETCH_START" });
		try {
			const data = await fetchData();
			customerDispatcher({
				type: "FETCH_DATA_SUCCESS",
				payload: data,
			});
		} catch (error) {
			customerDispatcher({
				type: "FETCH_DATA_ERROR",
				payload: "Error getting data",
			});
		}
	};

	const handleEditUser = async (data) => {
		const { id } = data;
		try {
			const response = await editUser(id, data);
			const payload = {
				success: true,
				id,
				data: response.data, //response.data return the updated data
				error: "",
			};
			customerDispatcher({
				type: "UPDATE_USER",
				payload: payload,
			});

			customerDispatcher({ type: "RESET_ERROR" });
		} catch (error) {
			const payload = {
				success: false,
				id: null,
				data: null,
				error: "Error updating user",
			};
			customerDispatcher({
				type: "UPDATE_USER",
				payload: payload,
			});
			console.log(error);
		}
	};

	const handleDeleteUser = async (id) => {
		try {
			await deleteUser(id);

			const payload = {
				success: true,
				id,
				error: "",
			};

			customerDispatcher({
				type: "DELETE_CUSTOMER",
				payload: payload,
			});
			customerDispatcher({ type: "RESET_ERROR " });
		} catch (error) {
			const payload = {
				success: false,
				id: null,
				error: "Error deleting data",
			};

			customerDispatcher({
				type: "DELETE_CUSTOMER",
				payload: payload,
			});
			console.log(error);
		}
	};

	const handleAddCustomer = async (data) => {
		try {
			const response = await addCustomer(data);

			const payload = {
				success: true,
				customer: response.data,
				error: "",
			};

			customerDispatcher({
				type: "ADD_CUSTOMER",
				payload: payload,
			});
			customerDispatcher({ type: "RESET_ERROR " });
		} catch (error) {
			const payload = {
				success: false,
				customer: null,
				error: "Error adding a new data",
			};

			customerDispatcher({
				type: "ADD_CUSTOMER",
				payload: payload,
			});
			console.log(error);
		}
	};

	//useEffect for isEditingSuccess
	useEffect(() => {
		const resetIsEditingSuccess = () => {
			if (customer.isEditingSuccess) {
				const timeoutId = setTimeout(() => {
					customerDispatcher({
						type: "RESET_EDITING_SUCCESS",
					});
				}, 2000);

				return () => clearTimeout(timeoutId);
			}
		};

		resetIsEditingSuccess();
	}, [customer.isEditingSuccess]);

	//useEffect for isAddingSuccess
	useEffect(() => {
		const resetIsAddingSuccess = () => {
			if (customer.isAddingSuccess) {
				const timeoutId = setTimeout(() => {
					customerDispatcher({
						type: "RESET_ADDING_SUCCESS",
					});
				}, 2000);

				return () => clearTimeout(timeoutId);
			}
		};

		resetIsAddingSuccess();
	}, [customer.isAddingSuccess]);

	//useEffect for data fetching only getting data once
	useEffect(() => {
		fetchDataAndDispatch();
	}, []);

	const customerCtx = {
		items: customer.items,
		isAddingSuccess: customer.isAddingSuccess,
		isLoading: customer.isLoading,
		isEditingSuccess: customer.isEditingSuccess,
		error: customer.error,
		handleAddCustomer,
		handleDeleteUser,
		handleEditUser,
		fetchData,
	};

	return (
		<CustomerContext.Provider value={customerCtx}>
			{children}
		</CustomerContext.Provider>
	);
}
