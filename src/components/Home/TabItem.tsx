import { Product, TabItemProps } from "../../types/interface";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCardItem from "../SwiperCardItem";
import Container from "../Container";
import { useState } from "react";

const productsTab1: Product[] = [
  {
    id: 1,
    name: "Basic Tee 8-Pack",
    href: "#",
    price: "$256",
    description:
      "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    options: "8 colors",
    imageSrc: "/images/product/sp1-1.webp",
    imageAlt:
      "Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    price: "$32",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc: "/images/product/sp1-2.webp",
    imageAlt: "Front of plain black t-shirt.",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    price: "$32",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc: "/images/product/sp1-3.webp",
    imageAlt: "Front of plain black t-shirt.",
  },
  {
    id: 4,
    name: "Basic Tee",
    href: "#",
    price: "$32",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc: "/images/product/sp1-4.webp",
    imageAlt: "Front of plain black t-shirt.",
  },
  {
    id: 5,
    name: "Basic Tee",
    href: "#",
    price: "$32",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc: "/images/product/sp2-1.webp",
    imageAlt: "Front of plain black t-shirt.",
  },
  {
    id: 6,
    name: "Basic Tee",
    href: "#",
    price: "$32",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc: "/images/product/sp1-5.webp",
    imageAlt: "Front of plain black t-shirt.",
  },
  {
    id: 7,
    name: "Basic Tee",
    href: "#",
    price: "$32",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc: "/images/product/sp2-2.webp",
    imageAlt: "Front of plain black t-shirt.",
  },
];
const productsTab2: Product[] = [
  {
    id: 5,
    name: "Basic Tee",
    href: "#",
    price: "$32",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc: "/images/product/sp2-1.webp",
    imageAlt: "Front of plain black t-shirt.",
  },
  {
    id: 6,
    name: "Basic Tee",
    href: "#",
    price: "$32",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc: "/images/product/sp1-5.webp",
    imageAlt: "Front of plain black t-shirt.",
  },
  {
    id: 7,
    name: "Basic Tee",
    href: "#",
    price: "$32",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc: "/images/product/sp2-2.webp",
    imageAlt: "Front of plain black t-shirt.",
  },
  {
    id: 7,
    name: "Basic Tee",
    href: "#",
    price: "$32",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc: "/images/product/sp2-3.webp",
    imageAlt: "Front of plain black t-shirt.",
  },
];

const arrTab: TabItemProps[] = [
  { id: 1, name: "Sản phẩm mới" },
  { id: 2, name: "Sản phẩm bán chạy" },
];

export default function TabItem() {
  const [currentTab, setCurrentTab] = useState<number>(1);
  return (
    <Container>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {arrTab.map((item, index) => (
            <div
              onClick={() => {
                setCurrentTab(item.id);
              }}
              key={index}
              style={{
                background: currentTab === item.id ? "#000" : "#fff",
                padding: "10px 0px ",
                borderRadius: "6px",
                border: "1px solid #000",
                minWidth: "200px",
                cursor: "pointer",
              }}
            >
              <p
                style={{
                  color: currentTab === item.id ? "#fff" : "#000",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {item.name}
              </p>
            </div>
          ))}
        </div>
        {currentTab === 1 ? (
          <SwiperCardItem data={productsTab1} />
        ) : (
          <SwiperCardItem data={productsTab2} />
        )}
      </div>
    </Container>
  );
}
