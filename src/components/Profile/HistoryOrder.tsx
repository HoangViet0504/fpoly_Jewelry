import React, { useEffect, useState } from "react";
import { RestApi } from "../../api/utils/axios";
import { useAuthStore } from "../../stores/useAuthStore";
import { formatCurrencyVND } from "../../common/helper";
import { paths } from "../../common/constant";
import { ToastMessage } from "../ToastMessage";
import ConfirmDeleted from "../Dialog/ConfirmDeleted";

interface ProductInfo {
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
  const [isLoading, setIsLoafing] = useState(true);
  const [id, setId] = useState<string>("");
  const { user } = useAuthStore();
  const [orderData, setOrderData] = useState<MergedOrder[]>([]);
  // const [status, setStatus] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await RestApi.get("/getHistoryCart", {
        params: {
          id_user: user?.id_user,
        },
      });

      const merged: MergedOrder[] = [];

      response.data.data.forEach((item: any) => {
        const existing = merged.find((e) => e.id_order === item.id_order);

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
  }, []);

  const handleCancelOrder = async () => {
    try {
      const response = await RestApi.post("/cancelOrder", {
        id_order: id,
        id_user: user?.id_user,
      });
      const merged: MergedOrder[] = [];

      response.data.data.forEach((item: any) => {
        const existing = merged.find((e) => e.id_order === item.id_order);

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

  return (
    <div className="bg-white">
      <div className=" py-4">
        <div className="max-w-xl">
          <h1
            id="your-orders-heading"
            className="text-3xl font-extrabold tracking-tight text-gray-900"
          >
            Lịch sử đơn hàng
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Kiểm tra trạng thái đơn hàng gần đây, quản lý trả hàng và các sản
            phẩm tương tự.
          </p>
        </div>

        <div className="mt-12 space-y-6 sm:mt-16">
          {orderData.map((order) => (
            <section
              key={order.id_order}
              aria-labelledby={`${order.id_order}-heading`}
              className="border border-gray-200 rounded-lg shadow-sm p-6"
            >
              <div className="flex justify-between items-center">
                <h2
                  id={`${order.id_order}-heading`}
                  className="text-lg font-semibold text-gray-900"
                >
                  Mã đơn hàng #{order.id_order}
                </h2>
                <p
                  className={`text-sm font-medium px-2 py-1 rounded ${
                    order.status === "paying"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "new"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "shipping"
                      ? "bg-indigo-100 text-indigo-800"
                      : order.status === "success"
                      ? "bg-green-100 text-green-800"
                      : order.status === "cancel"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
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
                Địa chỉ: {order.address.join(", ")}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Ghi chú: {order.note || "Không có ghi chú"}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Tổng tiền: {formatCurrencyVND(order.total_amount)}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Giảm giá: {formatCurrencyVND(order.discount)}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Phí ship: {"Miễn phí"}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Phương thức thanh toán: {order.payment_method}
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                  onClick={() =>
                    document
                      .getElementById(`products-${order.id_order}`)
                      ?.classList.toggle("hidden")
                  }
                >
                  Xem sản phẩm
                </button>
              </div>
              <div className="mt-4">
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  {(order.status === "new" || order.status === "paying") && (
                    <button
                      onClick={() => {
                        setIsOpen(true);
                        setId(order.id_order.toString());
                      }}
                      type="button"
                      style={{ maxWidth: "150px" }}
                      className="mt-2  w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
                    >
                      Hủy đơn hàng
                    </button>
                  )}
                </div>
              </div>
              <div id={`products-${order.id_order}`} className="mt-6 hidden">
                {order.products.map((product, index) => (
                  <a
                    key={index}
                    href={paths.productDetail(product.slug)}
                    className="flex items-center space-x-4 border-t border-gray-200 pt-4 first:border-t-0 first:pt-0 hover:bg-gray-50 rounded-md p-2 transition"
                  >
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
                        Chất liệu: {product.made || "Không rõ"}
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        Giá: {formatCurrencyVND(product.price)}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ))}
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
    </div>
  );
}
