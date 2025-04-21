import React, { useEffect, useState } from "react";

import Container from "../Container";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";
import { RestApi } from "../../api/utils/axios";
import { Product, ProductDetail } from "../../types/interface";

interface ProductDetailContentProps {
  slug: string;
}
export default function ProductDetailContent({
  slug,
}: ProductDetailContentProps): React.ReactElement {
  const [ProductDetail, setProductDetail] = useState<ProductDetail>(
    {} as ProductDetail
  );
  const [listCardSameId, setListCardSameId] = useState<Product[]>([]);

  const fetchProductDetail = async () => {
    try {
      const response = await RestApi.get("/getProductDetail", {
        params: { slug },
      });
      console.log(response.data);
      setProductDetail(response.data.data);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  const fetchProductSameId = async () => {
    try {
      const response = await RestApi.get("/getProductSameIdCategories", {
        params: { slug },
      });
      setListCardSameId(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchProductDetail();
      fetchProductSameId();
    }
  }, [slug]);
  return (
    <Container sx={{ padding: "30px 0px" }}>
      <ProductInfo data={ProductDetail} />
      <ProductReviews />
      <RelatedProducts data={listCardSameId} />
    </Container>
  );
}
