import Container from "../../Container";
import LeftSideBar from "./LeftSideBar";
import AuthGuard from "../../layout/AuthGuard";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../helper/constant";

interface AuthLayoutProps {
  children: React.ReactNode;
}
export default function AuthLayout({
  children,
}: AuthLayoutProps): React.ReactElement {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  // useEffect(() => {

  //   console.log(user);

  //   if (!user || user?.role !== 1) {
  //     navigate(paths.home, { replace: true }); // Chuyển hướng về trang chủ nếu không phải admin
  //   }
  // }, [user]);
  return (
    <div>
      <LeftSideBar children={children} />
    </div>
  );
}
