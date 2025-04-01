import React, { use, useEffect, useState } from "react";
import Container from "../Container";
import { paths } from "../../helper/constant";

import DropDownUser from "../dropDown/DropDownUser";

interface NavigationItem {
  name: string;
  href: string;
}

// Mảng navigation được khai báo với kiểu dữ liệu
const navigationLeft: NavigationItem[] = [
  { name: "ABOUT US", href: paths.about },
  { name: "STORE", href: "#" },
];

const navigationTwo: NavigationItem[] = [
  { name: "VÒNG TAY", href: "/" },
  { name: "NHẪN", href: "#" },
  { name: "DÂY CHUYỀN", href: "#" },
  { name: "KHUYÊN TAI", href: "#" },
  { name: "BỘ SƯU TẬP", href: "#" },
];

const GuestHeader: React.FC = () => {
  return (
    <div style={{ width: "100%" }} className="">
      <div style={{ background: "#FAB320" }}>
        <p className="font-semibold text-black py-2 text-center">
          VẬN CHUYỂN TOÀN QUỐC
        </p>
      </div>
      <div
        style={{
          background: "#000000",
          borderTop: "2px solid #fff ",
          borderBottom: "2px solid #fff",
        }}
      >
        <Container>
          <div className="flex items-center justify-between">
            <div className="hidden space-x-8 md:flex ">
              {navigationLeft.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-white hover:text-gray-300"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="flex items-center justify-between w-full md:w-auto">
              <a href={paths.home}>
                <img
                  className="w-[120px] h-[70px] md:w-[120px] md:h-[70px] sm:w-[70px] sm:h-[30px] xs:w-[50px] xs:h-[30px]"
                  src="/icons/logo/logo.svg"
                  alt="Workflow Logo"
                />
              </a>
            </div>
            <div className="hidden space-x-5 md:flex items-center ">
              <div
                style={{ cursor: "pointer" }}
                className="text-base font-medium text-white hover:text-gray-300"
              >
                <img
                  className="w-[30px] h-[30px] md:w-[30px] md:h-[30px] sm:w-[30px] sm:h-[30px] xs:w-[30px] xs:h-[30px]"
                  src="/icons/header/search.svg"
                  alt=""
                />
              </div>

              <DropDownUser />
              <a
                style={{ cursor: "pointer" }}
                href={paths.cart}
                className="text-base font-medium text-white hover:text-gray-300"
              >
                <img
                  className="w-[30px] h-[30px] md:w-[30px] md:h-[30px] sm:w-[30px] sm:h-[30px] xs:w-[30px] xs:h-[30px]"
                  src="/icons/header/cart.svg"
                  alt=""
                />
              </a>
            </div>
          </div>
        </Container>
      </div>
      <div style={{ background: "#000000", borderBottom: "2px solid #fff" }}>
        <Container>
          <div className="flex items-center justify-center py-4">
            <div className="hidden space-x-8 md:flex ">
              {navigationTwo.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-white hover:text-gray-300"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default GuestHeader;
