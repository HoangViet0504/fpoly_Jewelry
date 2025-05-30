import React from "react";
import AuthLayout from "../../../components/Dashboard/Layout/AuthLayout";
import ProductContent from "../../../components/Dashboard/Product/ProductContent";
import { Helmet } from "react-helmet";

export default function ProductPage(): React.ReactElement {
  return (
    <AuthLayout>
      <Helmet>
        <title>Sản phẩm</title>
      </Helmet>
      <ProductContent />
    </AuthLayout>
  );
}
