import React from "react";
import AuthLayout from "../../../components/Dashboard/Layout/AuthLayout";
import UserContent from "../../../components/Dashboard/User/UserContent";

export default function UserPage(): React.ReactElement {
  return (
    <AuthLayout>
      <UserContent />
    </AuthLayout>
  );
}
