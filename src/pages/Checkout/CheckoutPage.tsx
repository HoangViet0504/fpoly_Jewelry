import React from "react";
import GuestLayout from "../../components/layout/GuestLayout";
import CheckoutContent from "../../components/Checkout/CheckoutContent";

export default function CheckoutPage(): React.ReactElement {
  return (
    <GuestLayout>
      <CheckoutContent />
    </GuestLayout>
  );
}
