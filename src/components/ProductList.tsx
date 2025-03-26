import React from "react";

const ProductList = ({ products }) => {
  return (
    <div className="flex-1 grid grid-cols-3 gap-6 bg-black text-white p-4 max-w-6xl">
      {products.map((product) => (
        <div key={product.id} className="bg-gray-900 p-4 rounded-lg">
          {/* Ảnh sản phẩm */}
          <div className="bg-gray-700 h-48 rounded-lg flex items-center justify-center">
            <img src={product.imageSrc} alt={product.name} className="h-full w-full object-cover rounded-lg" />
          </div>

          {/* Thông tin sản phẩm */}
          <div className="mt-3">
            <h3 className="text-lg font-semibold truncate">{product.name}</h3>
            <p className="text-yellow-400 font-bold">{product.price}</p>
            <p className="text-gray-400 text-sm">Lượt mua: {product.purchases}</p>
          </div>

          {/* Nút xem chi tiết */}
          <button className="mt-3 w-full py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400">
            Xem chi tiết
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
