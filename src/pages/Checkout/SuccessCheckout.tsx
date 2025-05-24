import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { RestApi } from "../../api/utils/axios";

const SuccessCheckout = () => {
    //   const { status } = useParams<{ status: string }>();
    //   console.log(status);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");

    const idOrder = queryParams.get("apptransid");
    const result = idOrder?.split("_")[1];

    const parsed = Object.fromEntries(new URLSearchParams(queryParams));

    const testAxios = async () => {
        if (Number(status) === 1) {
        }

        try {
            const res = await RestApi.post("/updateOrderStatus", {
                orderId: result,
                status: "success",
                dataObj: parsed,
            });

            console.log("res:", res.data);
        } catch (error) {}
    };

    // check order status success
    const fetchCheckOrderStatus = async () => {
        try {
            const res = await RestApi.get(`/checkOrderStatus/${result}`);

            if (res.data.data === "success") {
                return window.location.href = "/";
            }
        } catch (error) {}
    };

    useEffect(() => {
        testAxios();
        const timer = setTimeout(() => {
            fetchCheckOrderStatus();
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mt-4">
                    Đặt hàng thành công!
                </h1>
                <p className="text-gray-600 mt-2">
                    Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Chúng tôi
                    sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng.
                </p>
                <button
                    className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    onClick={() => (window.location.href = "/")}>
                    Quay lại trang chủ
                </button>
                <p className="text-sm text-gray-500 mt-4">
                    Bạn sẽ được chuyển về trang chủ sau 5 giây...
                </p>
            </div>
        </div>
    );
};

export default SuccessCheckout;
