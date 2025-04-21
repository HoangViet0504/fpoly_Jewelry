import React from "react";
import CardItem from "../CardItem";
import { Product } from "../../types/interface";
import NoContent from "../NoContent/NoContent";

interface ProductProps {
  data: Product[];
}
export default function RelatedProducts({
  data,
}: ProductProps): React.ReactElement {
  return (
    <div>
      <p style={{ fontSize: "1.5rem", color: "#000", fontWeight: 600 }}>
        {" "}
        Sản phẩm cùng loại
      </p>
      <div className="p-10  text-white relative">
        {data.length !== 0 ? (
          <CardItem data={data} />
        ) : (
          <NoContent text="Không có sản phẩm cùng loại" />
        )}
      </div>
    </div>
  );
}
