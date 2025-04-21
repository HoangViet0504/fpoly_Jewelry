import React, { useState } from "react";
import Container from "../../Container";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RestApi } from "../../../api/utils/axios";
import { ToastMessage } from "../../ToastMessage";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../common/constant";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
});
const validationSchema1 = Yup.object({
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
  otp: Yup.string()
    .length(6, "Mã OTP phải có 6 ký tự")
    .required("Vui lòng nhập mã OTP"),
});
export default function ResetPasswordContent(): React.ReactElement {
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await RestApi.post("checkEmailRequest", {
          email: values.email,
        });
        setIsCheck(true);
        ToastMessage("success", response.data.message);
      } catch (error: any) {
        ToastMessage("error", error?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    },
  });
  const formik1 = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
      otp: "",
    },
    validationSchema: validationSchema1,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await RestApi.post("updatePasswordRequest", {
          email: formik.values.email,
          password: values.confirm_password,
          otp: values.otp,
        });
        ToastMessage("success", response.data.message);
        navigate(paths.auth.signIn, { replace: true });
        formik.resetForm();
        formik1.resetForm();
        setIsCheck(false);
      } catch (error: any) {
        ToastMessage("error", error?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    },
  });
  return (
    <div>
      <Container>
        <div className="min-h-full flex">
          <div className="flex-1 flex flex-col justify-center  px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  Lấy lại mật khẩu
                </h2>
              </div>

              <div className="mt-8">
                <div className="mt-6">
                  <form
                    onSubmit={
                      isCheck ? formik1.handleSubmit : formik.handleSubmit
                    }
                    className="space-y-6"
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          disabled={isCheck}
                          placeholder="Vui lòng nhập email"
                          id="email"
                          name="email"
                          type="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      {formik.touched.email && formik.errors.email && (
                        <p
                          className={`mt-1 text-sm text-red-500 transition-opacity duration-200 ${
                            formik.touched.email && formik.errors.email
                              ? "opacity-100 visible"
                              : "opacity-0 invisible"
                          }`}
                        >
                          {formik.errors.email}
                        </p>
                      )}
                    </div>
                    {isCheck && (
                      <>
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
                              id="password"
                              name="password"
                              onChange={formik1.handleChange}
                              value={formik1.values.password}
                              onFocus={() => setCheckPassword(true)}
                              onBlur={(e) => {
                                setCheckPassword(false);
                                formik1.handleBlur(e);
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
                          {formik1.touched.password &&
                            formik1.errors.password && (
                              <p
                                className={`mt-1 text-sm text-red-500 transition-opacity duration-200 ${
                                  formik1.touched.password &&
                                  formik1.errors.password
                                    ? "opacity-100 visible"
                                    : "opacity-0 invisible"
                                }`}
                              >
                                {formik1.errors.password}
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
                              onChange={formik1.handleChange}
                              value={formik1.values.confirm_password}
                              onFocus={() => setCheckConfirmPassword(true)}
                              onBlur={(e) => {
                                setCheckConfirmPassword(false);
                                formik1.handleBlur(e);
                              }}
                              type={checkConfirmPassword ? "text" : "password"}
                              autoComplete="current-password"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <button
                              style={{ cursor: "pointer" }}
                              type="button"
                              onClick={() =>
                                setCheckPassword(!checkConfirmPassword)
                              }
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            >
                              {checkConfirmPassword ? "Ẩn" : "Hiện"}
                            </button>
                          </div>
                          {formik1.touched.confirm_password &&
                            formik1.errors.confirm_password && (
                              <p
                                className={`mt-1 text-sm text-red-500 transition-opacity duration-200 ${
                                  formik1.touched.confirm_password &&
                                  formik1.errors.confirm_password
                                    ? "opacity-100 visible"
                                    : "opacity-0 invisible"
                                }`}
                              >
                                {formik1.errors.confirm_password}
                              </p>
                            )}
                        </div>

                        <div className="space-y-1">
                          <label
                            htmlFor="otp"
                            className="block text-sm font-medium text-gray-700"
                          >
                            OTP
                          </label>
                          <div className="mt-1 flex justify-between">
                            {Array.from({ length: 6 }).map((_, index) => (
                              <input
                                key={index}
                                id={`otp-${index}`}
                                name="otp"
                                type="text"
                                maxLength={1}
                                value={formik1.values.otp[index] || ""}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const otpArray = formik1.values.otp.split("");
                                  otpArray[index] = value;

                                  // Cập nhật giá trị OTP sau khi người dùng nhập
                                  formik1.setFieldValue(
                                    "otp",
                                    otpArray.join("")
                                  );

                                  // Chuyển đến ô tiếp theo nếu có giá trị nhập
                                  if (value && index < 5) {
                                    document
                                      .getElementById(`otp-${index + 1}`)
                                      ?.focus();
                                  }

                                  // Quay lại ô trước nếu giá trị bị xóa
                                  if (!value && index > 0) {
                                    document
                                      .getElementById(`otp-${index - 1}`)
                                      ?.focus();
                                  }
                                }}
                                className="appearance-none w-12 h-12 text-center px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                            ))}
                          </div>

                          {/* Hiển thị lỗi OTP nếu có */}
                          {formik1.errors.otp && formik1.touched.otp && (
                            <div className="text-sm text-red-500">
                              {formik1.errors.otp}
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    <div>
                      <button
                        disabled={isLoading}
                        style={{ cursor: "pointer" }}
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        {isLoading ? (
                          <CircularProgress
                            sx={{ color: "#fff" }}
                            size="20px"
                          />
                        ) : isCheck ? (
                          "Xác nhận"
                        ) : (
                          "Gửi mã xác nhận"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative w-0 flex-1">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
              alt=""
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
