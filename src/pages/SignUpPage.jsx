import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInUser, signUpUser } from "../store/user.action";
import { useNavigate, Link } from "react-router-dom";
import { userActions } from "../store/user.slice";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.signUpError);
  const signUpSuccess = useSelector((state) => state.user.signUpSuccess);

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    confirmPass: "",
  });

  const [notSamePasswordError, setNotSamePasswordError] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setUserCredentials({
      ...userCredentials,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userCredentials.confirmPass === userCredentials.password) {
      dispatch(signUpUser(userCredentials.email, userCredentials.password))
        .then((response) => {
          setUserCredentials({
            email: "",
            password: "",
            confirmPass: "",
          });
          setNotSamePasswordError(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setNotSamePasswordError(true);
    }
  };

  const handleBackButton = () => {
    dispatch(userActions.RESET_SIGNUP_ERROR());
    navigate("/crud-react-firebase");
  };

  const getButtonColor = (isSame) =>
    `w-full ${
      isSame ? "bg-purple-800 text-white" : "bg-gray-300 text-slate-600"
    } xl:text-lg xl:w-72 lg:w-40 py-4 lg:py-3 xl:py-4 px-5 rounded-lg font-semibold transition-all my-4 lg:mb-0 self-center hover:shadow-2xl`;

  return (
    <>
      <div className="w-full flex justify-center items-center h-[50em]">
        <div className="w-[30em] px-7 py-5">
          <h1 className="text-3xl font-bold text-slate-800">
            <button onClick={handleBackButton}>
              <span className="text-lg mr-2" aria-hidden="true" aria-label="">
                <ion-icon name="arrow-back-sharp"></ion-icon>
              </span>
            </button>
            Create an account
          </h1>

          {error && (
            <div className="w-f-full border  bg-red-300 p-3 text-slate-800 font-semibold my-2 rounded-lg">
              {error}
            </div>
          )}

          {notSamePasswordError && (
            <div className="w-f-full border  bg-red-300 p-3 text-slate-800 font-semibold my-2 rounded-lg">
              Password didn't matched
            </div>
          )}

          <form
            action="POST"
            className="flex flex-col justify-center mt-4"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="email"
              className="font-semibold mb-1 text-slate-700"
            >
              Email
            </label>
            <input
              type="text"
              className="w-full border border-slate-400 p-3 rounded-lg my-1 outline-none focus:ring-1 focus:ring-slate-500 mb-2"
              id="email"
              onChange={handleInputChange}
              value={userCredentials.email}
            />
            <label
              htmlFor="email"
              className="font-semibold mb-1 text-slate-700"
            >
              Password
            </label>
            <input
              type="text"
              className="w-full border border-slate-400 p-3 rounded-lg my-1 outline-none focus:ring-1 focus:ring-slate-500 mb-2"
              id="password"
              onChange={handleInputChange}
              value={userCredentials.password}
            />

            {userCredentials.password.length > 8 && (
              <>
                <label
                  htmlFor="email"
                  className="font-semibold mb-1 text-slate-700"
                >
                  Confirm Password
                </label>
                <input
                  type="text"
                  className="w-full border border-slate-400 p-3 rounded-lg my-1 outline-none focus:ring-1 focus:ring-slate-500 mb-2"
                  id="confirmPass"
                  onChange={handleInputChange}
                  value={userCredentials.confirmPass}
                />
              </>
            )}

            <button
              type="submit"
              className={getButtonColor(
                userCredentials.password === userCredentials.confirmPass &&
                  userCredentials.confirmPass !== ""
              )}
            >
              Confirm
            </button>
          </form>

          {signUpSuccess && (
            <p className="text-center my-2 ">Sign up success</p>
          )}
        </div>
      </div>
    </>
  );
}
