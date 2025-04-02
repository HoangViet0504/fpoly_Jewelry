import React from "react";
import GuestLayout from "../../components/layout/GuestLayout";
import ProductByCategoriesContent from "../../components/ProductByCategories/ProductByCategoriesContent";

export default function ProductByCategoriesPage(): React.ReactElement {
  return (
    <GuestLayout>
      <ProductByCategoriesContent />
    </GuestLayout>
  );
}
