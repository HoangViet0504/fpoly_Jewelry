import React from "react";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";

interface LayoutProp {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProp): React.ReactElement {
  return (
    <HelmetProvider>
      <Helmet>
        <link
          href="http://fonts.googleapis.com/css?family=Cantora+One|Ropa+Sans:400,400italic"
          rel="stylesheet"
          type="text/css"
        />
        <link rel="icon" href="/icons/logo/logo.svg" sizes="any" />
      </Helmet>

      <div style={{ margin: 0 }}>{children}</div>
    </HelmetProvider>
  );
}
