import React from "react";

export default function ProductContent(): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Product Content</h1>
      <p className="mt-4 text-lg">This is the product content area.</p>
    </div>
  );
}
