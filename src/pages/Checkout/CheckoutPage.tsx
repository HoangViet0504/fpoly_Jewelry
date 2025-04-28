import React from "react";
import GuestLayout from "../../components/layout/GuestLayout";
import CheckoutContent from "../../components/Checkout/CheckoutContent";
import { Helmet } from "react-helmet";

export default function CheckoutPage(): React.ReactElement {
  return (
    <GuestLayout>
      <Helmet>
        <title>Thanh toán</title>
      </Helmet>
      <CheckoutContent />
    </GuestLayout>
  );
}
