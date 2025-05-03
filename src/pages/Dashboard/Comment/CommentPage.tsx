import React from "react";
import AuthLayout from "../../../components/Dashboard/Layout/AuthLayout";
import { Helmet } from "react-helmet";
import CommentContent from "../../../components/Dashboard/Comment/CommentContent";

export default function CommentPage(): React.ReactElement {
  return (
    <AuthLayout>
      <Helmet>
        <title>Bình luận</title>
      </Helmet>
      <CommentContent />
    </AuthLayout>
  );
}
