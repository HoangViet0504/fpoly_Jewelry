import React from "react";

import Container from "../Container";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";

export default function ProductDetailContent(): React.ReactElement {
  return (
    <Container sx={{ padding: "30px 0px" }}>
      <ProductInfo />
      <ProductReviews />
      <RelatedProducts />
    </Container>
  );
}
