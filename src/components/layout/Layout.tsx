import React from "react";

interface LayoutProp {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProp): React.ReactElement {
  return (
    <html lang="en" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
      <head>
        <link
          href="http://fonts.googleapis.com/css?family=Cantora+One|Ropa+Sans:400,400italic"
          rel="stylesheet"
          type="text/css"
        />

        <link rel="icon" href="/icons/logo/logo.svg" sizes="any" />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
