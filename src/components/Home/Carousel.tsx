import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const images = [
    "/images/home/banner/banner1.jpg",
    "/images/home/banner/banner2.jpg",
    "/images/home/banner/banner3.jpg",
];

const categoriesSlug = ["day-chuyen", "nhan", "vong-tay"];

export default function Carousel(): React.ReactElement {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isHoveredLeft, setIsHoveredLeft] = useState(false);
    const [isHoveredRight, setIsHoveredRight] = useState(false);

    const prevSlide = () => {
        setActiveIndex((activeIndex - 1 + images.length) % images.length);
    };

    const nextSlide = () => {
        setActiveIndex((activeIndex + 1) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, [activeIndex]);

    return (
        <div className="relative w-full">
            <div
                style={{ height: "490px" }}
                className="relative h-56 overflow-hidden ">
                {images.map((src, index) => (
                    <Link
                        key={index}
                        to={`/product-categories/${categoriesSlug[index]}`}>
                        <img
                            style={{ objectFit: "cover" }}
                            src={src}
                            alt={`Slide ${index + 1}`}
                            className={`absolute block w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ease-in-out 
                              ${
                                  activeIndex === index
                                      ? "opacity-100 z-10"
                                      : "opacity-100"
                              }
                                    `}
                        />
                    </Link>
                ))}
            </div>
            <div className="absolute z-30 flex -translate-x-1/2 space-x-3 bottom-5 left-1/2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            activeIndex === index
                                ? "bg-blue-500"
                                : "bg-gray-400"
                        }`}
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </div>
            <button
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: "30%",
                    width: "30px",
                    height: "90px",
                    background: "#BABABA",
                    cursor: "pointer",
                    right: 0,
                    opacity: isHoveredRight ? 0.69 : 1,
                    transform: "translateY(-50%)",
                    rotate: "180deg",
                }}
                onClick={prevSlide}
                onMouseEnter={() => setIsHoveredRight(true)}
                onMouseLeave={() => setIsHoveredRight(false)}>
                <img src="/icons/home/previous.svg" alt="" />
            </button>
            <button
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: "30%",
                    width: "30px",
                    height: "90px",
                    left: 0,
                    opacity: isHoveredLeft ? 0.69 : 1,
                    cursor: "pointer",
                    transform: "translateY(-50%)",
                    background: "#BABABA",
                    rotate: "180deg",
                }}
                onClick={nextSlide}
                onMouseEnter={() => setIsHoveredLeft(true)}
                onMouseLeave={() => setIsHoveredLeft(false)}>
                <img src="/icons/home/next.svg" alt="" />
            </button>
        </div>
    );
}
