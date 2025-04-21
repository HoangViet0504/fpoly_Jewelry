import React, { useEffect, useState } from "react";
import CardItem from "../CardItem";
import Container from "../Container";
import { Product } from "../../types/interface";
import { RestApi } from "../../api/utils/axios";

export default function ListCardByCategory(): React.ReactElement {
  const [productSale, setProductSale] = useState<Product[]>([]);
  const fetchProductSale = async () => {
    try {
      const response = await RestApi.get("/getListProductsSaleClient");
      setProductSale(response.data.data);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchProductSale();
  }, []);
  return (
    <Container>
      <div className="flex flex-col gap-10 ">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-2xl text-white">Sản phẩm giảm giá</h1>
          <a className="text-lg text-white" href="">
            Xem tất cả
          </a>
        </div>
        <div>
          <CardItem data={productSale} />
        </div>
      </div>
    </Container>
  );
}
