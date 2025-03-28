import React, { useState } from "react";

const ProductFilter = () => {
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [isOpen, setIsOpen] = useState({ price: true, size: false, sale: false });

  const toggleSection = (section) => {
    setIsOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="w-64 bg-gray-900 text-white p-4 space-y-2">
      {/* Giá */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer p-2 bg-gray-800"
          onClick={() => toggleSection("price")}
        >
          <span>Giá</span>
          <span>{isOpen.price ? "−" : "+"}</span>
        </div>
        {isOpen.price && (
          <div className="p-2 bg-black">
            <div className="flex justify-between text-sm">
              <input
                type="text"
                className="w-20 p-1 bg-gray-800 text-white border border-gray-600 text-center"
                value={priceRange[0].toLocaleString("vi-VN")}
                readOnly
              />
              <span>đ</span>
              <input
                type="text"
                className="w-20 p-1 bg-gray-800 text-white border border-gray-600 text-center"
                value={priceRange[1].toLocaleString("vi-VN")}
                readOnly
              />
              <span>đ</span>
            </div>
            {/* Thanh trượt */}
            <input
              type="range"
              min="0"
              max="1000000"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-full mt-2 accent-white"
            />
            <input
              type="range"
              min="0"
              max="1000000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full accent-white"
            />
          </div>
        )}
      </div>

      {/* Cỡ */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer p-2 bg-gray-800"
          onClick={() => toggleSection("size")}
        >
          <span>Cỡ</span>
          <span>{isOpen.size ? "−" : "+"}</span>
        </div>
      </div>

      {/* Sale */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer p-2 bg-gray-800"
          onClick={() => toggleSection("sale")}
        >
          <span>Sale</span>
          <span>{isOpen.sale ? "−" : "+"}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
