import Navigation from "../../Navigation";
import { useEffect, useState } from "react";
import ConfirmDeleted from "../../Dialog/ConfirmDeleted";
import { Meta } from "../../../types/interface";
import { RestApi } from "../../../api/utils/axios";
import { ToastMessage } from "../../ToastMessage";
import CreateImageProduct from "./CreateImageProduct";
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-5 w-5"
  viewBox="0 0 20 20"
  fill="currentColor"
>
  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
</svg>;

/* This example requires Tailwind CSS v2.0+ */

export default function TableImage() {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [list, setList] = useState<any[]>([]);
  const [id, setId] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [meta, setMeta] = useState<Meta>({} as Meta);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  async function getListUser() {
    try {
      const response = await RestApi.get("/getGroupedImageProducts");
      setList(response.data.data);
      console.log(response.data.data);

      setMeta(response.data.meta as Meta);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getListUser();
  }, [page]);

  const handleDelete = async () => {
    try {
      const response = await RestApi.post("/deletedImageProduct", {
        id: id,
      });
      if (response) {
        setOpenDelete(false);
        ToastMessage("success", response.data.message);
        setList((item) => item.filter((item1) => item1.id_products !== id));
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
          <div className="flex justify-between items-center gap-4 p-4 bg-white  rounded-lg">
            <div className="flex gap-4 items-center"></div>
            <button
              onClick={() => {
                setIsEdit(false);
                setOpenCreate(true);
              }}
              type="button"
              className="flex items-center px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span>Thêm hình ảnh</span>
              {/* <UserIcon className="ml-2 h-5 w-5" aria-hidden="true" /> */}
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
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider "
                      >
                        Tên sản phẩm
                      </th>

                      <th
                        scope="col"
                        className="px-6  py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider "
                      >
                        Hình ảnh
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
                            <div className="flex flex-wrap gap-2 justify-center">
                              {item.images.map((img: any, imgIndex: number) => (
                                <img
                                  key={imgIndex}
                                  src={img.image}
                                  alt={`Image ${imgIndex}`}
                                  className="w-20 h-20 object-cover rounded"
                                />
                              ))}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <button
                              onClick={() => {
                                console.log(item.id_products);

                                setId(item.id_products);
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
                        colSpan={3} // Số lượng cột phù hợp với bảng
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
      <CreateImageProduct
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
