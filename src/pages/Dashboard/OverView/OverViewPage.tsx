import React from "react";
import OverViewContent from "../../../components/Dashboard/OverView/OverViewContent";
import AuthLayout from "../../../components/Dashboard/Layout/AuthLayout";

export default function OverViewPage(): React.ReactElement {
  return (
    <AuthLayout>
      <OverViewContent />
    </AuthLayout>
  );
}
