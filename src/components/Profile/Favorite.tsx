import React, { useEffect, useState } from "react";
import { Product } from "../../types/interface";
import { RestApi } from "../../api/utils/axios";
import { useAuthStore } from "../../stores/useAuthStore";
import CardItemByCategories from "../ProductByCategories/CardItemByCategories";

export default function Favorite(): React.ReactElement {
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const { user } = useAuthStore();
  const fetchProduct = async () => {
    try {
      const response = await RestApi.get("/getListProductFavoriteByUser", {
        params: {
          id_user: user?.id_user,
        },
      });
      setListProduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [user]);
  return (
    <div className="   bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Sản phẩm yêu thích
      </h2>
      {listProduct.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 mb-4">Chưa có sản phẩm yêu thích nào.</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Khám phá sản phẩm
          </button>
        </div>
      ) : (
        <CardItemByCategories data={listProduct} />
      )}
    </div>
  );
}
