import { Fragment } from "react/jsx-runtime";
import Container from "../../Container";
import { Dialog, DialogTitle } from "@mui/material";

interface CreateUserProps {
  open: boolean;
  isEdit: boolean;
  setOpen: (open: boolean) => void;
}
export default function CreateProduct({
  setOpen,
  open,
  isEdit = false,
}: CreateUserProps) {
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      maxWidth="md"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        {isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
      </DialogTitle>
      <Container sx={{ maxWidth: "700px !important" }}>
        <div className="sm:mt-0 bg-white ">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div className="md:col-span-2">
              <form action="#" method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div
                    style={
                      {
                        // marginTop: "20px",
                      }
                    }
                    className="px-4 bg-white "
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <label className="block text-sm font-medium text-gray-700">
                        Image product
                      </label>
                      <div className="mt-1 flex items-center gap-2.5">
                        <span
                          style={{ borderRadius: "4px" }}
                          className="inline-block h-16 w-16  overflow-hidden bg-gray-100"
                        >
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                        <span
                          style={{ borderRadius: "4px" }}
                          className="inline-block h-16 w-16  overflow-hidden bg-gray-100"
                        >
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                        <span
                          style={{ borderRadius: "4px" }}
                          className="inline-block h-16 w-16  overflow-hidden bg-gray-100"
                        >
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                        <span
                          style={{ borderRadius: "4px" }}
                          className="inline-block h-16 w-16  overflow-hidden bg-gray-100"
                        >
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Price
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Price sale
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          quantity
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Options
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>Vui lòng chọn</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Danh mục
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>Vui lòng chọn</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>

                      {/* <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phường / xã
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>Vui lòng chọn</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Địa chỉ
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                        />
                      </div> */}
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="comment"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <div className="mt-1">
                          <textarea
                            rows={4}
                            name="comment"
                            id="comment"
                            className=" mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>

                    <div className=" overflow-hidden sm:rounded-md">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                        }}
                        className="  py-4"
                      >
                        <fieldset>
                          <div>
                            <legend className="text-base font-medium text-gray-900">
                              Status
                            </legend>
                          </div>
                          <div className="mt-4 space-y-4">
                            <div className="flex items-center">
                              <input
                                id="push-everything"
                                name="push-notifications"
                                type="radio"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              />
                              <label
                                htmlFor="push-everything"
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                Active
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="push-email"
                                name="push-notifications"
                                type="radio"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              />
                              <label
                                htmlFor="push-email"
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                Deactive
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                        }}
                        className=" py-3  text-left "
                      >
                        <button
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setOpen(false);
                          }}
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Cancel
                          {/* <UserIcon
                          className="ml-3 -mr-1 h-5 w-5"
                          aria-hidden="true"
                        /> */}
                        </button>
                        <button
                          style={{ cursor: "pointer" }}
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          {isEdit ? "Update" : "Create"}
                          {/* <UserIcon
                          className="ml-3 -mr-1 h-5 w-5"
                          aria-hidden="true"
                        /> */}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </Dialog>
  );
}
