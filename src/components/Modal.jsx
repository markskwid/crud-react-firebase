import { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../store/CustomerStore";
import { v4 as generateId } from "uuid";
import Button from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { addCustomerInfo, updateUserInfo } from "../store/customer.actions";
import { formatName } from "../util/util";
import {
  isNameValid,
  isDuplicate,
  isEmailValid,
  isPhoneValid,
} from "../util/validation";

export default function Modal({ isOpen, editInfo, closeModal }) {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer);

  const [error, setError] = useState({
    name: false,
    email: false,
    duplicateEmail: false,
    phone: false,
  });

  const [information, setUserInformation] = useState({
    name: editInfo?.name || "",
    email: editInfo?.email || "",
    phone: editInfo?.phone || "",
  });

  useEffect(() => {
    setUserInformation({
      name: editInfo?.name || "",
      email: editInfo?.email || "",
      phone: editInfo?.phone || "",
    });
  }, [editInfo]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserInformation({
      ...information,
      [id]: value,
    });
  };

  const closeThisModal = () => {
    resetValue();
    closeModal();
  };

  const resetValue = () => {
    setError({
      name: false,
      email: false,
      duplicateEmail: false,
      phone: false,
    });
  };

  const validateForm = () => {
    const errors = {
      name: information.name.trim() === "" || isNameValid(information.name),
      email: information.email.trim() === "" || isEmailValid(information.email),
      duplicateEmail: isDuplicate(
        information.email,
        editInfo?.email,
        customers.items
      ),
      phone: information.phone.trim() === "" || isPhoneValid(information.phone),
    };

    setError(errors);
    return Object.values(errors).some((error) => error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      //check if edit info have value so it will go to different end point
      const updateName = {
        ...information,
        name: formatName(information.name),
      };
      if (editInfo.name && editInfo.id && editInfo.email && editInfo.phone) {
        dispatch(
          updateUserInfo({
            ...updateName,
            id: editInfo.id,
          })
        );
      } else {
        //add endpoint
        dispatch(addCustomerInfo(updateName));
      }
      closeThisModal();
    }
  };

  const getInputClassName = (errorCondition) => {
    return `w-full border p-2 ${
      errorCondition ? "border-2 border-red-600" : "border-slate-400"
    } rounded-lg my-1 outline-none focus:ring-1 focus:ring-slate-500`;
  };

  return (
    isOpen && (
      <div className="w-full min-h-screen bg-slate-500/60 absolute top-0 left-0 flex justify-center items-center z-10 lg:px-0">
        <div className="w-[90%] lg:w-96 rounded-lg p-8 bg-white">
          <div className="w-full">
            <form method="post" onSubmit={onSubmit}>
              <div className="mb-5">
                <label htmlFor="name" className="font-semibold mb-1">
                  Name
                </label>
                <input
                  type="text"
                  onChange={handleInputChange}
                  id="name"
                  value={information.name}
                  className={getInputClassName(error.name)}
                />
                {error.name && (
                  <p className="text-xs text-red-400 m-0">
                    Input your proper full name
                  </p>
                )}
              </div>
              <div className="mb-5">
                <label htmlFor="phone" className="font-semibold mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  onChange={handleInputChange}
                  id="phone"
                  value={information.phone}
                  className={getInputClassName(error.phone)}
                />
                {error.phone && (
                  <p className="text-xs text-red-400 m-0">
                    Input your proper contact number
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="font-semibold mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  onChange={handleInputChange}
                  id="email"
                  value={information.email}
                  className={getInputClassName(
                    error.email || error.duplicateEmail
                  )}
                />
                {error.email ? (
                  <p className="text-xs text-red-400 m-0">
                    Input your proper email address
                  </p>
                ) : error.duplicateEmail ? (
                  <p className="text-xs text-red-400 m-0">
                    This email is already taken
                  </p>
                ) : null}
              </div>

              <div className="w-full flex flex-col-reverse lg:flex-row justify-between items-center mt-5">
                <Button
                  type="button"
                  onClick={closeThisModal}
                  style="w-full lg:w-32 py-3 px-5 border-2 border-purple-600 rounded-full font-semibold text-slate-600 transition-all hover:bg-purple-600 hover:text-white"
                  label="Close"
                />

                <Button
                  type="submit"
                  style={`w-full lg:w-40 py-4 lg:py-3 px-5 ${
                    information.name || information.email || information.phone
                      ? "bg-purple-600 text-white"
                      : "bg-gray-300 text-slate-600"
                  } rounded-full font-semibold transition-all mb-4 lg:mb-0`}
                  label={
                    editInfo.name &&
                    editInfo.id &&
                    editInfo.email &&
                    editInfo.phone
                      ? "Save Changes"
                      : "Add Contact"
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
}
