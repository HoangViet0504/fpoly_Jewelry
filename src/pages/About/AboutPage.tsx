import React from "react";
import GuestLayout from "../../components/layout/GuestLayout";
import AboutContent from "../../components/About/AboutContent";
import { Helmet } from "react-helmet";

export default function AboutPage() {
  return (
    <GuestLayout>
      <Helmet>
        <title>Về chúng tôi</title>
      </Helmet>
      <AboutContent />
    </GuestLayout>
  );
}
