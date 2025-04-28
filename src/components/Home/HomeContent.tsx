import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import TabItem from "./TabItem";
import ContactHome from "./Contact";
import ListCardByCategory from "./ListCardByCategory";
import NewFeed from "./newFeed";
import ConfirmCart from "../Dialog/ConfirmCart";
import { useAuthStore } from "../../stores/useAuthStore";
import { getCartItems } from "../../common/helper";

export default function HomeContent(): React.ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useAuthStore();
  const dataCart = getCartItems();
  useEffect(() => {
    if (user) {
      if (dataCart.length > 0) {
        setIsOpen(true);
      }
    }
  }, [user]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "60px",
        background: "#363636",
      }}
    >
      <ConfirmCart open={isOpen} setOpen={setIsOpen} />
      <Carousel />
      <TabItem />
      <ContactHome />
      <ListCardByCategory />
      <NewFeed />
      <div style={{ height: "60px" }} />
    </div>
  );
}
