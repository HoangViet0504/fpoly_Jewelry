import { Dialog } from "@mui/material";
import React from "react";
import Container from "../Container";
import { formatCurrencyVND } from "../../common/helper";
import { paths } from "../../common/constant";
import { Padding } from "@mui/icons-material";
import { ToastMessage } from "../ToastMessage";
import { ProductInfo } from "../../types/interface";
import { RestApi } from "../../api/utils/axios";
import { useAuthStore } from "../../stores/useAuthStore";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

interface ModalOrderDetailProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    dataOrder?: any;
    handleReloadData?: () => void;
}

const ModalOrderDetailAdmin = ({
    open,
    setOpen,
    dataOrder,
    handleReloadData = () => {},
}: ModalOrderDetailProps) => {
    const { user } = useAuthStore();
    const [statusOrder, setStatusOrder] = React.useState<string>();

    const handleUpdateStatus = async () => {
        try {
            const response = await RestApi.post("/UpdateOrdersAdmin", {
                id: dataOrder.id_order,
                status: statusOrder,
            });

            if (response.data) {
                ToastMessage("success", response.data.message);
                setOpen(false);
                handleReloadData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            maxWidth="md"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <IconButton
                aria-label="close"
                onClick={() => setOpen(false)}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: "#222",
                    zIndex: 1000,
                }}>
                <CloseIcon />
            </IconButton>
            <Container
                sx={{ maxWidth: "700px !important", position: "relative" }}>
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <h2
                            id={`${dataOrder.id_order}-heading`}
                            className="text-lg font-semibold text-gray-900">
                            Mã đơn hàng #{dataOrder.id_order}
                        </h2>
                        <p
                            className={`text-sm font-medium px-2 py-1 rounded ${
                                dataOrder.status === "paying"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : dataOrder.status === "new"
                                    ? "bg-blue-100 text-blue-800"
                                    : dataOrder.status === "shipping"
                                    ? "bg-indigo-100 text-indigo-800"
                                    : dataOrder.status === "success"
                                    ? "bg-green-100 text-green-800"
                                    : dataOrder.status === "cancel"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}>
                            {dataOrder.status === "paying"
                                ? "Đang thanh toán"
                                : dataOrder.status === "new"
                                ? "Đang xử lý"
                                : dataOrder.status === "shipping"
                                ? "Đang giao"
                                : dataOrder.status === "success"
                                ? "Thành công"
                                : dataOrder.status === "cancel"
                                ? "Hủy đơn"
                                : "Không rõ"}
                        </p>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                maxWidth: "200px",
                            }}>
                            {dataOrder.status !== "success" &&
                                dataOrder.status !== "cancel" && (
                                    <select
                                        onChange={(e) => {
                                            // handleUpdateStatus(
                                            //     String(dataOrder.id_order),
                                            //     e.target.value
                                            // );
                                            setStatusOrder(e.target.value);
                                        }}
                                        defaultValue={dataOrder.status}
                                        className="w-full bg-white border border-gray-300 text-gray-900 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        <option
                                            value="paying"
                                            disabled={[
                                                "new",
                                                "shipping",
                                                "success",
                                                "cancel",
                                            ].includes(dataOrder.status)}>
                                            Đang thanh toán
                                        </option>
                                        <option
                                            value="new"
                                            disabled={[
                                                "shipping",
                                                "success",
                                                "cancel",
                                            ].includes(dataOrder.status)}>
                                            Đang xử lý
                                        </option>
                                        <option
                                            value="shipping"
                                            disabled={[
                                                "success",
                                                "cancel",
                                            ].includes(dataOrder.status)}>
                                            Đang giao hàng
                                        </option>
                                        <option value="success">
                                            Thành công
                                        </option>
                                        <option value="cancel">Hủy</option>
                                    </select>
                                )}
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div>
                            <p className="mt-2 text-sm text-gray-500">
                                <strong>Tên: </strong> {dataOrder.name}
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                                <strong>Số điện thoại: </strong>{" "}
                                {dataOrder.phone}
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                                <strong>Email: </strong> {dataOrder.email}
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                                <strong>Địa chỉ: </strong>{" "}
                                {dataOrder.address.join(", ")}
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                                <strong>Ghi chú: </strong>{" "}
                                {dataOrder.note || "Không có ghi chú"}
                            </p>
                        </div>

                        <div>
                            <p className="mt-2 text-sm text-gray-500">
                                <strong>Tổng tiền: </strong>{" "}
                                {formatCurrencyVND(dataOrder.total_amount)}
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                                <strong>Giảm giá: </strong>{" "}
                                {formatCurrencyVND(dataOrder.discount)}
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                                <strong>Phí ship: </strong> {"Miễn phí"}
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                                <strong>Phương thức thanh toán: </strong>{" "}
                                {dataOrder.payment_method}
                            </p>
                        </div>
                    </div>

                    <div
                        className="mt-4"
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            right: "10px",
                        }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-start",
                            }}>
                            {dataOrder.status !== "success" &&
                                dataOrder.status !== "cancel" && (
                                    <button
                                        onClick={handleUpdateStatus}
                                        type="button"
                                        style={{ maxWidth: "150px" }}
                                        className="mt-2  w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer">
                                        Cập nhật
                                    </button>
                                )}
                        </div>
                    </div>
                    <div id={`products-${dataOrder.id_order}`} className="mt-6">
                        {dataOrder.products.map(
                            (product: ProductInfo, index: number) => (
                                <a
                                    key={index}
                                    href={paths.productDetail(product.slug)}
                                    className="flex items-center space-x-4 border-t border-gray-200 pt-4 first:border-t-0 first:pt-0 hover:bg-gray-50 rounded-md p-2 transition">
                                    <img
                                        src={product.primary_image}
                                        alt={product.name_product}
                                        className="w-16 h-16 rounded-md object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium text-gray-900">
                                            {product.name_product}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            kích cỡ: {product.size}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Số lượng: {product.quantity}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Chất liệu:{" "}
                                            {product.made || "Không rõ"}
                                        </p>
                                        <p className="text-sm font-medium text-gray-900">
                                            Giá:{" "}
                                            {formatCurrencyVND(product.price)}
                                        </p>
                                    </div>
                                </a>
                            )
                        )}
                    </div>
                </div>
            </Container>
        </Dialog>
    );
};

export default ModalOrderDetailAdmin;
