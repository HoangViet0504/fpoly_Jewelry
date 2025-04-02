import React from "react";
import { productsTab1 } from "../../helper/constant";
import CardItem from "../CardItem";

export default function RelatedProducts(): React.ReactElement {
  return (
    <div className="p-10  text-white relative">
      <CardItem style={{ height: "440px" }} data={productsTab1} />
    </div>
  );
}
