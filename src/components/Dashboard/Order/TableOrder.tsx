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
                </div>
                <div className="bg-white">
                    <div className=" py-4">
                        <div className=" space-y-6 ">
                            {orderData.map((order) => (
                                <section
                                    key={order.id_order}
                                    aria-labelledby={`${order.id_order}-heading`}
                                    className="border border-gray-200 rounded-lg shadow-sm p-6">
                                    <div className="flex justify-between items-center">
                                        <h2
                                            id={`${order.id_order}-heading`}
                                            className="text-lg font-semibold text-gray-900">
                                            Mã đơn hàng #{order.id_order}
                                        </h2>
                                        <p
                                            className={`text-sm font-medium px-2 py-1 rounded ${
                                                order.status === "paying"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : order.status === "new"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : order.status ===
                                                      "shipping"
                                                    ? "bg-indigo-100 text-indigo-800"
                                                    : order.status === "success"
                                                    ? "bg-green-100 text-green-800"
                                                    : order.status === "cancel"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}>
                                            {order.status === "paying"
                                                ? "Đang thanh toán"
                                                : order.status === "new"
                                                ? "Đang xử lý"
                                                : order.status === "shipping"
                                                ? "Đang giao"
                                                : order.status === "success"
                                                ? "Thành công"
                                                : order.status === "cancel"
                                                ? "Hủy đơn"
                                                : "Không rõ"}
                                        </p>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Tên: {order.name}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Số điện thoại: {order.phone}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Email: {order.email}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Địa chỉ: {order.address.join(", ")}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Ghi chú:{" "}
                                        {order.note || "Không có ghi chú"}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Tổng tiền:{" "}
                                        {formatCurrencyVND(order.total_amount)}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Giảm giá:{" "}
                                        {formatCurrencyVND(order.discount)}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Phí ship: {"Miễn phí"}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Phương thức thanh toán:{" "}
                                        {order.payment_method}
                                    </p>
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="text-sm text-indigo-600 hover:text-indigo-500 font-medium cursor-pointer"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        `products-${order.id_order}`
                                                    )
                                                    ?.classList.toggle("hidden")
                                            }>
                                            Xem sản phẩm
                                        </button>
                                    </div>
                                    <div className="mt-4">
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                maxWidth: "200px",
                                            }}>
                                            {order.status !== "success" &&
                                                order.status !== "cancel" && (
                                                    <select
                                                        onChange={(e) => {
                                                            handleUpdateStatus(
                                                                String(
                                                                    order.id_order
                                                                ),
                                                                e.target.value
                                                            );
                                                        }}
                                                        defaultValue={
                                                            order.status
                                                        }
                                                        className="mt-2 w-full bg-white border border-gray-300 text-gray-900 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                        {/* <option value="paying">
                                                            Đang thanh toán
                                                        </option>
                                                        <option value="new">
                                                            Đang xử lý
                                                        </option>
                                                        <option value="shipping">
                                                            Đang giao hàng
                                                        </option>
                                                        <option value="success">
                                                            Thành công
                                                        </option>
                                                        <option value="cancel">
                                                            Hủy
                                                        </option> */}
                                                        <option
                                                            value="paying"
                                                            disabled={[
                                                                "new",
                                                                "shipping",
                                                                "success",
                                                                "cancel",
                                                            ].includes(
                                                                order.status
                                                            )}>
                                                            Đang thanh toán
                                                        </option>
                                                        <option
                                                            value="new"
                                                            disabled={[
                                                                "shipping",
                                                                "success",
                                                                "cancel",
                                                            ].includes(
                                                                order.status
                                                            )}>
                                                            Đang xử lý
                                                        </option>
                                                        <option
                                                            value="shipping"
                                                            disabled={[
                                                                "success",
                                                                "cancel",
                                                            ].includes(
                                                                order.status
                                                            )}>
                                                            Đang giao hàng
                                                        </option>
                                                        <option value="success">
                                                            Thành công
                                                        </option>
                                                        <option value="cancel">
                                                            Hủy
                                                        </option>
                                                    </select>
                                                )}
                                        </div>
                                    </div>
                                    <div
                                        id={`products-${order.id_order}`}
                                        className="mt-6 hidden">
                                        {order.products.map(
                                            (product, index) => (
                                                <a
                                                    key={index}
                                                    href={paths.productDetail(
                                                        product.slug
                                                    )}
                                                    className="flex items-center space-x-4 border-t border-gray-200 pt-4 first:border-t-0 first:pt-0 hover:bg-gray-50 rounded-md p-2 transition">
                                                    <img
                                                        src={
                                                            product.primary_image
                                                        }
                                                        alt={
                                                            product.name_product
                                                        }
                                                        className="w-16 h-16 rounded-md object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="text-sm font-medium text-gray-900">
                                                            {
                                                                product.name_product
                                                            }
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            kích cỡ:{" "}
                                                            {product.size}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Số lượng:{" "}
                                                            {product.quantity}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Chất liệu:{" "}
                                                            {product.made ||
                                                                "Không rõ"}
                                                        </p>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            Giá:{" "}
                                                            {formatCurrencyVND(
                                                                product.price
                                                            )}
                                                        </p>
                                                    </div>
                                                </a>
                                            )
                                        )}
                                    </div>
                                </section>
                            ))}
                            {orderData.length === 0 && (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}>
                                    <span style={{ textAlign: "center" }}>
                                        Không có đơn hàng nào tồn tại
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {orderData.length !== 0 && (
                    <Navigation data={meta} page={page} setPage={setPage} />
                )}
            </div>
        </>
    );
}
