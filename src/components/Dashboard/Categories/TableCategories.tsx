import { UserIcon } from "@heroicons/react/solid";
import Navigation from "../../Navigation";
import { useEffect, useState } from "react";
import DropDownHandle from "../DropDownHandle";
import ConfirmDeleted from "../../Dialog/ConfirmDeleted";
import { Categories } from "../../../types/interface";
import {
  DeleteItemHaveToken,
  GetListByParams,
  GetListHaveToken,
} from "../../../api/utils/axios";
import { useFilterDashboard } from "../../../stores/useFilterDashboard";
import { ToastMessage } from "../../ToastMessage";
import CreateCategories from "./CreateCategories";
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-5 w-5"
  viewBox="0 0 20 20"
  fill="currentColor"
>
  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
</svg>;

export default function TableCategories() {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [idCategories, setIdCategories] = useState<string>("");
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [listCategories, setListCategories] = useState<Categories[]>([]);
  const { filterCategories } = useFilterDashboard();

  async function getAllCategories() {
    try {
      const response = await GetListHaveToken<{ data: Categories[] }>(
        "/getListCategoriesAdmin"
      );
      setListCategories(response.data);
    } catch (error) {}
  }

  async function getUserFilterCategories() {
    try {
      const response = await GetListByParams<{ data: Categories[] }>(
        "/getListCategoriesAdminByKeyWord",
        filterCategories
      );
      setListCategories(response.data as Categories[]);
    } catch (error) {}
  }

  const handleDelete = async () => {
    try {
      const response = await DeleteItemHaveToken<{ message: string }>(
        "/DeleteCategoriesAdminByIsDelete",
        { id: idCategories }
      );
      if (response) {
        setOpenDelete(false);
        ToastMessage("success", response.message);
        setListCategories((item) =>
          item.filter((user) => user.id_categories !== idCategories)
        );
        setIdCategories("");
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    getUserFilterCategories();
  }, [filterCategories]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button
            onClick={() => {
              setIsEdit(false);
              setOpenCreate(true);
            }}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 "
          >
            Add categories
            <UserIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="flex flex-col">
          <div className="">
            <div>
              <div className="shadow  border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full min-h-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        style={{ textAlign: "center" }}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Id
                      </th>
                      <th
                        style={{ textAlign: "center" }}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Image
                      </th>
                      <th
                        style={{ textAlign: "center" }}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        style={{ textAlign: "center" }}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created at
                      </th>
                      <th
                        style={{ textAlign: "center" }}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        style={{ textAlign: "center" }}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Action
                      </th>
                      {/* <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {listCategories.map((categories, index) => (
                      <tr key={index + 1}>
                        <td
                          style={{ textAlign: "center" }}
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          <div className="text-sm text-gray-900">
                            {index + 1}
                          </div>
                        </td>
                        <td
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          <div className="flex items-center">
                            <div style={{ width: "80px", height: "80px" }}>
                              <img
                                style={{
                                  borderRadius: "10px",
                                  objectFit: "cover",
                                }}
                                src={
                                  categories.image_categories ??
                                  "/images/avatar/avatar_default.jpeg"
                                }
                                alt=""
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div
                            style={{
                              textAlign: "center",
                            }}
                          >
                            {categories.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div
                            style={{
                              textAlign: "center",
                            }}
                          >
                            {!categories.created_at
                              ? "--/--/--"
                              : categories.created_at}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              categories.status
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {categories.status ? "Hoạt động" : "Tạm khóa"}
                          </span>
                        </td>

                        <td
                          style={{
                            cursor: "pointer",
                            position: "relative",
                          }}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          <DropDownHandle
                            id={categories.id_categories}
                            setId={setIdCategories}
                            setOpenDelete={setOpenDelete}
                            setOpenForm={setOpenCreate}
                            setIsEdit={setIsEdit}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Navigation />
      </div>
      <CreateCategories
        isEdit={isEdit}
        open={openCreate}
        setOpen={setOpenCreate}
      />
      <ConfirmDeleted
        onDelete={handleDelete}
        title="Xóa danh mục"
        text="Bạn có chắc chắn muốn xóa không? Nếu xóa, mục này sẽ được chuyển vào thùng rác và sẽ mất hoàn toàn sau 30 ngày."
        open={openDelete}
        setOpen={setOpenDelete}
      />
    </>
  );
}
