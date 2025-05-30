import React from "react";
import AuthLayout from "../../../components/Dashboard/Layout/AuthLayout";
import CategoryContent from "../../../components/Dashboard/Category/CategoryContent";
import { Helmet } from "react-helmet";

export default function CategoriesPage(): React.ReactElement {
  return (
    <AuthLayout>
      <Helmet>
        <title>Danh mục</title>
      </Helmet>
      <CategoryContent />
    </AuthLayout>
  );
}
