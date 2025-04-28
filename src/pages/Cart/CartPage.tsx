import React from "react";
import GuestLayout from "../../components/layout/GuestLayout";
import CartContent from "../../components/Cart/CartContent";
import { Helmet } from "react-helmet";

export default function CartPage() {
  return (
    <GuestLayout>
      <Helmet>
        <title>Giỏ hàng</title>
      </Helmet>
      <CartContent />
    </GuestLayout>
  );
}
