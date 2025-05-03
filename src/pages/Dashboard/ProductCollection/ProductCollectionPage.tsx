import React from "react";
import AuthLayout from "../../../components/Dashboard/Layout/AuthLayout";
import ProductContent from "../../../components/Dashboard/ProductCollection/ProductContent";

export default function ProductCollectionPage(): React.ReactElement {
  return (
    <AuthLayout>
      <ProductContent />
    </AuthLayout>
  );
}
