import Container from "../../Container";
import LeftSideBar from "./LeftSideBar";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../common/constant";
import { PacmanLoader } from "react-spinners";

interface AuthLayoutProps {
  children: React.ReactNode;
}
export default function AuthLayout({
  children,
}: AuthLayoutProps): React.ReactElement {
  const { user, isLoading } = useAuthStore();
  const navigate = useNavigate();
  if (!user) {
    navigate(paths.auth.signIn, { replace: true }); // Chuyển hướng về trang chủ nếu không phải admin
    return <></>;
  }

  if (isLoading) {
    return <PacmanLoader color="#75f1aa" />;
  }
  return (
    <div>
      <LeftSideBar children={children} />
    </div>
  );
}
