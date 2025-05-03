import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { RestApi } from "../../../api/utils/axios";

// Hàm định dạng ngày theo chuẩn Việt Nam
const formatDate = (date: string, viewMode: "week" | "month" | "year") => {
  if (viewMode === "week")
    return `Tuần ${date.split("W")[1]} (${date.split("-")[0]})`;
  if (viewMode === "month") return dayjs(date).format("MM/YYYY");
  if (viewMode === "year") return date;
  return date;
};

export default function RevenueChart() {
  const [viewMode, setViewMode] = useState<"week" | "month" | "year">("week");
  const [chartData, setChartData] = useState<any[]>([]);

  // Hàm gọi API lấy dữ liệu doanh thu
  const fetchRevenueData = async (mode: "week" | "month" | "year") => {
    try {
      const response = await RestApi.get("/getRevenueChartByMode", {
        params: { mode },
      });
      const data = response.data.data;

      // Định dạng lại dữ liệu cho biểu đồ
      const formattedData = data.map(
        (item: { date: string; revenue: number }) => ({
          ...item,
          date: formatDate(item.date, mode),
        })
      );

      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };

  // Gọi API mỗi khi viewMode thay đổi
  useEffect(() => {
    fetchRevenueData(viewMode);
  }, [viewMode]);

  const renderButton = (mode: "week" | "month" | "year", label: string) => (
    <button
      onClick={() => setViewMode(mode)}
      style={{
        padding: "8px 16px",
        backgroundColor: viewMode === mode ? "#007bff" : "#e0e0e0",
        color: viewMode === mode ? "white" : "#333",
        border: "1px solid #ccc",
        borderRadius: 4,
        cursor: "pointer",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ width: "100%", height: 450, padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: 20, color: "#333" }}>
        Biểu đồ Doanh Thu
      </h2>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          gap: 10,
          justifyContent: "center",
        }}
      >
        {renderButton("week", "Tuần")}
        {renderButton("month", "Tháng")}
        {renderButton("year", "Năm")}
      </div>

      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value: any) => `${value.toLocaleString()} VND`}
            contentStyle={{
              backgroundColor: "#f5f5f5",
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#007bff"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
