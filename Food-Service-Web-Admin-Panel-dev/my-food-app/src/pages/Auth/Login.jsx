import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../assets";
import { loginValidationSchema } from "../../schema";
import { useLoginMutation } from "../../apis/authentication";
import { toast } from "react-toastify";
import "./style.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        setDisabled(true);
        const apiResponse = await login(values).unwrap();
        const responseData = {
          userId: apiResponse.data.userId,
          roleId: apiResponse.data.roleId,
          roleName: apiResponse.data.roleName,
          isFirstLogin: apiResponse.data.isFirstLogin,
        };
        localStorage.setItem("adminData", JSON.stringify(responseData));
        localStorage.setItem("token", JSON.stringify(apiResponse.data.token));
        toast.success(apiResponse.message);
      } catch (err) {
        setDisabled(false);
        if (err) {
          toast.error(err?.data?.message);
        }
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !isLoading && !disabled) {
      event.preventDefault();
      formik.handleSubmit();
    }
  };

  return (
    <div className="bg-custom-secondary">
      <div className="flex justify-center items-center vh-100">
        <div className="bg-white p-5 text-center rounded-4 shadow">
          <h3 className="font-medium fw-medium py-2">Welcome Back!</h3>
          <p className="text-muted mb-2">
            Enter your credentials to access your account
          </p>
          <form onSubmit={formik.handleSubmit} className="text-start">
            <div className="mb-3 mt-4">
              <label htmlFor="email" className="d-block mb-1 fs-6">
                Email
              </label>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-100 p-2 border border-muted rounded-3 outline-none onfocus field-height"
                  placeholder="Enter Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  onKeyDown={handleKeyDown}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger mt-2 fs-7">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="mt-3 mb-4 position-relative">
              <label htmlFor="password" className="d-block mb-1 fs-6">
                Password
              </label>
              <div className="flex items-center border border-muted onfocus rounded-3 mb-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-100 p-2 border-0 outline-none field-height"
                  placeholder="Enter Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  onKeyDown={handleKeyDown}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="me-2 flex items-center fs-5 text-secondary field-height cursor-pointer"
                >
                  {showPassword ? <Icons.GreyEye /> : <Icons.CloseEye />}
                </span>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger mt-2 fs-7">
                  {formik.errors.password}
                </div>
              ) : null}
              <span
                className="flex justify-end text-custom-primary cursor-pointer"
                onClick={() => navigate("/auth/forget-password")}
              >
                Forgot password?
              </span>
            </div>
            <button
              type="submit"
              className={`w-100 field-height my-2 text-white bg-custom-primary p-2 border-0 rounded-3 input-focus flex items-center justify-center ${
                disabled ? "opacity-75" : ""
              }`}
              disabled={isLoading || disabled}
            >
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
