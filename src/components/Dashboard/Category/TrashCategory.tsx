import React, { useEffect, useState } from "react";
import { Categories, Meta } from "../../../types/interface";
import { RestApi } from "../../../api/utils/axios";
import { ToastMessage } from "../../ToastMessage";

interface ChangeImageProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setListBefore: (list: Categories[]) => void;
  setMetaBefore: (meta: Meta) => void;
}
export default function TrashCategory({
  isOpen,
  setIsOpen,
  setListBefore,
  setMetaBefore,
}: ChangeImageProps) {
  const [list, setList] = useState<Categories[]>([]);
  const fetchData = async () => {
    try {
      const response = await RestApi.get("/getListCategoriesRemoveAdmin");
      setList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);
  const handleRemove = async (id: string) => {
    try {
      const response = await RestApi.post("/DeleteCategoriesAdmin", {
        id,
      });
      ToastMessage("success", response.data.message);
      setList((prev) => prev.filter((item) => item.id_categories !== id));
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleRevert = async (id: string) => {
    try {
      const response = await RestApi.post(
        "/RevertDeleteCategoriesAdminByIsDelete",
        {
          id,
        }
      );
      setListBefore(response.data.data);
      setMetaBefore(response.data.meta);
      setList((prev) => prev.filter((item) => item.id_categories !== id));
      ToastMessage("success", response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-gray-500/75 transition-opacity"
            aria-hidden="true"
          ></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 ">
                <table className="min-w-full min-h-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider "
                      >
                        Số thứ tự
                      </th>

                      <th
                        scope="col"
                        className="px-6  py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider "
                      >
                        Hình danh mục
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider "
                      >
                        Tên danh mục
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Slug
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Loại
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Trạng thái
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Hành động
                      </th>
                      {/* <th scope="col" className="relative px-6 py-3">
                                   <span className="sr-only">Edit</span>
                                 </th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {list.length !== 0 ? (
                      list.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-900">
                              {index + 1}
                            </div>
                          </td>
                          <td
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                            className="px-6 py-4 whitespace-nowrap  "
                          >
                            <div className="flex items-center ">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={
                                    item.image_categories ??
                                    "/images/avatar/avatar_default.jpeg"
                                  }
                                  alt=""
                                />
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-900">
                              {item.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-900">
                              {item.slug_categories}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-900">
                              {item.type}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                item.status === "true"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {item.status === "true"
                                ? "Hoạt động"
                                : "Tạm khóa"}
                            </span>
                          </td>

                          <td
                            style={{ cursor: "pointer", position: "relative" }}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            <button
                              onClick={() => {
                                handleRemove(item.id_categories);
                              }}
                              type="button"
                              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                              Xóa
                            </button>
                            <button
                              onClick={() => {
                                handleRevert(item.id_categories);
                              }}
                              type="button"
                              className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
                            >
                              Khôi phục
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <td
                        colSpan={6} // Số lượng cột phù hợp với bảng
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        Không có dữ liệu
                      </td>
                    )}
                  </tbody>
                </table>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
                  >
                    Khôi phục
                    {/* {loading ? (
                      <CircularProgress sx={{ color: "#fff" }} size="20px" />
                    ) : (
                      "Thêm"
                    )} */}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
