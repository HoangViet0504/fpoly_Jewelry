import React from "react";
import Stats from "./Stats";
import PotentialUsersChart from "./PotentialUsersChart";
import RevenueChart from "./Chart";
import TopProductsBarChart from "./TopProductChart";
import OrderStatusPieChart from "./PieChart";

export default function OverViewContent(): React.ReactElement {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
        Tổng Quan Bảng Điều Khiển
      </h1>
      <p style={{ textAlign: "center", color: "#666" }}>
        Một cái nhìn nhanh về hiệu suất kinh doanh và các chỉ số chính.
      </p>
      <Stats />
      <div style={{ display: "flex", flexDirection: "column", gap: "200px" }}>
        <div style={{ boxShadow: "none" }} className="grid grid-cols-2 gap-4">
          <div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Tổng Quan Doanh Thu
            </h2>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Theo dõi xu hướng doanh thu theo thời gian.
            </p>
            <RevenueChart />
          </div>
          <div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Sản Phẩm Hàng Đầu
            </h2>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Xem sản phẩm nào đang hoạt động tốt nhất.
            </p>
            <TopProductsBarChart />
          </div>
        </div>
        <div style={{ boxShadow: "none" }} className="grid grid-cols-2 gap-4">
          <div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Trạng Thái Đơn Hàng
            </h2>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Phân tích phân bố các trạng thái đơn hàng: Đang thanh toán, Đang
              giao, Mới, Thành công, Hủy.
            </p>
            <OrderStatusPieChart />
          </div>
          <div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Người Dùng Tiềm Năng
            </h2>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Thông tin chi tiết về sự tăng trưởng người dùng tiềm năng.
            </p>
            <PotentialUsersChart />
          </div>
        </div>
      </div>
    </div>
  );
}
