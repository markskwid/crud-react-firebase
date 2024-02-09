import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInUser, signUpGoogle } from "../store/user.action";
import { useNavigate } from "react-router-dom";
import { isEmailValid, isPasswordValid } from "../util/validation";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.loginError);

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [inputError, setError] = useState({
    email: false,
    password: false,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setUserCredentials({
      ...userCredentials,
      [id]: value,
    });
  };

  const isInputsValid = () => {
    const errors = {
      email: isEmailValid(userCredentials.email),
      password: isPasswordValid(userCredentials.password),
    };

    setError(errors);
    return Object.values(errors).some((error) => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isInputsValid()) {
      dispatch(signInUser(userCredentials.email, userCredentials.password))
        .then((response) => {
          response && navigate("/home");
        })
        .catch((error) => console.log(error));
    } else {
      console.log("error on inputs");
    }
  };

  const signUpUsingGoogle = () => {
    dispatch(signUpGoogle())
      .then((response) => {
        console.log(response);
        if (response) {
          navigate("/home");
        }
      })
      .catch((error) => console.log(error));
  };

  const getInputClassName = (errorCondition) => {
    return `w-full border p-2 ${
      errorCondition ? "border-2 border-red-600" : "border-slate-400"
    } rounded-lg my-1 outline-none focus:ring-1 focus:ring-slate-500`;
  };

  return (
    <>
      <div className="w-full flex justify-center items-center h-[50em]">
        <div className="w-[30em] px-7 py-5">
          <h1 className="text-3xl font-bold text-slate-800">
            Enter your account
          </h1>

          {error && (
            <div className="w-f-full border  bg-red-300 p-3 text-slate-800 font-semibold my-2 rounded-lg">
              {error}
            </div>
          )}

          <form
            action="POST"
            className="flex flex-col justify-center mt-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-5">
              <label htmlFor="email" className="font-semibold mb-1">
                Email Address
              </label>
              <input
                type="text"
                onChange={handleInputChange}
                id="email"
                value={userCredentials.email}
                className={getInputClassName(inputError.email)}
              />
              {inputError.email && (
                <p className="text-xs text-red-400 m-0">
                  Input your proper email address
                </p>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                onChange={handleInputChange}
                id="password"
                value={userCredentials.password}
                className={getInputClassName(inputError.password)}
              />
              {inputError.password && (
                <p className="text-xs text-red-400 m-0">
                  Input your proper password
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gray-300 text-slate-600 xl:text-lg xl:w-72 lg:w-40 py-4 lg:py-3 xl:py-4 px-5 rounded-lg font-semibold transition-all my-4 lg:mb-0 self-center hover:bg-purple-500 hover:text-white"
            >
              Login
            </button>

            <button
              type="button"
              className="w-full bg-gray-300 text-slate-600 xl:text-lg xl:w-72 lg:w-40 py-4 lg:py-3 xl:py-4 px-5 rounded-lg font-semibold transition-all my-4 lg:mb-0 self-center flex justify-center items-center gap-3 hover:bg-purple-500 hover:text-white"
              onClick={() => navigate("/signup")}
            >
              <ion-icon name="mail-sharp"></ion-icon>
              Sign up using email
            </button>

            <button
              type="button"
              className="w-full bg-gray-300 text-slate-600 xl:text-lg xl:w-72 lg:w-40 py-4 lg:py-3 xl:py-4 px-5 rounded-lg font-semibold transition-all my-4 lg:mb-0 self-center flex justify-center items-center gap-3 hover:bg-purple-500 hover:text-white"
              onClick={signUpUsingGoogle}
            >
              <ion-icon name="logo-google"></ion-icon>
              Sign in using Google
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
