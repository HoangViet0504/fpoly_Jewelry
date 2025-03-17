import React from "react";

// import GuestHeader from "../components/layout/Header";
import GuestHeader from "./Header";

export default function GuestLayout({ children }) {
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100dvh" }}
      >
        <GuestHeader />
        {children}
      </div>
    </>
  );
}
