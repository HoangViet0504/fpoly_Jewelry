import React from "react";
import { Product } from "../../types/interface";
import { formatCurrencyVND } from "../../common/helper";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { paths } from "../../common/constant";
import CircularProgress from "@mui/material/CircularProgress";

interface ProductProps {
  data?: Product[];
  loading?: boolean;
}

export default function CardItemByCategories({
  data,
  loading,
}: ProductProps): React.ReactElement {
  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="grid lg:grid-cols-1 mt-7"
        >
          <CircularProgress size="40px" />
        </div>
      ) : data?.length !== 0 ? (
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3">
          {data?.map((product) => (
            <div
              key={product.id}
              style={{
                height: "460px",
                cursor: "pointer",
                padding: "0px 0px 20px 0px",
                borderRadius: "4px",
              }}
              className="bg-white border border-gray-200  overflow-hidden shadow-md  transition-opacity duration-300 "
            >
              <a href={paths.productDetail(product.slug)}>
                <div className="group relative">
                  {/* Hình ảnh */}
                  <div
                    style={{ height: "200px" }}
                    className="aspect-w-3 aspect-h-4 bg-gray-200"
                  >
                    <img
                      style={{
                        borderRadius: "4px",
                        height: "100%",
                        width: "100%",
                      }}
                      src={product.primary_image}
                      alt={product.primary_image}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Nội dung sản phẩm */}
                  <div className=" p-2.5 space-y-2">
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
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "#444444",
                      }}
                      className="text-sm font-medium "
                    >
                      <span>{product.name_product}</span>
                    </h3>
                    <p
                      style={{
                        width: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        whiteSpace: "normal",
                      }}
                      className="text-sm text-gray-500"
                    >
                      Mô tả: {product.short_description}
                    </p>
                    <p className="text-sm italic ">Chất liệu: {product.made}</p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "end",
                        gap: "10px",
                      }}
                    >
                      <p
                        style={{ color: "#d70018", fontWeight: 700 }}
                        className="text-base font-semibold "
                      >
                        {product.price_sale === 0
                          ? formatCurrencyVND(product.price)
                          : formatCurrencyVND(product.price_sale)}
                      </p>
                      {product.price_sale && (
                        <del
                          style={{
                            color: "#707070",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                          }}
                          className="text-base font-semibold "
                        >
                          {formatCurrencyVND(product.price)}
                        </del>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        justifyContent: "flex-end",
                      }}
                    >
                      <p>Yêu thích</p>
                      <FavoriteBorderIcon />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                      className=" left-0 right-0 flex justify-center gap-4   "
                    >
                      <button
                        style={{
                          width: "137.5px",
                          cursor: "pointer",
                          background: "#D70707",
                        }}
                        className=" text-white px-4 py-2 rounded-md transition-opacity duration-300 hover:opacity-[0.69]"
                      >
                        Mua ngay
                      </button>
                      <button
                        style={{
                          width: "137.5px",
                          cursor: "pointer",
                          background: "#4CAF50",
                        }}
                        className=" text-white  px-4 py-2 rounded-md transition-opacity duration-300 hover:opacity-[0.69]"
                      >
                        Thêm hàng
                      </button>
                    </div>
                  </div>
                  {/* Nút "Mua ngay" & "Thêm vào giỏ hàng" */}
                </div>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <p>Không tìm thấy sản phẩm</p>
          <img
            style={{ width: "100px", height: "auto" }}
            src="/images/empty/empty-box.png"
          />
        </div>
      )}
    </div>
  );
}
