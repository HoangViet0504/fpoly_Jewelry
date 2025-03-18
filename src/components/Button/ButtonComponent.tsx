import React from "react";

interface ButtonComponentProps {
  text: string;
  sx?: object;
  sxButton?: object;
  onClick?: () => void;
}
export default function ButtonComponent({
  text,
  onClick,
  sx,
  sxButton,
}: ButtonComponentProps): React.ReactElement {
  return (
    <button
      type="button"
      className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Button text
    </button>
  );
}
