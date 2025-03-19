import React from "react";
import Container from "../../../components/Container";
import SignUpContent from "../../../components/Auth/SignUp/SignUpContent";
import GuestLayout from "../../../components/layout/GuestLayout";
import AuthGuard from "../../../components/layout/AuthGuard";

export default function SignUpPage(): React.ReactElement {
  return (
    <AuthGuard>
      <GuestLayout>
        <div style={{ padding: "60px 0px" }}>
          <SignUpContent />
        </div>
      </GuestLayout>
    </AuthGuard>
  );
}
