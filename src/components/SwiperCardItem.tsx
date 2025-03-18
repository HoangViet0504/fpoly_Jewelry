import React, { useRef } from "react";
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
  const swiperRef = useRef<any>(null); // Lưu Swiper instance

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
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop
            onSwiper={(swiper) => (swiperRef.current = swiper)} // Lưu Swiper instance vào ref
            className="mb-6"
          >
            {data?.map((product) => (
              <SwiperSlide key={product.id} className="group relative">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                  <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75">
                    <img
                      style={{ borderRadius: "4px" }}
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p
                      style={{
                        width: "230px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2, // Giới hạn 2 dòng
                        whiteSpace: "normal",
                      }}
                      className="text-sm text-gray-500"
                    >
                      {product.description}
                    </p>
                    <p className="text-sm italic text-gray-500">
                      {product.options}
                    </p>
                    <p className="text-base font-medium text-gray-900">
                      {product.price}
                    </p>
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
