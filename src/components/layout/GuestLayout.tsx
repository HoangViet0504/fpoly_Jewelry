import React from "react";

// import GuestHeader from "../components/layout/Header";
import GuestHeader from "./Header";
import Layout from "../layout/Layout";
import GuestFooter from "./Footer";

interface LayoutProp {
  children: React.ReactNode;
}

export default function GuestLayout({ children }: LayoutProp) {
  return (
    <Layout>
      <GuestHeader />
      {children}
      <GuestFooter />
    </Layout>
  );
}
