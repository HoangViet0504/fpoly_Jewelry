import React from "react";
import Container from "../../../components/Container";
import SignUpContent from "../../../components/Auth/SignUp/SignUpContent";
import GuestLayout from "../../../components/layout/GuestLayout";

export default function SignUpPage(): React.ReactElement {
  return (
    <GuestLayout>
      <div style={{ padding: "60px 0px" }}>
        <SignUpContent />
      </div>
    </GuestLayout>
  );
}
