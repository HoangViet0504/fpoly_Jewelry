import React from "react";
import AuthLayout from "../../../components/Dashboard/Layout/AuthLayout";
import CategoriesContent from "../../../components/Dashboard/Categories/CategoriesContent";

export default function CategoriesPage(): React.ReactElement {
  return (
    <AuthLayout>
      <CategoriesContent />
    </AuthLayout>
  );
}
