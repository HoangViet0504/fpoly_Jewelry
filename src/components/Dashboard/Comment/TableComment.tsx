import Navigation from "../../Navigation";
import { useEffect, useState } from "react";
import ConfirmDeleted from "../../Dialog/ConfirmDeleted";
import { Categories, Meta } from "../../../types/interface";
import { RestApi } from "../../../api/utils/axios";
import { ToastMessage } from "../../ToastMessage";
import { maxPerSize } from "../../../common/constant";
import { formatTimeDateVN } from "../../../common/helper";
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-5 w-5"
  viewBox="0 0 20 20"
  fill="currentColor"
>
  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
</svg>;

/* This example requires Tailwind CSS v2.0+ */

export default function TableComment() {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [list, setList] = useState<any[]>([]);
  const [id, setId] = useState<string>("");
  const [filterKeyWord, setFilterKeyWord] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [meta, setMeta] = useState<Meta>({} as Meta);

  async function getListUser() {
    try {
      const response = await RestApi.get("/getListCommentsAdmin", {
        params: {
          page,
          limit: maxPerSize,
          keyword: filterKeyWord,
          rate: status,
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
  }, [filterKeyWord, status, page]);

  const handleDelete = async () => {
    try {
      const response = await RestApi.post("/DeleteCommentAdmin", {
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
                <option value="">Tất cả đánh giá</option>
                <option value="1">1 sao</option>
                <option value="2">2 sao</option>
                <option value="3">3 sao</option>
                <option value="4">4 sao </option>
                <option value="5">5 sao</option>
              </select>

              {/* <button
                className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => {
                  setOpenTrash(true);
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
              </button> */}
            </div>
            {/* <button
              onClick={() => {
                setIsEdit(false);
                setOpenCreate(true);
              }}
              type="button"
              className="flex items-center px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span>Thêm mã giảm giá</span>
              <UserIcon className="ml-2 h-5 w-5" aria-hidden="true" />
            </button> */}
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
                        Tên sản phẩm
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider "
                      >
                        Tên người dùng
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Nội dung
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Đánh giá
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Ngày bình luận
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Hành động
                      </th>
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
                              {item.product_name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-900">
                              {item.first_name} {item.last_name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-900">
                              {item.content}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-900">
                              {item.rating} sao
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-900">
                              {formatTimeDateVN(item.created_at)}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <button
                              onClick={() => {
                                setId(item.id);
                                setOpenDelete(true);
                              }}
                              type="button"
                              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                              Xóa
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
              </div>
            </div>
          </div>
        </div>
        {list.length !== 0 && (
          <Navigation data={meta} page={page} setPage={setPage} />
        )}
      </div>

      <ConfirmDeleted
        onDelete={handleDelete}
        text="Bạn có chắc chắn muốn xóa không? Nếu xóa, mục này sẽ mất hoàn toàn ."
        open={openDelete}
        setOpen={setOpenDelete}
      />
    </>
  );
}
