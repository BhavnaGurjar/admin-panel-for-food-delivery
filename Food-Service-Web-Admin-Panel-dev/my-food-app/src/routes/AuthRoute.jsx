import { Routes, Route } from "react-router-dom";
import { authRouteConstants } from "./routesConstants";
import { Login, ForgetPassword } from "../pages/Auth";

export const AuthRoute = () => {
  return (
    <Routes>
      <Route path={authRouteConstants.logIn} element={<Login />} />
      <Route
        path={authRouteConstants.forgetPassword}
        element={<ForgetPassword />}
      />
    </Routes>
  );
};

export default AuthRoute;
