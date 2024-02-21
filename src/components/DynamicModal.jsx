import { useDispatch, useSelector } from "react-redux";
import { deleteUserInfo } from "../store/customer.actions";
import { logoutUser } from "../store/user.action";
import { useNavigate } from "react-router-dom";

export default function DynamicModal({ isOpen, onClose, isLogout }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.customer.userIdToDelete);
  const deleteOnProcess = useSelector((state) => state.customer.deleteLoading);

  const deleteData = () => {
    dispatch(deleteUserInfo(userId))
      .then((response) => {
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOutUser = () => {
    dispatch(logoutUser())
      .then((response) => navigate("/"))
      .catch((error) => console.log(error));
  };

  const LoadingCircle = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        height="1.5em"
        className="animate-spin mx-auto"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#ccc"
          stroke-width="10"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="black"
          stroke-width="10"
          stroke-dasharray="240"
          stroke-dashoffset="0"
        ></circle>
      </svg>
    );
  };

  return (
    <>
      {isOpen && (
        <div className="w-full min-h-screen bg-slate-500/60 absolute top-0 left-0 flex justify-center items-center z-10 lg:px-0">
          <div className="w-auto bg-white px-5 py-4 rounded-lg">
            <p className="font-semibold text-2xl text-slate-800">
              {isLogout
                ? "Are you sure you want to logout?"
                : "Are you sure you want to delete?"}
            </p>
            {!isLogout && (
              <p className="text-slate-600 font-regular text-sm">
                Deleting it means you cannot retrieve anymore.
              </p>
            )}

            <div className="flex w-full justify-between gap-2 items-center mt-6">
              <button
                className="w-1/2 bg-red-400 rounded-md p-2 text-white"
                onClick={isLogout ? signOutUser : deleteData}
                disabled={deleteOnProcess}
              >
                {deleteOnProcess ? <LoadingCircle /> : "Confirm"}
              </button>

              <button
                className="w-1/2 bg-gray-400 rounded-md p-2 text-white"
                onClick={onClose}
                disabled={deleteOnProcess}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
