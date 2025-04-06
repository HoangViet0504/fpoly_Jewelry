import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastMessage = (
  type: "success" | "error" | "info",
  message: string
): void => {
  toast[type](<span>{message}</span>, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: { fontFamily: "Gothic, Arial !important" },
  });
};

export default function ToastContainerComponent(): React.JSX.Element {
  return <ToastContainer style={{ zIndex: 9999999 }} />;
}
