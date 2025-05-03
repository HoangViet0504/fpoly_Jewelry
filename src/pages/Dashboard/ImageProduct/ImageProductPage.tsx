import React from "react";
import AuthLayout from "../../../components/Dashboard/Layout/AuthLayout";
import { Helmet } from "react-helmet";
import ImageContent from "../../../components/Dashboard/ImageProduct/ImageContent";

export default function ImageProductPage(): React.ReactElement {
  return (
    <AuthLayout>
      <Helmet>
        <title>Hình ảnh sản phẩm</title>
      </Helmet>
      <ImageContent />
    </AuthLayout>
  );
}
