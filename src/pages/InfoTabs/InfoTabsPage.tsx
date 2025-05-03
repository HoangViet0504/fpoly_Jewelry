import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import GuestLayout from "../../components/layout/GuestLayout";

const InfoTabsPage = () => {
  const [activeTab, setActiveTab] = useState("complaint");

  const renderContent = () => {
    switch (activeTab) {
      case "complaint":
        return (
          <div className="text-left p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Khiếu nại</h2>
            <p className="mb-4">
              Nếu bạn có bất kỳ khiếu nại nào, vui lòng liên hệ với chúng tôi
              qua email hoặc số điện thoại được cung cấp trên trang web. Chúng
              tôi sẽ cố gắng giải quyết vấn đề của bạn trong thời gian sớm nhất.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Cung cấp mã đơn hàng</li>
              <li>Ngày mua hàng</li>
              <li>Chi tiết vấn đề bạn gặp phải</li>
            </ul>
            <p className="mb-4">
              Email hỗ trợ:{" "}
              <a
                href="mailto:support@example.com"
                className="text-blue-500 underline"
              >
                support@example.com
              </a>
            </p>
            <p>
              Số điện thoại hỗ trợ:{" "}
              <span className="text-blue-500 font-semibold">
                +84 123 456 789
              </span>
            </p>
          </div>
        );
      case "privacy":
        return (
          <div className="text-left p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-600">
              Chính sách bảo mật
            </h2>
            <p className="mb-4">
              Chúng tôi cam kết bảo mật thông tin cá nhân của bạn. Vui lòng đọc
              kỹ chính sách bảo mật của chúng tôi để hiểu rõ cách chúng tôi thu
              thập, sử dụng và bảo vệ thông tin của bạn.
            </p>
            <p className="mb-4">
              Thông tin cá nhân của bạn sẽ chỉ được sử dụng cho mục đích cung
              cấp dịch vụ và sẽ không được chia sẻ với bên thứ ba mà không có sự
              đồng ý của bạn.
            </p>
            <p className="mb-4">
              Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật, vui lòng liên
              hệ với chúng tôi qua email:{" "}
              <a
                href="mailto:privacy@example.com"
                className="text-green-500 underline"
              >
                privacy@example.com
              </a>
              .
            </p>
            <p>
              Để biết thêm thông tin chi tiết, vui lòng truy cập trang{" "}
              <a href="/privacy-policy" className="text-green-500 underline">
                Chính sách bảo mật
              </a>
              .
            </p>
          </div>
        );
      case "terms":
        return (
          <div className="text-left p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Điều khoản</h2>
            <p className="mb-4">
              Khi sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ các điều
              khoản và điều kiện được nêu ra. Vui lòng đọc kỹ để hiểu rõ quyền
              và nghĩa vụ của bạn.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Không sử dụng dịch vụ cho mục đích bất hợp pháp</li>
              <li>Không vi phạm quyền sở hữu trí tuệ</li>
              <li>Tuân thủ các quy định pháp luật hiện hành</li>
            </ul>
            <p className="mb-4">
              Nếu bạn vi phạm bất kỳ điều khoản nào, chúng tôi có quyền tạm
              ngừng hoặc chấm dứt dịch vụ mà không cần thông báo trước.
            </p>
            <p>
              Để biết thêm thông tin, vui lòng truy cập trang{" "}
              <a
                href="/terms-and-conditions"
                className="text-red-500 underline"
              >
                Điều khoản sử dụng
              </a>
              .
            </p>
          </div>
        );
      case "payment":
        return (
          <div className="text-left p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">
              Hướng dẫn thanh toán
            </h2>
            <p className="mb-4">
              Sau khi bạn hoàn tất thanh toán, hệ thống sẽ xử lý đơn hàng của
              bạn. Vui lòng đợi từ <strong>5 đến 10 phút</strong> để chúng tôi
              xác nhận thanh toán.
            </p>
            <p className="mb-4">
              Nếu bạn không nhận được xác nhận sau thời gian này, vui lòng liên
              hệ với chúng tôi qua email hoặc số điện thoại hỗ trợ.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Kiểm tra email để nhận thông báo xác nhận</li>
              <li>Đảm bảo thông tin thanh toán chính xác</li>
              <li>Liên hệ hỗ trợ nếu cần thiết</li>
            </ul>
            <p>
              Email hỗ trợ:{" "}
              <a
                href="mailto:payment@example.com"
                className="text-purple-500 underline"
              >
                payment@example.com
              </a>
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <GuestLayout>
      <Helmet>
        <title>Chính sách</title>
      </Helmet>
      <div className="container mx-auto py-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Chính sách</h1>
        <div className="tabs mb-6 flex space-x-4">
          <button
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "complaint"
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("complaint")}
          >
            Khiếu nại
          </button>
          <button
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "privacy"
                ? "bg-green-500 text-white shadow-lg"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("privacy")}
          >
            Chính sách bảo mật
          </button>
          <button
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "terms"
                ? "bg-red-500 text-white shadow-lg"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("terms")}
          >
            Điều khoản
          </button>
          <button
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "payment"
                ? "bg-purple-500 text-white shadow-lg"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab("payment")}
          >
            Hướng dẫn thanh toán
          </button>
        </div>
        <div className="w-full max-w-3xl">{renderContent()}</div>
      </div>
    </GuestLayout>
  );
};

export default InfoTabsPage;
