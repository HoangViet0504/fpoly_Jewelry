import React from "react";
import GuestLayout from "../../components/layout/GuestLayout";
import ProductByCategoriesContent from "../../components/ProductByCategories/ProductByCategoriesContent";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ProductByCategoriesPage(): React.ReactElement {
  const { slug } = useParams<{ slug: string }>();
  return (
    <GuestLayout>
      <Helmet>
        <title>Danh mục: {slug}</title>
      </Helmet>
      <ProductByCategoriesContent slug={slug ?? ""} />
    </GuestLayout>
  );
}
