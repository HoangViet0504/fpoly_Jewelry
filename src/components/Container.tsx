import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  sx?: object;
}
export default function Container({ children, sx }: ContainerProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "1180px", ...sx }}>{children}</div>
    </div>
  );
}
