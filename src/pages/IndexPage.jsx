import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import GridContainer from "../components/GridContainer";
import Toast from "../components/Toast";
import Modal from "../components/Modal";
import TableContainer from "../components/TableContainer";
import Button from "../components/Button";
import Loading from "../components/Loading";
import DynamicModal from "../components/DynamicModal";
import { customerActions } from "../store/customer.slice";

export default function IndexPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.customer.items);
  const isLoading = useSelector((state) => state.customer.isLoading);
  const status = useSelector((state) => state.customer);
  const userCred = useSelector((state) => state.user.userCredentials);

  const [showToast, setShowToast] = useState(false);
  const [tableStyle, setTableStyle] = useState(false);
  const [editInfo, setEditInfo] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showDynamicModal, setShowDynamicModal] = useState(false);

  useEffect(() => {
    if (status.isLoading) {
      setShowLoading(true);
      const timeOutLoading = setTimeout(() => setShowLoading(false), 2000);
      return () => clearTimeout(timeOutLoading);
    }

    if (
      status.isAddingSuccess ||
      status.isDeletingSuccess ||
      status.isEditingSuccess ||
      status.error
    ) {
      setShowToast(true);
      const timeOutId = setTimeout(() => {
        setShowToast(false);
      }, 1000);

      return () => {
        clearTimeout(timeOutId);
      };
    }
  }, [
    status.isAddingSuccess,
    status.isDeletingSuccess,
    status.isEditingSuccess,
    status.error,
  ]);

  const changeDisplayStyle = () => {
    setTableStyle((prev) => !prev);
  };

  const openModal = () => {
    setIsVisible(true);
  };
  const closeModal = () => {
    setIsVisible(false);
    setEditInfo({});
  };

  const closeDynamicModal = () => setShowDynamicModal(false);

  const handleEditCustomer = (data) => {
    setEditInfo(data);
    openModal();
  };

  const handleDeleteUser = async (id) => {
    await dispatch(customerActions.SET_USERID_TO_DELETE(id));
    setShowDynamicModal(true);
  };

  const getButtonStyle = (isActive) =>
    `text-xl ${!isActive ? "text-black" : "text-slate-400"}`;

  return (
    <>
      {showLoading && <Loading />}
      <DynamicModal isOpen={showDynamicModal} onClose={closeDynamicModal} />
      <Modal isOpen={isVisible} editInfo={editInfo} closeModal={closeModal} />

      <div className="w-full py-2">
        <h1 className="font-bold text-xl mb-2">Customer Information</h1>
        <p>Welcome, {userCred.displayName ? userCred.displayName : "Folks!"}</p>

        <div className="w-full flex flex-col lg:flex-row justify-between items-start py-2">
          <p className="lg:w-96 text-slate-700 text-sm">
            Your list of customer appear here. To add a new customer, click on
            the Add New Customer button.
          </p>

          <div>
            <Button
              onClick={openModal}
              style={
                "rounded-full w-35 bg-purple-600 hover:bg-purple-700 px-5 py-2 mr-2 text-white transition-all mt-2 lg:mt-0"
              }
              label="Add New Customer"
              ariaLabel="add-new-customer"
            />

            <Button
              style={
                "rounded-full w-35 bg-gray-500 hover:bg-gray-700 px-5 py-2 text-white transition-all mt-2 lg:mt-0"
              }
              label="Logout"
              ariaLabel="add-new-customer"
            />
          </div>
        </div>

        <div className="w-full text-end flex justify-end items-center mt-2">
          <button className="mr-2" onClick={changeDisplayStyle}>
            <span className={getButtonStyle(tableStyle)}>
              <ion-icon name="grid-sharp"></ion-icon>
            </span>
          </button>

          <button onClick={changeDisplayStyle}>
            <span className={getButtonStyle(!tableStyle)}>
              <ion-icon name="menu-sharp"></ion-icon>
            </span>
          </button>
        </div>

        {items && items.length > 0 ? (
          tableStyle ? (
            <TableContainer
              items={items}
              tableHead={["Name", "Email", "Phone", "Action"]}
              onEdit={handleEditCustomer}
              onDelete={handleDeleteUser}
              isLoading={isLoading}
            />
          ) : (
            <GridContainer
              items={items}
              onEdit={handleEditCustomer}
              onDelete={handleDeleteUser}
              isLoading={isLoading}
            />
          )
        ) : (
          <p className="text-center text-2xl font-semibold">
            No items available
          </p>
        )}

        {showToast && (
          <Toast
            isError={status.error ? true : false}
            icon={status.error ? "alert-circle-sharp" : "checkmark-sharp"}
            message={
              status.isDeletingSuccess
                ? "Successfully deleted a data"
                : status.isAddingSuccess
                ? "Successfully added a data"
                : status.isEditingSuccess
                ? "Changes saved!"
                : status.error
                ? status.error
                : null
            }
          />
        )}
      </div>
    </>
  );
}
