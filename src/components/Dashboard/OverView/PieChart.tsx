import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Hoàn thành", value: 400 },
  { name: "Đang xử lý", value: 200 },
  { name: "Hủy", value: 100 },
];

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"]; // Màu cho từng trạng thái

export default function OrderStatusPieChart() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={[
              { name: "Đang thanh toán", value: 300 },
              { name: "Mới", value: 150 },
              { name: "Đang giao hàng", value: 250 },
              { name: "Hoàn thành", value: 400 },
              { name: "Hủy", value: 100 },
            ]}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {[
              "#0088FE", // Đang thanh toán
              "#00C49F", // Mới
              "#FFBB28", // Đang giao hàng
              "#FF8042", // Hoàn thành
              "#FF0000", // Hủy
            ].map((color, index) => (
              <Cell key={`cell-${index}`} fill={color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
