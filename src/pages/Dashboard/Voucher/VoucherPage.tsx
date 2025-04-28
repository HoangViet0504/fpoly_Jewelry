import React from "react";
import AuthLayout from "../../../components/Dashboard/Layout/AuthLayout";
import { Helmet } from "react-helmet";
import VoucherCategory from "../../../components/Dashboard/Voucher/TableVoucher";

export default function VoucherPage(): React.ReactElement {
  return (
    <AuthLayout>
      <Helmet>
        <title>Mã giảm giá</title>
      </Helmet>
      <VoucherCategory />
    </AuthLayout>
  );
}
