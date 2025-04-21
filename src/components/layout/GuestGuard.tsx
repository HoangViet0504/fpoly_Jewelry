import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { paths, Token } from "../../common/constant";
import { useAuthStore } from "../../stores/useAuthStore";

export default function GuestGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useAuthStore();
  if (isLoading) {
    return <PacmanLoader color="#75f1aa" />;
  }
  return <>{children}</>; // Nếu có token thì không render children
}
