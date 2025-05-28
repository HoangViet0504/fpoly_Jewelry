import { UserIcon } from "@heroicons/react/solid";
import Navigation from "../../Navigation";
import { useEffect, useState } from "react";
import DropDownHandle from "../DropDownHandle";
import ConfirmDeleted from "../../Dialog/ConfirmDeleted";
import { Categories, Meta } from "../../../types/interface";
import { RestApi } from "../../../api/utils/axios";
import { ToastMessage } from "../../ToastMessage";
import { maxPerSize } from "../../../common/constant";
import { formatCurrencyVND, formatTimeDateVN } from "../../../common/helper";
import CreateVoucher from "./CreateVoucher";
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-5 w-5"
  viewBox="0 0 20 20"
  fill="currentColor"
>
  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
</svg>;

/* This example requires Tailwind CSS v2.0+ */

export default function TableVoucher() {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [list, setList] = useState<any[]>([]);
  const [id, setId] = useState<string>("");
  const [filterKeyWord, setFilterKeyWord] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [openTrash, setOpenTrash] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [meta, setMeta] = useState<Meta>({} as Meta);

  async function getListUser() {
    try {
      const response = await RestApi.get("/getListVouchersAdmin", {
        params: {
          keyWord: filterKeyWord,
          status,
          type_coupon: type,
          page,
          limit: maxPerSize,
        },
      });

      setList(response.data.data as Categories[]);
      setMeta(response.data.meta as Meta);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getListUser();
  }, [filterKeyWord, status, type, page]);

  const handleDelete = async () => {
    try {
      const response = await RestApi.post("/DeleteVouchersAdmin", {
        id: id,
      });
      if (response) {
        setOpenDelete(false);
        ToastMessage("success", response.data.message);
        setList((item) => item.filter((item1) => item1.id !== id));
        setId("");
      }
    } catch (error) {
      console.log(error);
    }
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
                <option value="active">Hoạt động</option>
                <option value="inactive">Tạm khóa</option>
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                style={{ paddingRight: "10px" }}
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="">Loại</option>
                <option value="amount">Tiền mặt</option>
                <option value="percent">Phần trăm</option>
              </select>
            </div>
            <button
              onClick={() => {
                setIsEdit(false);
                setOpenCreate(true);
              }}
              type="button"
              className="flex items-center px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span>Thêm mã giảm giá</span>
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
                        className="px-6  py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider "
                      >
                        Mã giảm giá
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider "
                      >
                        Giảm giá
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Giảm cao nhất
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Ngày bắt đầu
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Ngày kết thúc
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

                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-900">
                              {item.code_coupon}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-900">
                              {item.type_coupon === "percent"
                                ? item.discount + "%"
                                : formatCurrencyVND(item.discount)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-900">
                              {formatCurrencyVND(item.coupon_max_spend)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-900">
                              {formatTimeDateVN(item.start_date)}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-900">
                              {formatTimeDateVN(item.expires_at)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-900">
                              {item.type_coupon === "percent"
                                ? "Phần trăm"
                                : "Tiền mặt"}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                item.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {item.status === "active"
                                ? "Hoạt động"
                                : "Tạm khóa"}
                            </span>
                          </td>

                          <td
                            style={{ cursor: "pointer", position: "relative" }}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            <DropDownHandle
                              id={item.id}
                              setId={setId}
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
        {list.length !== 0 && (
          <Navigation data={meta} page={page} setPage={setPage} />
        )}
      </div>
      <CreateVoucher
        id={id}
        list={list}
        setList={setList}
        isEdit={isEdit}
        open={openCreate}
        setOpen={setOpenCreate}
      />
      <ConfirmDeleted
        onDelete={handleDelete}
        text="Bạn có chắc chắn muốn xóa không? Nếu xóa, mục này sẽ mất hoàn toàn ."
        open={openDelete}
        setOpen={setOpenDelete}
      />
    </>
  );
}
