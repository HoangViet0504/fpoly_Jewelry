import React from "react";
import { Product } from "../types/interface";

interface ProductProps {
  data?: Product[];
}

export default function CardItem({ data }: ProductProps): React.ReactElement {
  return (
    <div>
      <h2 className="sr-only">Products</h2>
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
        {data?.map((product) => (
          <div
            key={product.id}
            style={{ height: "460px", cursor: "pointer" }}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md  transition-opacity duration-300 hover:opacity-[0.8]"
          >
            <div className="group relative">
              {/* Hình ảnh */}
              <div className="aspect-w-3 aspect-h-4 bg-gray-200">
                <img
                  style={{ borderRadius: "4px" }}
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Nội dung sản phẩm */}
              <div className="p-4 space-y-2">
                <h3
                  style={{
                    minHeight: "40px",
                    width: "240px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    whiteSpace: "normal",
                  }}
                  className="text-sm font-medium text-gray-900"
                >
                  <a href={product.href}>{product.name}</a>
                </h3>
                <p
                  style={{
                    width: "230px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    whiteSpace: "normal",
                  }}
                  className="text-sm text-gray-500"
                >
                  {product.description}
                </p>
                <p className="text-sm italic text-gray-500">
                  Màu sắc : {product.options}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p className="text-base font-semibold text-gray-900">
                    Giá : {product.price}
                  </p>
                  <del className="text-base font-semibold text-gray-900">
                    Giá gốc: {product.price}
                  </del>
                </div>
              </div>
              {/* Nút "Mua ngay" & "Thêm vào giỏ hàng" */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
                className="absolute top-32 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-[1] "
              >
                <button
                  style={{ width: "137.5px", cursor: "pointer" }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md transition-opacity duration-300 hover:opacity-[0.69]"
                >
                  Mua ngay
                </button>
                <button
                  style={{ width: "137.5px", cursor: "pointer" }}
                  className="bg-green-500 text-white  px-4 py-2 rounded-md transition-opacity duration-300 hover:opacity-[0.69]"
                >
                  Thêm hàng
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
