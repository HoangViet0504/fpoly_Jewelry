import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Product } from "../types/interface";
import Container from "./Container";

interface ProductProps {
  data?: Product[];
}

export default function SwiperCardItem({
  data,
}: ProductProps): React.ReactElement {
  const swiperRef = useRef<any>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false); // Thêm state kiểm soát hover

  return (
    <div className=" relative">
      <Container sx={{ position: "relative" }}>
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
              <SwiperSlide
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                key={product.id}
                className="group relative"
              >
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
}
