import React from "react";
import SignInContent from "../../../components/Auth/SignIn/SignInContent";
import GuestLayout from "../../../components/layout/GuestLayout";
import AuthGuard from "../../../components/layout/AuthGuard";
import { Helmet } from "react-helmet-async";

export default function SignInPage(): React.ReactElement {
  return (
    <AuthGuard>
      <GuestLayout>
        <Helmet>
          <title>Đăng nhập</title>
        </Helmet>
        <div style={{ padding: "60px 0px" }}>
          <SignInContent />
        </div>
      </GuestLayout>
    </AuthGuard>
  );
}
