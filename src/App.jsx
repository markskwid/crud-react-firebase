import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import IndexPage from "./pages/IndexPage";
import ErrorPage from "./pages/ErrorPage";
import ViewPage from "./pages/ViewPage";
import { useEffect } from "react";
import { fetchCustomerData } from "./store/customer.actions";
import Login from "./pages/Login";
import SignUp from "./pages/SignUpPage";

function App() {
  const dispatch = useDispatch();
  const isAuthed = useSelector((state) => state.user.isAuth);

  useEffect(() => {
    if (isAuthed) {
      dispatch(fetchCustomerData());
      console.log("User is now authed");
    } else {
      console.log("User is not auth");
    }
  }, [isAuthed]);

  return (
    <main>
      <Router>
        <Routes>
          <Route path="/crud-react-firebase" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/home"
            element={isAuthed ? <IndexPage /> : <Navigate to="/" />}
          />
          <Route
            path="/view-customer/:id"
            element={isAuthed ? <ViewPage /> : <Navigate to="/" />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
