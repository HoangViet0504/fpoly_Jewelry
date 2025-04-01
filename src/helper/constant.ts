import { Product } from "../types/interface";

export const productsTab2: Product[] = [
  {
    id: 5,
    name: "Phụ kiện thời trang là gì - điểm mặt một số loại phụ kiện quan trọng",
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
    name: " Thương hiệu của những người đàn ông trưởng thành",
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
    name: "NHẪN BẠC NAM - KHÁC BIỆT",
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
    name: "DÂY CHUYỀN NAM - ĐỘC BẢN",
    href: "#",
    price: "$32",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc: "/images/product/sp2-3.webp",
    imageAlt: "Front of plain black t-shirt.",
  },
];

export const productsTab1: Product[] = [
  {
    id: 1,
    name: "Product Title Goes Here",
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
    name: "NHẪN BẠC NAM - KHÁC BIỆT",
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
    name: "DÂY CHUYỀN NAM - ĐỘC BẢN",
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
    name: "KHUYÊN TAI NAM - ĐỘC NHẤT",
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
    name: "VÒNG TAY NAM - VÔ THỰC",
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
    name: " Thương hiệu của những người đàn ông trưởng thành",
    href: "#",
    price: "$32",
    description:
      "Look like a visionary CEO and wear the same black t-shirt every day.",
    options: "Black",
    imageSrc: "/images/product/sp2-2.webp",
    imageAlt: "Front of plain black t-shirt.",
  },
];

export const paths = {
  home: "/",
  auth: {
    signIn: "/sign-in",
    signUp: "/sign-up",
    resetPassword: "/reset-password",
  },
  about: "/about-us",
  cart: "/cart",
  checkout: "/checkout",
  profile: "/profile",
  dashboard: {
    overView: "/dashboard/over-view",
    user: "/dashboard/manage-user",
  },
  errors: { notFound: "/not-found" },
} as const;

export const Token = "access-token";
