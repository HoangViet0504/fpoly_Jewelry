import { UserIcon } from "@heroicons/react/solid";
import Navigation from "../../Navigation";
import CreateUser from "./CreateUser";
import { useEffect, useState } from "react";
import DropDownHandle from "../DropDownHandle";
import ConfirmDeleted from "../../Dialog/ConfirmDeleted";
import { Meta, province, User, UserDetail } from "../../../types/interface";
import {
  DeleteItemHaveToken,
  GetList,
  RestApi,
} from "../../../api/utils/axios";
import { ToastMessage } from "../../ToastMessage";
import { maxPerSize } from "../../../common/constant";
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-5 w-5"
  viewBox="0 0 20 20"
  fill="currentColor"
>
  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
</svg>;

/* This example requires Tailwind CSS v2.0+ */

export default function TableUser() {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [listUser, setListUser] = useState<User[]>([]);
  const [idUser, setIdUser] = useState<string>("");
  const [listProvince, setListProvince] = useState<province[]>([]);
  // const { filterUser } = useFilterDashboard();
  const [filterKeyWord, setFilterKeyWord] = useState<string>("");
  const [userDetail, setUserDetail] = useState<UserDetail>({} as UserDetail);
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const [role, setRole] = useState<string>("");
  const [meta, setMeta] = useState<Meta>({} as Meta);

  async function getListUser() {
    try {
      const response = await RestApi.get("/getListUserAdmin", {
        params: {
          keyword: filterKeyWord,
          status,
          role,
          page,
          limit: maxPerSize,
        },
      });

      setListUser(response.data.data as User[]);
      setMeta(response.data.meta as Meta);
    } catch (error) {
      console.log(error);
    }
  }

  async function GetProvince() {
    try {
      const response = await GetList<{ data: province[] }>("/getAllProvince");
      setListProvince(response.data);
    } catch (error) {}
  }

  useEffect(() => {
    GetProvince();
  }, []);

  useEffect(() => {
    getListUser();
  }, [filterKeyWord, status, role, page]);

  const handleDelete = async () => {
    try {
      const response = await DeleteItemHaveToken<{ message: string }>(
        "/DeleteUserAdminByIsDelete",
        { id_user: idUser }
      );
      if (response) {
        setOpenDelete(false);
        ToastMessage("success", response.message);
        setListUser((item) => item.filter((user) => user.id_user !== idUser));
        setIdUser("");
      }
    } catch (error) {}
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <div className="flex justify-between items-center gap-4 p-4 bg-white shadow-md rounded-lg">
            <div className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="🔍 Tìm kiếm theo từ khóa"
                className="px-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => {
                  setFilterKeyWord(e.target.value);
                }}
              />
              <select
                className="px-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="1">Hoạt động</option>
                <option value="0">Tạm khóa</option>
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                style={{ paddingRight: "10px" }}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option value="">Quyền</option>
                <option value="1">Quản lý</option>
                <option value="2">Khách hàng</option>
              </select>
              <button
                className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => {
                  // Add functionality for trash button here
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 8a1 1 0 011-1h6a1 1 0 011 1v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8zm2-3a1 1 0 00-1 1v1h6V6a1 1 0 00-1-1H8z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4 6a1 1 0 011-1h10a1 1 0 011 1v1H4V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Thùng rác</span>
              </button>
            </div>
            <button
              onClick={() => {
                setIsEdit(false);
                setOpenCreate(true);
                setUserDetail({} as UserDetail);
              }}
              type="button"
              className="flex items-center px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span>Thêm khách hàng</span>
              <UserIcon className="ml-2 h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="">
            <div className=" ">
              <div className="shadow  border-b border-gray-200 sm:rounded-lg">
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
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
                      >
                        Họ Tên
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Số điện thoại
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Ngày sinh
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
                        Quyền
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
                    {listUser.length !== 0 ? (
                      listUser.map((person, index) => (
                        <tr key={person.email}>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-900">
                              {index + 1}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap ">
                            <div className="flex items-center ">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={
                                    person.avatar_img ??
                                    "/images/avatar/avatar_default.jpeg"
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {person.first_name} {person.last_name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {person.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-900">
                              {person.phone}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-900">
                              {new Date(person.birthdate).toLocaleDateString(
                                "vi-VN",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                }
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                person.is_active === 1
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {person.is_active === 1
                                ? "Hoạt động"
                                : "Tạm khóa"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            <span
                              className={
                                person.role === 1
                                  ? "text-green-600"
                                  : "text-gray-600"
                              }
                            >
                              {person.role === 1 ? "Quản lý" : "Khách hàng"}
                            </span>
                          </td>

                          <td
                            style={{ cursor: "pointer", position: "relative" }}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            <DropDownHandle
                              id={person.id_user}
                              setId={setIdUser}
                              setOpenDelete={setOpenDelete}
                              setOpenForm={setOpenCreate}
                              setIsEdit={setIsEdit}
                            />
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
              </div>
            </div>
          </div>
        </div>
        {listUser.length !== 0 && (
          <Navigation data={meta} page={page} setPage={setPage} />
        )}
      </div>
      <CreateUser
        idUser={idUser}
        userDetail={userDetail}
        setUserDetail={setUserDetail}
        listUser={listUser}
        setListUser={setListUser}
        province={listProvince}
        isEdit={isEdit}
        open={openCreate}
        setOpen={setOpenCreate}
      />
      <ConfirmDeleted
        onDelete={handleDelete}
        text="Bạn có chắc chắn muốn xóa không? Nếu xóa, mục này sẽ được chuyển vào thùng rác và sẽ mất hoàn toàn sau 30 ngày."
        open={openDelete}
        setOpen={setOpenDelete}
      />
    </>
  );
}
