import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { paths, Token } from "../../helper/constant";
import { useAuthStore } from "../../stores/useAuthStore";
import { PacmanLoader } from "react-spinners";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const token = Cookies.get(Token);
  const { isLoading } = useAuthStore();

  useEffect(() => {
    if (token) {
      navigate(paths.home, { replace: true }); // Chuyển hướng về home
    }
  }, [token, navigate]);
  if (isLoading) {
    return <PacmanLoader color="#75f1aa" />;
  }
  return <>{!token && children}</>; // Nếu có token thì không render children
}
