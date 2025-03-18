import React from "react";
import Carousel from "./Carousel";
import TabItem from "./TabItem";
import ContactHome from "./Contact";
import ListCardByCategory from "./ListCardByCategory";
import NewFeed from "./newFeed";

export default function HomeContent(): React.ReactElement {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "60px",
        background: "#363636",
      }}
    >
      <Carousel />
      <TabItem />
      <ContactHome />
      <ListCardByCategory />
      <NewFeed />
      <div style={{ height: "60px" }} />
    </div>
  );
}
