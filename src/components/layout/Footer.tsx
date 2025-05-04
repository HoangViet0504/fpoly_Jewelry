import React from "react";
import { paths } from "../../common/constant";

interface NavigationItem {
  name: string;
  href: string;
  icon?: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
}

interface Navigation {
  support: NavigationItem[];
  solutions: NavigationItem[];
  legal: NavigationItem[];
  social: NavigationItem[];
}

const navigation: Navigation = {
  // products: [
  //   { name: "Sản phẩm mới", href: "#" },
  //   { name: "Khuyến mãi", href: "#" },
  //   { name: "Bán chạy", href: "#" },
  //   { name: "Tất cả sản phẩm", href: "#" },
  // ],
  support: [
    { name: "Hướng dẫn mua hàng", href: "#" },
    { name: "Chính sách vận chuyển", href: "#" },
    { name: "Chính sách đổi trả", href: "#" },
    { name: "Liên hệ hỗ trợ", href: "#" },
  ],
  solutions: [
    { name: "Giới thiệu", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Tuyển dụng", href: "#" },
    { name: "Đối tác", href: "#" },
  ],
  legal: [
    { name: "Chính sách bảo mật", href: paths.policy },
    { name: "Điều khoản sử dụng", href: paths.policy },
    { name: "Chính sách thanh toán", href: paths.policy },
    { name: "Khiếu nại & hoàn tiền", href: paths.policy },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Zalo",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 48 48" {...props}>
          <path d="M24 2C12.42 2 3 10.42 3 21c0 4.22 1.8 8.08 4.8 11.02L6 44l12.41-5.18C20.33 40.27 22.15 41 24 41c11.58 0 21-8.42 21-20S35.58 2 24 2zM17 20h-2v-6h2v6zm2-6h2v6h-2v-6zm10 0h2v6h-2v-6zm-4 0h2v6h-2v-6zm-2 7h8v2h-8v-2zm6 3h2v2h-2v-2zm-4 0h2v2h-2v-2z" />
        </svg>
      ),
    },
  ],
};

export default function GuestFooter(): React.ReactElement {
  return (
    <footer className="bg-black" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Chân trang
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-2 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <img
              style={{ borderRadius: "6px" }}
              className=""
              src="/icons/logo/logo.svg"
              alt="Tên công ty"
            />
            <p className="text-white text-base">
              Làm cho thế giới trở nên tốt đẹp hơn thông qua việc xây dựng các
              hệ thống phân cấp tinh tế.
            </p>
          </div>
          <div className="mt-12 flex justify-between">
            <div className="md:grid md:grid-cols-3 md:gap-8">
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Hỗ trợ
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-white hover:text-gray-400"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Chính sách
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-white hover:text-gray-400"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="
               mt-12 md:mt-0
              "
              >
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Liên hệ
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.social.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-white hover:text-gray-400"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-white xl:text-center">
            &copy; 2020 Workflow, Inc. Mọi quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
