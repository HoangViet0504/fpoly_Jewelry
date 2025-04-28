// Dashboard.tsx
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Mock data mẫu
const revenueByDay = [
  { time: "01/04", revenue: 500 },
  { time: "02/04", revenue: 700 },
  { time: "03/04", revenue: 400 },
  { time: "04/04", revenue: 650 },
];

const revenueByWeek = [
  { time: "Tuần 1", revenue: 2000 },
  { time: "Tuần 2", revenue: 2500 },
  { time: "Tuần 3", revenue: 1800 },
  { time: "Tuần 4", revenue: 3000 },
];

const revenueByMonth = [
  { time: "01/2025", revenue: 8000 },
  { time: "02/2025", revenue: 10000 },
  { time: "03/2025", revenue: 8500 },
];

const revenueByYear = [
  { time: "2022", revenue: 90000 },
  { time: "2023", revenue: 110000 },
  { time: "2024", revenue: 95000 },
];

const topProducts = [
  { name: "Sản phẩm A", sold: 120 },
  { name: "Sản phẩm B", sold: 90 },
  { name: "Sản phẩm C", sold: 75 },
];

const monthlyRevenue = [
  { month: "01/2025", revenue: 5000 },
  { month: "02/2025", revenue: 7000 },
  { month: "03/2025", revenue: 5500 },
  { month: "04/2025", revenue: 8000 },
];

const orderStatus = [
  { status: "Hoàn tất", count: 120 },
  { status: "Đang xử lý", count: 45 },
  { status: "Đã hủy", count: 15 },
];

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState<
    "day" | "week" | "month" | "year"
  >("day");

  const getRevenueData = () => {
    switch (timeFilter) {
      case "day":
        return revenueByDay;
      case "week":
        return revenueByWeek;
      case "month":
        return revenueByMonth;
      case "year":
        return revenueByYear;
      default:
        return [];
    }
  };

  return (
    <div
      style={{ padding: 20, display: "flex", flexDirection: "column", gap: 40 }}
    >
      {/* Top sản phẩm bán chạy nhất */}
      <div>
        <h3>Top sản phẩm bán chạy nhất</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topProducts}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sold" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
