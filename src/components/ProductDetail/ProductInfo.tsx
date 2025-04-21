import React, { useState } from "react";
import { ProductDetail } from "../../types/interface";

interface ProductDetailProps {
  data: ProductDetail;
}
export default function ProductInfo({
  data,
}: ProductDetailProps): React.ReactElement {
  const product = {
    name: "Torua Helios Black Silver",
    price: "1.750.000 VND",
    purchases: 35,
    sizes: ["16cm", "18cm", "20cm", "22cm"],
    stock: 65,
    images: [
      "/images/product/sp1-1.webp",
      "/images/product/sp1-2.webp",
      "/images/product/sp1-3.webp",
      "/images/product/sp1-4.webp",
    ],
  };

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <div className="flex justify-center items-center   text-black ">
      <div className="flex gap-10 max-w-6xl w-full">
        {/* Hình ảnh sản phẩm */}
        <div className="flex gap-4 w-1/2">
          {/* Danh sách ảnh nhỏ */}
          <div className="flex flex-col gap-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="product"
                className={`w-20 h-20 cursor-pointer rounded-md border ${
                  selectedImage === img
                    ? "border-yellow-500"
                    : "border-gray-600"
                } hover:opacity-80 transition`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          {/* Ảnh chính */}
          <img
            className="w-[450px] h-[450px] object-cover rounded-lg border border-gray-700 shadow-lg"
            src={data.primary_image}
            alt="product"
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="w-1/2 space-y-4">
          <p className="text-sm text-gray-400">{data.name}</p>
          <h2 className="text-3xl font-bold">{data.name_product}</h2>
          <p className="text-2xl text-yellow-500 font-semibold">{data.price}</p>
          <p className="text-sm">{data.sale_quantity} lượt mua</p>

          {/* Chọn size */}
          <p className="text-sm">
            SIZE vòng tay{" "}
            <span className="text-gray-400">(Hướng dẫn đo size)</span>
          </p>
          <div className="flex gap-4">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`px-4 py-1 border rounded-md text-sm font-medium transition ${
                  selectedSize === size
                    ? "border-yellow-500 text-yellow-500 bg-gray-800"
                    : "border-gray-500 text-black hover:border-yellow-500 hover:text-yellow-500"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <p className="text-sm">Số lượng trong kho: {data.quantity} chiếc</p>

          {/* Chọn số lượng */}
          <div className="flex items-center gap-4">
            <div className="flex border border-gray-500 rounded-md">
              <button
                className="px-4 py-1 bg-gray-700 hover:bg-gray-600"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="px-5 py-1 text-lg font-medium">{quantity}</span>
              <button
                className="px-4 py-1 bg-gray-700 hover:bg-gray-600"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Nút thao tác */}
          <div className="flex gap-4 mt-4">
            <button className="border px-6 py-3 w-1/2 rounded-md hover:bg-gray-800 transition">
              THÊM VÀO GIỎ HÀNG
            </button>
            <button className="bg-yellow-500 px-6 py-3 text-black w-1/2 rounded-md font-semibold hover:bg-yellow-400 transition">
              MUA NGAY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
