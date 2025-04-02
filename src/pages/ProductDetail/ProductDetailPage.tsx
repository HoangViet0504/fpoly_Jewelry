import React from "react";
import GuestLayout from "../../components/layout/GuestLayout";
import ProductDetailContent from "../../components/ProductDetail/ProductDetailContent";

export default function ProductDetailPage(): React.ReactElement {
  return (
    <GuestLayout>
      <ProductDetailContent />
    </GuestLayout>
  );
}
