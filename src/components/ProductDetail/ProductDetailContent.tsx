import React, { useEffect, useState } from "react";

import Container from "../Container";
import { RestApi } from "../../api/utils/axios";
import { Product, ProductDetail } from "../../types/interface";
import { addToCart, formatCurrencyVND } from "../../common/helper";
import ProductReview from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";
import { useAuthStore } from "../../stores/useAuthStore";
import { ToastMessage } from "../ToastMessage";

interface ProductDetailContentProps {
  slug: string;
}
export default function ProductDetailContent({
  slug,
}: ProductDetailContentProps): React.ReactElement {
  const [ProductDetail, setProductDetail] = useState<ProductDetail>(
    {} as ProductDetail
  );
  const [listCardSameId, setListCardSameId] = useState<Product[]>([]);

  const fetchProductDetail = async () => {
    try {
      const response = await RestApi.get("/getProductDetail", {
        params: { slug },
      });
      setProductDetail(response.data.data);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  const sizes = ProductDetail.size ? JSON.parse(ProductDetail.size) : [];
  console.log(ProductDetail.size);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const { user } = useAuthStore();

  const fetchProductSameId = async () => {
    try {
      const response = await RestApi.get("/getProductSameIdCategories", {
        params: { slug },
      });
      setListCardSameId(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (ProductDetail) {
      setSelectedSize(sizes[0] ?? "");
    }
  }, [ProductDetail]);

  useEffect(() => {
    if (slug) {
      fetchProductDetail();
      fetchProductSameId();
    }
  }, [slug]);

  return (
    <Container sx={{ padding: "30px 0px" }}>
      <div className="flex flex-col gap-10   text-black  ">
        <div className="flex gap-10 max-w-6xl w-full">
          {/* Hình ảnh sản phẩm */}
          <div className="flex gap-4 w-1/2">
            {/* Danh sách ảnh nhỏ */}
            <div className="flex flex-col gap-2">
              {ProductDetail.listImage &&
                ProductDetail.listImage.map((img, index) => (
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
              src={ProductDetail.primary_image}
              alt="product"
            />
          </div>

          {/* Thông tin sản phẩm */}
          <div className="w-1/2 space-y-4">
            <p className="text-sm text-gray-400">{ProductDetail.name}</p>
            <h2 className="text-3xl font-bold">{ProductDetail.name_product}</h2>
            <div style={{ display: "flex", gap: "10px", alignItems: "end" }}>
              {Number(ProductDetail.price_sale) > 0 ? (
                <p className="text-2xl text-yellow-500 font-semibold">
                  {formatCurrencyVND(Number(ProductDetail.price_sale))}
                </p>
              ) : (
                <p className="text-2xl text-yellow-500 font-semibold">
                  {formatCurrencyVND(Number(ProductDetail.price))}
                </p>
              )}
              {Number(ProductDetail.price_sale) > 0 && (
                <del>{formatCurrencyVND(Number(ProductDetail.price))}</del>
              )}
            </div>
            <p className="text-sm">{ProductDetail.sale_quantity} lượt mua</p>

            {sizes && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {/* Chọn size */}
                <p className="text-xl font-semibold ">Chọn kích cỡ:</p>
                <div className="flex gap-4 ">
                  {sizes.map((size: string) => (
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
              </div>
            )}

            <p className="text-sm">
              Số lượng trong kho: {ProductDetail.quantity} chiếc
            </p>
            {ProductDetail.quantity > 0 && ProductDetail.quantity < 10 && (
              <p className="text-sm text-red-500 font-semibold">Sắp hết hàng</p>
            )}
            {ProductDetail.quantity === 0 && (
              <p className="text-sm text-red-500 font-semibold">Hết hàng</p>
            )}

            {/* Chọn số lượng */}
            <div className="flex items-center gap-4">
              <div className="flex border text-white rounded-md">
                <button
                  disabled={ProductDetail.quantity === 0}
                  className="px-4 py-1 bg-gray-700 hover:bg-gray-600"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <span className="px-5 py-1 text-lg font-medium text-gray-900 ">
                  {quantity}
                </span>
                <button
                  disabled={ProductDetail.quantity === 0}
                  className="px-4 py-1 bg-gray-700 hover:bg-gray-600"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Nút thao tác */}
            <div className="flex gap-4 mt-4">
              <button
                disabled={ProductDetail.quantity === 0}
                onClick={async () => {
                  if (ProductDetail.quantity < quantity) {
                    ToastMessage(
                      "error",
                      `Số lượng sản phẩm trong kho không đủ!`
                    );
                    return;
                  }
                  if (!user) {
                    addToCart({
                      id_product: ProductDetail.id,
                      size: selectedSize === "" ? undefined : selectedSize,
                      quantity,
                      total:
                        Number(ProductDetail.price_sale) > 0
                          ? Number(ProductDetail.price_sale) * quantity
                          : Number(ProductDetail.price) * quantity,
                      made: ProductDetail.made,
                      id_user: undefined,
                    });
                  } else {
                    try {
                      const response = await RestApi.post("/addProductToCart", {
                        id_product: ProductDetail.id,
                        size: selectedSize === "" ? undefined : selectedSize,
                        quantity,
                        made: ProductDetail.made,
                        id_user: user.id_user,
                      });
                      ToastMessage("success", response.data.message);
                    } catch (error) {
                      console.log(error);
                    }
                  }
                }}
                className="border px-6 py-3 w-1/2 rounded-md hover:bg-gray-800 transition cursor-pointer hover:text-white"
              >
                Thêm hàng
              </button>
              <button
                disabled={ProductDetail.quantity === 0}
                className="bg-yellow-500 px-6 py-3 text-black w-1/2 rounded-md font-semibold hover:bg-yellow-400 transition"
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>

        <ProductReview data={ProductDetail} />

        <RelatedProducts data={listCardSameId} />
      </div>
    </Container>
  );
}
