/* This example requires Tailwind CSS v2.0+ */
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import {
  ShoppingCartIcon,
  UserAddIcon,
  RefreshIcon,
} from "@heroicons/react/outline";
import { CurrencyDollarIcon } from "@heroicons/react/outline";
import { RestApi } from "../../../api/utils/axios";
import { useEffect, useState } from "react";
import { formatCurrencyVND } from "../../../common/helper";
import { CubeIcon } from "@heroicons/react/outline";
import { TagIcon } from "@heroicons/react/outline";
import { href } from "react-router-dom";
import { paths } from "../../../common/constant";
import { useNavigate } from "react-router-dom";
import { useFilterDashboard } from "../../../stores/useFilterDashboard";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Stats() {
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState(0);
  const [products, setProducts] = useState(0);
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState(0);
  const { filter, setFilter } = useFilterDashboard();
  const fetchData = async () => {
    try {
      const response = await RestApi.get("/getRevenueLast30Days");
      setRevenue(response.data.totalRevenue);
      const responseOrder = await RestApi.get("/getTotalOrdersLast30Days");
      setOrders(responseOrder.data.totalOrders);
      const responseProduct = await RestApi.get(
        "/getNewProductCountLast30Days"
      );
      setProducts(responseProduct.data.data);
      const responseCoupon = await RestApi.get("/getOrderNew");
      setCoupons(responseCoupon.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const stats = [
    {
      id: 1,
      name: "Tổng doanh thu",
      stat: formatCurrencyVND(revenue),
      icon: CurrencyDollarIcon,
      changeType: "increase",
      href: "#",
    },
    {
      id: 2,
      name: "Tổng đơn hàng",
      stat: orders,
      icon: ShoppingCartIcon,
      changeType: "increase",
      href: "#",
    },
    {
      id: 3,
      name: "Số lượng sản phẩm mới",
      stat: products,
      icon: CubeIcon,
      changeType: "increase",
      href: "#",
    },
    {
      id: 4,
      name: "Đơn hàng mới",
      stat: coupons,
      icon: TagIcon,
      changeType: "increase",
      href: paths.dashboard.order,
    },
  ];

  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Thống kê 30 ngày qua
      </h3>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            onClick={() => {
              console.log("13");

              setFilter("paying");
              navigate(item.href);
              // window.location.href = item.href;
            }}
            key={item.id}
            className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
          >
            <dt>
              <div className="absolute bg-white rounded-md p-3">
                <item.icon
                  className="h-6 w-6 text-indigo-500"
                  aria-hidden="true"
                />
              </div>
              <p className="ml-16 text-sm font-medium truncate">{item.name}</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold">{item.stat}</p>

              <div className="absolute bottom-0 inset-x-0 bg-white bg-opacity-10 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-white hover:underline"
                  >
                    {" "}
                    Xem chi tiết<span className="sr-only"> {item.name}</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
