import React from "react";
import GuestLayout from "../../components/layout/GuestLayout";
import ProfileContent from "../../components/Profile/ProfileContent";
import { Helmet } from "react-helmet";

export default function AboutPage(): React.ReactElement {
  return (
    <GuestLayout>
      <Helmet>
        <title>Thông tin</title>
      </Helmet>
      <div style={{ minHeight: "calc(100dvh - 300px)" }}>
        <ProfileContent />
      </div>
    </GuestLayout>
  );
}
