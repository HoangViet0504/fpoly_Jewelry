import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { paths } from "../../helper/constant";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const token = Cookies.get("access-token");

  useEffect(() => {
    if (token) {
      navigate(paths.home, { replace: true }); // Chuyển hướng về home
    }
  }, [token, navigate]);

  return <>{!token && children}</>; // Nếu có token thì không render children
}
