import React from "react";
import AuthLayout from "../../../components/Dashboard/Layout/AuthLayout";
import ProductContent from "../../../components/Dashboard/Product/ProductContent";

export default function ProductPage(): React.ReactElement {
  return (
    <AuthLayout>
      <ProductContent />
    </AuthLayout>
  );
}
