import React from "react";
import Container from "../../../components/Container";
import SignUpContent from "../../../components/Auth/SignUp/SignUpContent";
import GuestLayout from "../../../components/layout/GuestLayout";
import AuthGuard from "../../../components/layout/AuthGuard";
import { Helmet } from "react-helmet-async";

export default function SignUpPage(): React.ReactElement {
  return (
    <AuthGuard>
      <GuestLayout>
        <Helmet>
          <title>Đăng ký</title>
        </Helmet>
        <div style={{ padding: "60px 0px" }}>
          <SignUpContent />
        </div>
      </GuestLayout>
    </AuthGuard>
  );
}
