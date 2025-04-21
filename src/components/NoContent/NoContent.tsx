import React from "react";

interface NoContentProps {
  text?: string;
}
export default function NoContent({
  text = "Không tìm thấy sản phẩm",
}: NoContentProps): React.ReactElement {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
        color: "#000",
      }}
    >
      <p>{text}</p>
      <img
        style={{ width: "100px", height: "auto" }}
        src="/images/empty/empty-box.png"
      />
    </div>
  );
}
