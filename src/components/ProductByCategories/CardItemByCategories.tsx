import React, { useEffect, useState } from "react";
import { favorite, Product } from "../../types/interface";
import { addFavorite, addToCart, formatCurrencyVND } from "../../common/helper";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { paths } from "../../common/constant";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuthStore } from "../../stores/useAuthStore";
import { RestApi } from "../../api/utils/axios";
import { ToastMessage } from "../ToastMessage";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  data?: Product[];
  loading?: boolean;
}

export default function CardItemByCategories({
  data,
  loading,
}: ProductProps): React.ReactElement {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [listFavorite, setListFavorite] = useState<favorite[]>([]);
  const fetchFavorite = async () => {
    try {
      const response = await RestApi.get("/getProductFavorite", {
        params: {
          id_user: user?.id_user,
        },
      });
      console.log(response.data.data);

      setListFavorite(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.id_user) {
      fetchFavorite();
    }
  }, [user?.id_user]);

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
                    style={{ height: "230px", position: "relative" }}
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
                    <div style={{ position: "absolute", top: 5, right: 10 }}>
                      {listFavorite.some(
                        (item) => item.id_product === product.id
                      ) ? (
                        <FavoriteBorderIcon
                          onClick={(e) => {
                            e.preventDefault();
                            addFavorite(
                              user?.id_user!,
                              String(product.id),
                              setListFavorite
                            );
                          }}
                          sx={{
                            color: "red",
                            "&:hover": {
                              color: "red",
                            },
                          }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          onClick={(e) => {
                            e.preventDefault();
                            if (user?.id_user) {
                              addFavorite(
                                user?.id_user!,
                                String(product.id),
                                setListFavorite
                              );
                            } else {
                              ToastMessage(
                                "error",
                                "Vui lòng đăng nhập để thêm sản phẩm yêu thích"
                              );
                            }
                          }}
                          sx={{
                            color: "#fff",
                            "&:hover": {
                              color: "red",
                            },
                          }}
                        />
                      )}
                    </div>
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
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                      className=" left-0 right-0 flex justify-center gap-4   "
                    >
                      <button
                        onClick={async (e) => {
                          if (!user) {
                            e.preventDefault();
                            addToCart({
                              id_product: product.id,
                              size: JSON.parse(product.size)
                                ? JSON.parse(product.size)[0]
                                : "",
                              quantity: 1,
                              total:
                                Number(product.price_sale) > 0
                                  ? Number(product.price_sale) * 1
                                  : Number(product.price) * 1,
                              made: product.made,
                              id_user: undefined,
                            });
                          } else {
                            e.preventDefault();
                            try {
                              const response = await RestApi.post(
                                "/addProductToCart",
                                {
                                  id_product: product.id,
                                  size: JSON.parse(product.size)
                                    ? JSON.parse(product.size)[0]
                                    : "",
                                  quantity: 1,
                                  made: product.made,
                                  id_user: user.id_user,
                                }
                              );
                              ToastMessage("success", response.data.message);
                            } catch (error) {
                              console.log(error);
                            }
                          }
                        }}
                        className="border px-3 py-2 w-1/2 rounded-md hover:bg-gray-800 transition cursor-pointer hover:text-white"
                      >
                        Thêm hàng
                      </button>
                      <button
                        onClick={async (e) => {
                          if (!user) {
                            e.preventDefault();
                            addToCart({
                              id_product: product.id,
                              size: JSON.parse(product.size)
                                ? JSON.parse(product.size)[0]
                                : "",
                              quantity: 1,
                              total:
                                Number(product.price_sale) > 0
                                  ? Number(product.price_sale) * 1
                                  : Number(product.price) * 1,
                              made: product.made,
                              id_user: undefined,
                            });
                          } else {
                            e.preventDefault();
                            try {
                              const response = await RestApi.post(
                                "/addProductToCart",
                                {
                                  id_product: product.id,
                                  size: JSON.parse(product.size)
                                    ? JSON.parse(product.size)[0]
                                    : "",
                                  quantity: 1,
                                  made: product.made,
                                  id_user: user.id_user,
                                }
                              );
                              ToastMessage("success", response.data.message);
                            } catch (error) {
                              console.log(error);
                            }
                          }
                          navigate(paths.cart);
                        }}
                        className="bg-yellow-500 px-3 py-2 text-black w-1/2 rounded-md font-semibold hover:bg-yellow-400 transition cursor-pointer"
                      >
                        Mua ngay
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
