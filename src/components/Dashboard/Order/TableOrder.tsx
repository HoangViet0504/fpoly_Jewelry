import Navigation from "../../Navigation";
import { useEffect, useState } from "react";
import ConfirmDeleted from "../../Dialog/ConfirmDeleted";
import {
    Categories,
    MergedOrder,
    Meta,
    ProductInfo,
} from "../../../types/interface";
import { RestApi } from "../../../api/utils/axios";
import { ToastMessage } from "../../ToastMessage";
import { maxPerSize, paths } from "../../../common/constant";
import { formatCurrencyVND, formatTimeDateVN } from "../../../common/helper";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useFilterDashboard } from "../../../stores/useFilterDashboard";
import ModalOrderDetail from "../../Dialog/ModalOrderDetail";
import ModalOrderDetailAdmin from "../../Dialog/ModalOrderDetailAdmin";
<svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor">
    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
</svg>;

/* This example requires Tailwind CSS v2.0+ */

export default function TableOrder() {
    const [id, setId] = useState<string>("");
    const { filter } = useFilterDashboard();
    const [filterKeyWord, setFilterKeyWord] = useState<string>("");
    const [status, setStatus] = useState<string>(filter);
    const [page, setPage] = useState<number>(1);
    const [meta, setMeta] = useState<Meta>({} as Meta);
    const [isLoading, setIsLoafing] = useState(true);
    const [orderData, setOrderData] = useState<MergedOrder[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const [openViewDetailOrder, setOpenViewDetailOrder] = useState(false);
    const [dataSelectedOrder, setdataSelectedOrder] =
        useState<MergedOrder | null>(null);
    useEffect(() => {
        if (filter !== "") {
            setStatus(filter);
        }
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await RestApi.get("/getHistoryCartAdmin", {
                params: {
                    page: page,
                    limit: maxPerSize,
                    keyword: filterKeyWord,
                    status: status,
                    payment_method: paymentMethod,
                },
            });
            setMeta(response.data.meta);
            const merged: MergedOrder[] = [];

            response.data.data.forEach((item: any) => {
                const existing = merged.find(
                    (e) => e.id_order === item.id_order
                );

                const productInfo: ProductInfo = {
                    name_product: item.name_product,
                    price: item.price,
                    quantity: item.quantity,
                    made: item.made,
                    size: item.size,
                    slug: item.slug,
                    primary_image: item.primary_image,
                };

                if (existing) {
                    // Nếu address chưa có thì thêm
                    if (!existing.address.includes(item.address)) {
                        existing.address.push(item.address);
                    }

                    existing.products.push(productInfo);
                } else {
                    merged.push({
                        id: item.id_order,
                        id_order: item.id_order,
                        id_user: item.id_user,
                        note: item.note,
                        status: item.status,
                        discount: item.discount,
                        email: item.email,
                        slug: item.slug,
                        payment_method: item.payment_method,
                        name: item.name,
                        phone: item.phone,
                        total_amount: item.total_amount,
                        address: [item.address],
                        products: [productInfo],
                    });
                }
            });
            setOrderData(merged);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoafing(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [filterKeyWord, status, page, paymentMethod]);

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            const response = await RestApi.post("/UpdateOrdersAdmin", {
                id,
                status,
            });
            ToastMessage("success", response.data.message);
            fetchOrders();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}>
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
                                }}>
                                <option value="">Trạng thái đơn hàng</option>
                                <option value="paying">Đang thanh toán</option>
                                <option value="new">Đang xử lý</option>
                                <option value="shipping">Đang giao hàng</option>
                                <option value="success">Thành công</option>
                                <option value="cancel">Hủy</option>
                            </select>
                            <select
                                className="px-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onChange={(e) => {
                                    setPaymentMethod(e.target.value);
                                }}>
                                <option value="">Phương thức thanh toán</option>
                                <option value="Thanh toán khi nhận hàng">
                                    Tiền mặt
                                </option>
                                <option value="Thanh toán online">
                                    Chuyển khoảng
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-12 space-y-6 sm:mt-4">
                        <table className="min-w-full min-h-full divide-y divide-gray-200">
                            <thead
                                className="bg-gray-50"
                                style={
                                    {
                                        // whiteSpace: "nowrap",
                                    }
                                }>
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ">
                                        Mã ĐH
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ">
                                        Tên khách hàng
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ">
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ">
                                        Số điện thoại
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ">
                                        Tổng tiền
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Địa chỉ
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Trạng thái
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orderData.length !== 0 ? (
                                    orderData.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    #{item.id}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {item.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {item.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {item.phone}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap  ">
                                                {formatCurrencyVND(
                                                    item.total_amount
                                                )}
                                            </td>
                                            <td className="px-6 py-4 max-w-[150px] truncate whitespace-nowrap overflow-hidden">
                                                {item.address}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap  ">
                                                <p
                                                    className={`text-sm font-medium px-2 py-1 rounded ${
                                                        item.status === "paying"
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : item.status ===
                                                              "new"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : item.status ===
                                                              "shipping"
                                                            ? "bg-indigo-100 text-indigo-800"
                                                            : item.status ===
                                                              "success"
                                                            ? "bg-green-100 text-green-800"
                                                            : item.status ===
                                                              "cancel"
                                                            ? "bg-red-100 text-red-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}>
                                                    {item.status === "paying"
                                                        ? "Đang thanh toán"
                                                        : item.status === "new"
                                                        ? "Đang xử lý"
                                                        : item.status ===
                                                          "shipping"
                                                        ? "Đang giao"
                                                        : item.status ===
                                                          "success"
                                                        ? "Thành công"
                                                        : item.status ===
                                                          "cancel"
                                                        ? "Hủy đơn"
                                                        : "Không rõ"}
                                                </p>
                                            </td>

                                            <td>
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        {
                                                            e.preventDefault();
                                                            setOpenViewDetailOrder(
                                                                true
                                                            );
                                                            setdataSelectedOrder(
                                                                item
                                                            );
                                                        }
                                                    }}>
                                                    Xem chi tiết
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <td
                                        colSpan={11} // Số lượng cột phù hợp với bảng
                                        className="px-6 py-4 text-gray-500">
                                        Không có dữ liệu
                                    </td>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {orderData.length !== 0 && (
                        <Navigation data={meta} page={page} setPage={setPage} />
                    )}

                    {openViewDetailOrder && (
                        <ModalOrderDetailAdmin
                            open={openViewDetailOrder}
                            setOpen={setOpenViewDetailOrder}
                            dataOrder={dataSelectedOrder}
                            handleReloadData={fetchOrders}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
