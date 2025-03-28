import React, { useState } from "react";

const productsTab1 = [
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

export default function RelatedProducts() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const handleNext = () => {
    if (startIndex + itemsPerPage < productsTab1.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="p-10 bg-black text-white relative">
      <h3 className="text-2xl font-bold mb-6">You may also like</h3>
      <div className="relative overflow-hidden">
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-500 disabled:opacity-50"
          disabled={startIndex === 0}
        >
          ◀
        </button>
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)` }}>
          {productsTab1.map((product) => (
            <div key={product.id} className="w-1/4 flex-shrink-0 p-4">
              <div className="bg-black p-4 rounded-lg text-center border-2 border-white">
                <img
                  src={product.imageSrc}
                  alt={product.name}
                  className="w-full h-60 object-cover rounded-md border-2 border-white"
                />
                <p className="mt-4 font-semibold h-12 flex items-center justify-center text-center px-2 truncate">
                  {product.name}
                </p>
                <p className="text-yellow-500 font-medium">{product.price}</p>
                <div className="mt-2 text-white text-sm">
                  {product.purchases} lượt mua
                </div>
                <button className="w-full bg-gray-700 text-white py-2 mt-4 rounded-md font-semibold cursor-not-allowed">
                  Thêm nhanh
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-500 disabled:opacity-50"
          disabled={startIndex + itemsPerPage >= productsTab1.length}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
