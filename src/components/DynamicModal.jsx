import { useDispatch, useSelector } from "react-redux";
import { deleteUserInfo } from "../store/customer.actions";

export default function DynamicModal({ isOpen, onClose }) {
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

  return (
    <>
      {isOpen && (
        <div className="w-full min-h-screen bg-slate-500/60 absolute top-0 left-0 flex justify-center items-center z-10 lg:px-0">
          <div className="w-auto bg-white px-5 py-4 rounded-lg">
            <p className="font-semibold text-2xl text-slate-800">
              Are you sure you want to delete?
            </p>
            <p className="text-slate-600 font-regular text-sm">
              Deleting it means you cannot retrieve anymore.
            </p>

            {deleteOnProcess ? (
              <p>Deleting...</p>
            ) : (
              <div className="flex w-full justify-between gap-2 items-center mt-6">
                <button
                  className="w-1/2 bg-red-400 rounded-md p-2 text-white"
                  onClick={deleteData}
                >
                  Confirm
                </button>

                <button
                  className="w-1/2 bg-gray-400 rounded-md p-2 text-white"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
