import React from "react";
import GuestLayout from "../../components/layout/GuestLayout";
import ProductDetailContent from "../../components/ProductDetail/ProductDetailContent";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ProductDetailPage(): React.ReactElement {
  const { slug } = useParams<{ slug: string }>();

  return (
    <GuestLayout>
      <Helmet>
        <title>{slug}</title>
      </Helmet>
      <ProductDetailContent slug={slug!} />
    </GuestLayout>
  );
}
