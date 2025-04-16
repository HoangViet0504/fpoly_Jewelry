import React from "react";
import GuestLayout from "../../components/layout/GuestLayout";
import HomeContent from "../../components/Home/HomeContent";
import { Helmet } from "react-helmet-async";

export default function HomePage(): React.ReactElement {
  return (
    <>
      <GuestLayout>
        <Helmet>
          <title>Trang chủ </title>
        </Helmet>
        <HomeContent />
      </GuestLayout>
    </>
  );
}
