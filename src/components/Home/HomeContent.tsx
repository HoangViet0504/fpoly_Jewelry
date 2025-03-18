import React from "react";
import Carousel from "./Carousel";
import TabItem from "./TabItem";
import ContactHome from "./Contact";

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
    </div>
  );
}
