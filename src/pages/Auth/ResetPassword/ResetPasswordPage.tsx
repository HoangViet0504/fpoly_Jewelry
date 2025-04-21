import React from "react";
import AuthGuard from "../../../components/layout/AuthGuard";
import GuestLayout from "../../../components/layout/GuestLayout";
import ResetPasswordContent from "../../../components/Auth/ResetPassword/ResetPasswordContent";
import { Helmet } from "react-helmet";

export default function ResetPasswordPage(): React.ReactElement {
  return (
    <AuthGuard>
      <GuestLayout>
        <Helmet>
          <title>Quên mật khẩu</title>
        </Helmet>
        <div style={{ padding: "60px 0px", minHeight: "calc(100dvh - 165px)" }}>
          <ResetPasswordContent />
        </div>
      </GuestLayout>
    </AuthGuard>
  );
}
