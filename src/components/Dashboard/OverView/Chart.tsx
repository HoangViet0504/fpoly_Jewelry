// RevenueChart.tsx
import { useState } from "react";
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

const rawData = [
  { date: "2025-01-15", revenue: 500 },
  { date: "2025-02-20", revenue: 700 },
  { date: "2025-03-10", revenue: 400 },
  { date: "2025-04-05", revenue: 800 },
  { date: "2025-06-25", revenue: 650 },
  { date: "2025-09-12", revenue: 900 },
  { date: "2026-01-18", revenue: 1200 },
  { date: "2026-04-10", revenue: 1100 },
  { date: "2026-08-15", revenue: 1400 },
  { date: "2027-03-21", revenue: 1000 },
  { date: "2027-07-11", revenue: 950 },
];

// Hàm group theo tuần
const groupByWeek = (data: typeof rawData) => {
  const grouped: { [week: string]: number } = {};
  data.forEach((item) => {
    const week = dayjs(item.date).startOf("week").format("YYYY-[W]WW");
    grouped[week] = (grouped[week] || 0) + item.revenue;
  });
  return Object.keys(grouped).map((week) => ({
    date: week,
    revenue: grouped[week],
  }));
};

// Hàm group theo tháng
const groupByMonth = (data: typeof rawData) => {
  const grouped: { [month: string]: number } = {};
  data.forEach((item) => {
    const month = dayjs(item.date).format("YYYY-MM");
    grouped[month] = (grouped[month] || 0) + item.revenue;
  });
  return Object.keys(grouped).map((month) => ({
    date: month,
    revenue: grouped[month],
  }));
};

// Hàm group theo năm
const groupByYear = (data: typeof rawData) => {
  const grouped: { [year: string]: number } = {};
  data.forEach((item) => {
    const year = dayjs(item.date).format("YYYY");
    grouped[year] = (grouped[year] || 0) + item.revenue;
  });
  return Object.keys(grouped).map((year) => ({
    date: year,
    revenue: grouped[year],
  }));
};

// Hàm định dạng ngày theo chuẩn Việt Nam
const formatDate = (
  date: string,
  viewMode: "day" | "week" | "month" | "year"
) => {
  if (viewMode === "week")
    return `Tuần ${date.split("W")[1]} (${date.split("-")[0]})`;
  if (viewMode === "month") return dayjs(date).format("MM/YYYY");
  if (viewMode === "year") return date;
  return dayjs(date).format("DD/MM/YYYY");
};

export default function RevenueChart() {
  const [viewMode, setViewMode] = useState<"day" | "week" | "month" | "year">(
    "day"
  );

  const getData = () => {
    if (viewMode === "week") return groupByWeek(rawData);
    if (viewMode === "month") return groupByMonth(rawData);
    if (viewMode === "year") return groupByYear(rawData);
    return rawData;
  };

  const renderButton = (
    mode: "day" | "week" | "month" | "year",
    label: string
  ) => (
    <button
      onClick={() => setViewMode(mode)}
      style={{
        padding: "6px 12px",
        backgroundColor: viewMode === mode ? "#007bff" : "#ccc",
        color: "white",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
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
        {renderButton("day", "Ngày")}
        {renderButton("week", "Tuần")}
        {renderButton("month", "Tháng")}
        {renderButton("year", "Năm")}
      </div>

      <ResponsiveContainer>
        <LineChart
          data={getData().map((item) => ({
            ...item,
            date: formatDate(item.date, viewMode),
          }))}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value: any) => `${value} VND`} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
