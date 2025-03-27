import React from "react";
import AuthGuard from "../../../components/layout/AuthGuard";
import GuestLayout from "../../../components/layout/GuestLayout";
import ResetPasswordContent from "../../../components/Auth/ResetPassword/ResetPasswordContent";

export default function ResetPasswordPage(): React.ReactElement {
  return (
    <AuthGuard>
      <GuestLayout>
        <div style={{ padding: "60px 0px" }}>
          <ResetPasswordContent />
        </div>
      </GuestLayout>
    </AuthGuard>
  );
}
