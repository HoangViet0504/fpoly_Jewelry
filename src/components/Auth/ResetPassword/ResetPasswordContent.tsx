import React from "react";
import Container from "../../Container";
import { paths } from "../../../helper/constant";

export default function ResetPasswordContent(): React.ReactElement {
  return (
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
                <form action="#" method="POST" className="space-y-6">
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
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mật khẩu mới
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Xác nhận mật khẩu mới
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
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
                          name={`otp-${index}`}
                          type="text"
                          maxLength={1}
                          required
                          className="appearance-none w-12 h-12 text-center px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          onChange={(e) => {
                            const input = e.target;
                            const nextInput =
                              input.nextElementSibling as HTMLInputElement | null;
                            const prevInput =
                              input.previousElementSibling as HTMLInputElement | null;

                            // Allow only numbers
                            if (!/^\d*$/.test(input.value)) {
                              input.value = input.value.replace(/\D/g, "");
                            }

                            if (input.value.length === 1 && nextInput) {
                              nextInput.focus();
                            } else if (input.value.length === 0 && prevInput) {
                              prevInput.focus();
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <button
                      style={{ cursor: "pointer" }}
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Xác Nhận
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
  );
}
