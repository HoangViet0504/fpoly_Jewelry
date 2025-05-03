import React, { useEffect } from "react";
import GuestLayout from "../../components/layout/GuestLayout";
import CheckoutContent from "../../components/Checkout/CheckoutContent";
import { Helmet } from "react-helmet";
import { paths, Token } from "../../common/constant";
import Cookies from "js-cookie";

export default function CheckoutPage(): React.ReactElement {
  const token = Cookies.get(Token);
  useEffect(() => {
    if (!token) {
      window.location.href = paths.auth.signIn;
      return;
    }
  }, [token]);
  return (
    <GuestLayout>
      <Helmet>
        <title>Thanh toán</title>
      </Helmet>
      <CheckoutContent />
    </GuestLayout>
  );
}
