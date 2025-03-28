import React, { useState } from "react";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";
import Footer from "../layout/Footer";
import GuestHeader from "../layout/Header";

export default function ProductDetail() {
  const [showReviews, setShowReviews] = useState(false);

  return (
    <>
    <GuestHeader/>
    <div className="flex flex-col gap-10 bg-[#000] text-white">
      <ProductInfo />
      <ProductReviews/>
      <RelatedProducts />
    </div>
    <Footer/>
    </>
  );
}
