import React from "react";
import OverViewContent from "../../../components/Dashboard/OverView/OverViewContent";
import AuthLayout from "../../../components/Dashboard/Layout/AuthLayout";
import { Helmet } from "react-helmet";

export default function OverViewPage(): React.ReactElement {
  return (
    <AuthLayout>
      <Helmet>
        <title>Thống kê</title>
      </Helmet>
      <OverViewContent />
    </AuthLayout>
  );
}
