import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CircularProgress } from "@mui/material";
import { RestApi } from "../../api/utils/axios";
import { ToastMessage } from "../ToastMessage";
import { useAuthStore } from "../../stores/useAuthStore";

const validationSchema = Yup.object({
  currentPassword: Yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu mới")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu mới xác nhận không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
});
export default function ChangePassword(): React.ReactElement {
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(false);
  const [checkCurrentPassword, setCheckCurrentPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await RestApi.post("/UpdatePassword", {
          id: user?.id_user,
          currentPassword: values.currentPassword,
          password: values.confirm_password,
        });
        ToastMessage("success", response.data.message);
        formik.resetForm();
      } catch (error: any) {
        ToastMessage("error", error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    },
  });
  return (
    <div className="max-w-md mx-auto    rounded-lg ">
      <h2 className="text-2xl font-bold mb-6 text-center">Đổi mật khẩu</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Mật khẩu
          </label>
          <div className="mt-1 relative">
            <input
              placeholder="Vui lòng nhập mật khẩu của bạn "
              id="currentPassword"
              name="currentPassword"
              onChange={formik.handleChange}
              value={formik.values.currentPassword}
              onFocus={() => setCheckCurrentPassword(true)}
              onBlur={(e) => {
                setCheckCurrentPassword(false);
                formik.handleBlur(e);
              }}
              type={checkCurrentPassword ? "text" : "password"}
              autoComplete="current-password"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              style={{ cursor: "pointer" }}
              type="button"
              onClick={() => setCheckPassword(!checkCurrentPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {checkCurrentPassword ? "Ẩn" : "Hiện"}
            </button>
          </div>
          {formik.touched.currentPassword && formik.errors.currentPassword && (
            <p
              className={`mt-1 text-sm text-red-500 transition-opacity duration-200 ${
                formik.touched.currentPassword && formik.errors.currentPassword
                  ? "opacity-100 visible"
                  : "opacity-0 invisible"
              }`}
            >
              {formik.errors.currentPassword}
            </p>
          )}
        </div>

        <div className="">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Mật khẩu mới
          </label>
          <div className="mt-1 relative">
            <input
              placeholder="Vui lòng nhập lại mật khẩu của bạn "
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onFocus={() => setCheckPassword(true)}
              onBlur={(e) => {
                setCheckPassword(false);
                formik.handleBlur(e);
              }}
              type={checkPassword ? "text" : "password"}
              autoComplete="current-password"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              style={{ cursor: "pointer" }}
              type="button"
              onClick={() => setCheckPassword(!checkPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {checkPassword ? "Ẩn" : "Hiện"}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p
              className={`mt-1 text-sm text-red-500 transition-opacity duration-200 ${
                formik.touched.password && formik.errors.password
                  ? "opacity-100 visible"
                  : "opacity-0 invisible"
              }`}
            >
              {formik.errors.password}
            </p>
          )}
        </div>

        <div className="">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Xác nhận mật khẩu
          </label>
          <div className="mt-1 relative">
            <input
              placeholder="Vui lòng nhập lại mật khẩu của bạn "
              id="confirm_password"
              name="confirm_password"
              onChange={formik.handleChange}
              value={formik.values.confirm_password}
              onFocus={() => setCheckConfirmPassword(true)}
              onBlur={(e) => {
                setCheckConfirmPassword(false);
                formik.handleBlur(e);
              }}
              type={checkConfirmPassword ? "text" : "password"}
              autoComplete="current-password"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              style={{ cursor: "pointer" }}
              type="button"
              onClick={() => setCheckPassword(!checkConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {checkConfirmPassword ? "Ẩn" : "Hiện"}
            </button>
          </div>
          {formik.touched.confirm_password &&
            formik.errors.confirm_password && (
              <p
                className={`mt-1 text-sm text-red-500 transition-opacity duration-200 ${
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
              >
                {formik.errors.confirm_password}
              </p>
            )}
        </div>
        <button
          disabled={isLoading}
          style={{ cursor: "pointer" }}
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-lg hover:opacity-80 transition-colors"
        >
          {isLoading ? (
            <CircularProgress sx={{ color: "#fff" }} size="20px" />
          ) : (
            "Đổi mật khẩu"
          )}
        </button>
      </form>
    </div>
  );
}
