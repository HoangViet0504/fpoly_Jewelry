import React from "react";
import SignInContent from "../../../components/Auth/SignIn/SignInContent";
import GuestLayout from "../../../components/layout/GuestLayout";
import AuthGuard from "../../../components/layout/AuthGuard";

export default function SignInPage(): React.ReactElement {
  return (
    <AuthGuard>
      <GuestLayout>
        <div style={{ padding: "60px 0px" }}>
          <SignInContent />
        </div>
      </GuestLayout>
    </AuthGuard>
  );
}
