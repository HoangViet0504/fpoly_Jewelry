import Container from "../../Container";
import LeftSideBar from "./LeftSideBar";

interface AuthLayoutProps {
  children: React.ReactNode;
}
export default function AuthLayout({
  children,
}: AuthLayoutProps): React.ReactElement {
  return (
    <div>
      <LeftSideBar children={children} />
    </div>
  );
}
