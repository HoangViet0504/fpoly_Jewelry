import React, { Fragment, useEffect, useState } from "react";
import { RestApi } from "../../api/utils/axios";
import { useAuthStore } from "../../stores/useAuthStore";
import { formatCurrencyVND } from "../../common/helper";
import { paths } from "../../common/constant";
import { ToastMessage } from "../ToastMessage";
import ConfirmDeleted from "../Dialog/ConfirmDeleted";
import Navigation from "../Navigation";
import ModalOrderDetail from "../Dialog/ModalOrderDetail";

export interface ProductInfo {
    name_product: string;
    price: number;
    quantity: number;
    made: string;
    size: string;
    slug: string;
    primary_image: string;
}

interface MergedOrder {
    id: number;
    id_order: number;
    id_user: number;
    note: string;
    status: string;
    discount: number;
    email: string;
    slug: string;
    payment_method: string;
    name: string;
    phone: string;
    total_amount: number;
    address: string[];
    products: ProductInfo[];
}
export default function HistoryOrder(): React.ReactElement {
    const [isLoading, setIsLoading] = useState(true);
    const [id, setId] = useState<string>("");
    const { user } = useAuthStore();
    const [orderData, setOrderData] = useState<MergedOrder[]>([]);
    // const [status, setStatus] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);
    const [openViewDetailOrder, setOpenViewDetailOrder] = useState(false);
    const [dataSelectedOrder, setdataSelectedOrder] =
        useState<MergedOrder | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    // get orders
    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const response = await RestApi.get("/getHistoryCart", {
                params: {
                    id_user: user?.id_user,
                },
            });

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
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // hủy đơn hàng
    const handleCancelOrder = async () => {
        try {
            const response = await RestApi.post("/cancelOrder", {
                id_order: id,
                id_user: user?.id_user,
            });
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
            ToastMessage("success", response.data.message);
            setIsOpen(false);
            setId("");
        } catch (error) {
            console.log(error);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orderData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(orderData.length / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const startRange = orderData.length > 0 ? indexOfFirstItem + 1 : 0;
    const endRange = Math.min(indexOfLastItem, orderData.length);
    const showingText = `Hiển thị từ ${startRange} đến ${endRange} trên ${orderData.length} đơn hàng`;

    return (
        <div className="bg-white">
            <div className=" py-4">
                <div className="max-w-xl">
                    <h1
                        id="your-orders-heading"
                        className="text-3xl font-extrabold tracking-tight text-gray-900">
                        Lịch sử đơn hàng
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Kiểm tra trạng thái đơn hàng gần đây, quản lý trả hàng
                        và các sản phẩm tương tự.
                    </p>
                </div>

                <div className="mt-12 space-y-6 sm:mt-4">
                    <table className="min-w-full min-h-full divide-y divide-gray-200">
                        <thead
                            className="bg-gray-50"
                            style={{
                                whiteSpace: "nowrap",
                            }}>
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">
                                    Mã ĐH
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider ">
                                    Tổng tiền
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Địa chỉ
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.length !== 0 ? (
                                currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="text-sm text-gray-900">
                                                #{item.id}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap  ">
                                            {formatCurrencyVND(
                                                item.total_amount
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap  ">
                                            {item.address}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap  ">
                                            <p
                                                className={`text-sm font-medium px-2 py-1 rounded ${
                                                    item.status === "paying"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : item.status === "new"
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
                                                    : item.status === "shipping"
                                                    ? "Đang giao"
                                                    : item.status === "success"
                                                    ? "Thành công"
                                                    : item.status === "cancel"
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
                                    className="px-6 py-4 text-center text-gray-500">
                                    Không có dữ liệu
                                </td>
                            )}
                        </tbody>
                    </table>
                    {orderData.length !== 0 && (
                        <Navigation
                            data={{
                                totalItems: orderData.length,
                                currentPage: currentPage,
                                totalPages: totalPages,
                                perPage: itemsPerPage,
                                showing: showingText,
                            }}
                            page={currentPage}
                            setPage={handlePageChange}
                        />
                    )}
                </div>
            </div>
            {isOpen && (
                <ConfirmDeleted
                    open={isOpen}
                    setOpen={setIsOpen}
                    text="Bạn có muốn hủy đơn hàng này không ?"
                    title="Xác nhân hủy đơn hàng"
                    onDelete={handleCancelOrder}
                />
            )}
            {openViewDetailOrder && (
                <ModalOrderDetail
                    open={openViewDetailOrder}
                    setOpen={setOpenViewDetailOrder}
                    dataOrder={dataSelectedOrder}
                    handleReloadData={fetchOrders}
                />
            )}
        </div>
    );
}
