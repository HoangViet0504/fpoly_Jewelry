import React from "react";
import CardItem from "../CardItem";
import Container from "../Container";

export default function NewFeed(): React.ReactElement {
  return (
    <Container>
      <div className="flex flex-col gap-10 ">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-2xl text-white">New Feed</h1>
          <a className="text-lg text-white" href="">
            Xem tất cả
          </a>
        </div>
        <div>{/* <CardItem data={productsTab2} /> */}</div>
      </div>
    </Container>
  );
}
