import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { favorite, Product } from "../types/interface";
import Container from "./Container";
import { paths } from "../common/constant";
import { addFavorite, addToCart, formatCurrencyVND } from "../common/helper";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAuthStore } from "../stores/useAuthStore";
import { ToastMessage } from "./ToastMessage";
import { RestApi } from "../api/utils/axios";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  data?: Product[];
}

export default function SwiperCardItem({
  data,
}: ProductProps): React.ReactElement {
  const swiperRef = useRef<any>(null);
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
    <div style={{ height: "460px" }} className=" relative">
      <Container>
        <button
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: "40%",
            left: -40,
            width: "30px",
            height: "90px",
            background: "#BABABA",
            cursor: "pointer",
          }}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <img src="/icons/home/previous.svg" alt="" />
        </button>
        <button
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: "40%",
            right: -40,
            width: "30px",
            height: "90px",
            background: "#BABABA",
            cursor: "pointer",
          }}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <img src="/icons/home/next.svg" alt="" />
        </button>
        <div>
          {/* Nút điều hướng bên ngoài */}

          <Swiper
            modules={[Autoplay, Navigation]}
            slidesPerView={4}
            spaceBetween={20}
            autoplay={{ delay: 1000, pauseOnMouseEnter: true }}
            loop
            onSwiper={(swiper) => (swiperRef.current = swiper)} // Lưu Swiper instance vào ref
            className="mb-6"
          >
            {data?.map((product) => (
              <SwiperSlide key={product.id} className="group relative">
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
                        style={{ height: "235px", position: "relative" }}
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
                        <div
                          style={{ position: "absolute", top: 5, right: 10 }}
                        >
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
                          <a href="#">{product.name_product}</a>
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
                        <p className="text-sm italic ">
                          Chất liệu: {product.made}
                        </p>
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
                                  ToastMessage(
                                    "success",
                                    response.data.message
                                  );
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
                                  ToastMessage(
                                    "success",
                                    response.data.message
                                  );
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
}
