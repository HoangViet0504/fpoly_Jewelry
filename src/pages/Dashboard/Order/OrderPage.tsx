import React from "react";
import OrderContent from "../../../components/Dashboard/Order/OrderContent";
import AuthLayout from "../../../components/Dashboard/Layout/AuthLayout";
import { Helmet } from "react-helmet-async";

export default function OrderPage(): React.JSX.Element {
  return (
    <AuthLayout>
      <Helmet>
        <title>Đơn hàng</title>
      </Helmet>
      <OrderContent />
    </AuthLayout>
  );
}
