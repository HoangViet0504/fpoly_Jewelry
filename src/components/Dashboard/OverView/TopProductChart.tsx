import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Vòng cổ", sales: 320 },
  { name: "Nhẫn cưới", sales: 280 },
  { name: "Lắc tay", sales: 200 },
  { name: "Khuyên tai", sales: 150 },
  { name: "Đồng hồ", sales: 120 },
];

export default function TopProductsBarChart() {
  return (
    <div style={{ width: "100%", height: 400, textAlign: "center" }}>
      <h3 style={{ marginBottom: 20, color: "#4A4A4A", fontWeight: "bold" }}>
        Top Sản Phẩm Bán Chạy
      </h3>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 14, fontWeight: "bold", fill: "#555" }}
          />
          <YAxis
            tick={{ fontSize: 14, fontWeight: "bold", fill: "#555" }}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 10,
            }}
            cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
          />
          <Bar
            dataKey="sales"
            fill="#8884d8"
            barSize={50}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      <p style={{ marginTop: 15, fontSize: 16, color: "#777" }}>
        Dữ liệu được cập nhật hàng tháng để phản ánh xu hướng mới nhất
      </p>
    </div>
  );
}
