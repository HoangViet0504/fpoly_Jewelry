import React, { useState } from "react";
import Poster from "./poster";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";
import Pagination from "./Pagination";
import Footer from "../layout/Footer";
import GuestHeader from "../layout/Header";

const products = [
  {
    id: 1,
    name: "Gentlemen Phoenix Stone Ring Helios Silver",
    price: "795.000 VND",
    imageSrc: "/images/product/sp1-1.webp",
    purchases: 120,
  },
  {
    id: 2,
    name: "Palatial Helios Silver",
    price: "Từ 795.000 VND",
    imageSrc: "/images/product/sp1-2.webp",
    purchases: 98,
  },
  {
    id: 3,
    name: "BAGI LOTUS RING Helios Silver",
    price: "795.000 VND",
    imageSrc: "/images/product/sp1-3.webp",
    purchases: 75,
  },
  {
    id: 4,
    name: "Hộp Gỗ Helios",
    price: "99.000 VND",
    imageSrc: "/images/product/sp1-4.webp",
    purchases: 45,
  },
  {
    id: 5,
    name: "Silver Chain Bracelet Helios",
    price: "1.200.000 VND",
    imageSrc: "/images/product/sp1-5.webp",
    purchases: 60,
  },
  {
    id: 6,
    name: "Golden Signet Ring Helios",
    price: "1.500.000 VND",
    imageSrc: "/images/product/sp1-6.webp",
    purchases: 30,
  },
];

const itemsPerPage = 9;

const CategoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <GuestHeader />
      <div className="bg-black text-white">
        <Poster />
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex">
            <ProductFilter />
            <ProductList products={displayedProducts} />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
