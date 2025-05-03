import React, { useEffect, useState } from "react";
import CardItem from "../CardItem";
import Container from "../Container";
import { Product } from "../../types/interface";
import { RestApi } from "../../api/utils/axios";

export default function NewFeed(): React.ReactElement {
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const fetchProducts = async () => {
    try {
      const response = await RestApi.get("/getListProductCollection");
      setListProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <Container>
      <div className="flex flex-col gap-10 ">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-2xl text-white">Bộ sưu tập</h1>
          <a className="text-lg text-white" href="">
            Xem tất cả
          </a>
        </div>
        <div>
          <CardItem data={listProducts} />
        </div>
      </div>
    </Container>
  );
}
