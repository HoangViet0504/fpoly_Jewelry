import React, { useState } from "react";
import Container from "../../Container";
import { paths } from "../../../helper/constant";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PostNoToken } from "../../../api/utils/axios";
import { ToastMessage } from "../../ToastMessage";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  first_name: Yup.string().required("Vui lòng nhập họ"),
  last_name: Yup.string().required("Vui lòng nhập tên"),
  phone: Yup.string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^[0-9]{10,11}$/, "Số điện thoại phải gồm 10 đến 11 chữ số"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
});
export default function SignUpContent(): React.ReactElement {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [checkPassword, setCheckPassword] = useState(false);
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const result = await PostNoToken<{ message: string }>("auth/register", {
          first_name: values.first_name,
          last_name: values.last_name,
          phone: values.phone,
          email: values.email,
          password: values.password,
          confirm_password: values.confirm_password,
        });
        ToastMessage("success", result.message);
        navigate(paths.auth.signIn, { replace: true });
      } catch (error) {
        // ToastMessage("error", error as string);
        // console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <Container>
      <div className="min-h-full flex">
        <div className="flex-1 flex flex-col justify-center  px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Đăng ký tài khoản
              </h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form onSubmit={formik.handleSubmit} className="space-y-3">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Họ
                    </label>
                    <div className="mt-1">
                      <input
                        placeholder="Vui lòng nhập họ của bạn "
                        onChange={formik.handleChange}
                        value={formik.values.first_name}
                        onBlur={formik.handleBlur}
                        id="first_name"
                        name="first_name"
                        type="text"
                        autoComplete="first_name"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    {formik.touched.first_name && formik.errors.first_name && (
                      <p
                        className={`mt-1 text-sm text-red-500 transition-opacity duration-200 ${
                          formik.touched.first_name && formik.errors.first_name
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                        }`}
                      >
                        {formik.errors.first_name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tên
                    </label>
                    <div className="mt-1">
                      <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        placeholder="Vui lòng nhập tên của bạn "
                        onChange={formik.handleChange}
                        value={formik.values.last_name}
                        onBlur={formik.handleBlur}
                        autoComplete="email"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    {formik.touched.last_name && formik.errors.last_name && (
                      <p
                        className={`mt-1 text-sm text-red-500 transition-opacity duration-200 ${
                          formik.touched.last_name && formik.errors.last_name
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                        }`}
                      >
                        {formik.errors.last_name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Vui lòng nhập tên của bạn "
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        autoComplete="email"
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

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Số điện thoại
                    </label>
                    <div className="mt-1">
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        autoComplete="email"
                        placeholder="Vui lòng nhập số điện thoại của bạn "
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        onBlur={formik.handleBlur}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    {formik.touched.phone && formik.errors.phone && (
                      <p
                        className={`mt-1 text-sm text-red-500 transition-opacity duration-200 ${
                          formik.touched.phone && formik.errors.phone
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                        }`}
                      >
                        {formik.errors.phone}
                      </p>
                    )}
                  </div>

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

                  <div>
                    <span>Bạn đã có tài khoản? </span>
                    <a
                      className="text-blue-500 hover:text-blue-700 hover:underline"
                      href={paths.auth.signIn}
                    >
                      Đăng nhập
                    </a>
                  </div>

                  <button
                    style={{ cursor: "pointer" }}
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {loading ? (
                      <CircularProgress sx={{ color: "#fff" }} size="30px" />
                    ) : (
                      "Đăng ký"
                    )}
                  </button>
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
  );
}
