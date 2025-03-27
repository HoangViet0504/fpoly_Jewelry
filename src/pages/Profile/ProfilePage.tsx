import React from "react";
import GuestLayout from "../../components/layout/GuestLayout";
import ProfileContent from "../../components/Profile/ProfileContent";

export default function AboutPage(): React.ReactElement {
  return (
    <GuestLayout>
      <ProfileContent />
    </GuestLayout>
  );
}
