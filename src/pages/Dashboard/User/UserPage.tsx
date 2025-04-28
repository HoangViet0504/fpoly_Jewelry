import React from "react";
import AuthLayout from "../../../components/Dashboard/Layout/AuthLayout";
import UserContent from "../../../components/Dashboard/User/UserContent";
import { Helmet } from "react-helmet";

export default function UserPage(): React.ReactElement {
  return (
    <AuthLayout>
      <Helmet>
        <title>Khách hàng</title>
      </Helmet>
      <UserContent />
    </AuthLayout>
  );
}
