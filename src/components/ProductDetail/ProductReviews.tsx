import { useEffect, useState } from "react";
import { Comment, ProductDetail, UserDetail } from "../../types/interface";
import { RestApi } from "../../api/utils/axios";
import { formatTimeDateVN } from "../../common/helper";
import { useAuthStore } from "../../stores/useAuthStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";

import NoContent from "../NoContent/NoContent";
import { ToastMessage } from "../ToastMessage";

const validationSchema = Yup.object({
  content: Yup.string().required("Nội dung không được rỗng"),
});

interface ReviewProps {
  data?: ProductDetail;
}

interface CommentProps {
  data?: Comment[];
  setData: (data: Comment[]) => void;
  user?: UserDetail;
  dataProduct?: ProductDetail;
}

const SwitchTabs = ({
  activeTab,
  onTabChange,
  reviewCount,
}: {
  activeTab: "description" | "reviews";
  onTabChange: (tab: "description" | "reviews") => void;
  reviewCount?: number;
}) => (
  <div className="flex border-b border-gray-700">
    <button
      className={`flex-1 py-3 font-semibold ${
        activeTab === "description"
          ? "bg-yellow-500 text-black"
          : "text-black bg-transparent hover:bg-yellow-500"
      }`}
      onClick={() => onTabChange("description")}
    >
      Mô tả sản phẩm
    </button>
    <button
      className={`flex-1 py-3 font-semibold ${
        activeTab === "reviews"
          ? "bg-yellow-500 text-black"
          : "text-black bg-transparent hover:bg-yellow-500"
      }`}
      onClick={() => onTabChange("reviews")}
    >
      Đánh giá{reviewCount !== undefined ? ` (${reviewCount})` : ""}
    </button>
  </div>
);

const ProductDescription = ({ data }: ReviewProps) => {
  return (
    <div className="mt-6 text-black text-sm">
      <p className="mb-2">Tên sản phẩm: {data?.name_product}</p>
      <p className="mb-2">Chất liệu: {data?.made}</p>
      <p className="mb-2">Loại đá sử dụng: Không</p>
      <p className="mb-4">
        Bảo hành: Theo chính sách bảo hành và nhận đánh sáng sản phẩm trọn đời
      </p>
      <h3 className="text-lg font-bold text-yellow-500 mb-3">
        ĐẰNG SAU MỖI CHẾ TÁC LUÔN LÀ MỘT CÂU CHUYỆN RIÊNG BIỆT...
      </h3>
      <p className="leading-relaxed">{data?.description}</p>
    </div>
  );
};

const ProductReviews = ({ data, user, dataProduct, setData }: CommentProps) => {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      content: "",
      rating: 1,
    },
    validationSchema,
    onSubmit: async (value) => {
      if (user) {
        setIsLoading(true);
        try {
          const response = await RestApi.post("/postCommentByIdProduct", {
            id_product: dataProduct?.id,
            id_user: user?.id_user,
            content: value.content,
            rating: value.rating,
          });
          setData([...(data ?? []), response.data.data]);
          ToastMessage("success", response.data.message);
          formik.resetForm();
          setShowForm(false);
        } catch (error: any) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    },
  });
  return (
    <div className="mt-6 text-black text-sm">
      <h3 className="text-lg font-bold mb-2">Phản hồi từ khách hàng</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {data?.length !== 0 && (
          <p className="text-gray-900 font-medium mb-2">
            ⭐ 4.5 trên 5 sao (dựa trên {data?.length} đánh giá)
          </p>
        )}
        <div>
          <button
            style={{ border: "1px solid #000" }}
            className="mt-4 px-4 py-2 border  text-black rounded-md hover:bg-black hover:text-white cursor-pointer"
            onClick={() => setShowForm(!showForm)}
          >
            Viết bình luận
          </button>
        </div>
        {showForm && (
          <form
            onSubmit={formik.handleSubmit}
            className="mt-4 p-4 border border-gray-700 rounded-lg flex flex-col gap-2.5"
          >
            <select
              className="w-full p-2 mb-2  text-black border border-gray-600 rounded-md"
              value={formik.values.rating}
              onChange={(e) => formik.setFieldValue("rating", e.target.value)}
              onBlur={formik.handleBlur}
            >
              {[5, 4, 3, 2, 1].map((star) => (
                <option key={star} value={star}>
                  {star} sao
                </option>
              ))}
            </select>
            <div>
              <textarea
                placeholder="Nhận xét của bạn"
                className="w-full p-2   text-black border border-gray-600 rounded-md"
                name="content"
                onBlur={formik.handleBlur}
                value={formik.values.content}
                onChange={(e) =>
                  formik.setFieldValue("content", e.target.value)
                }
              />
              {formik.touched.content && formik.errors.content && (
                <p className=" text-sm text-red-500">{formik.errors.content}</p>
              )}
            </div>
            <button
              disabled={isLoading}
              className="w-full px-4 py-2 bg-yellow-400 text-gray-700 font-semibold rounded-md hover:bg-yellow-500 cursor-pointer"
              type="submit"
              onClick={() => {
                if (!user) {
                  console.log("13");
                  ToastMessage("error", "Vui lòng đăng nhập để bình luận");
                }
              }}
            >
              {isLoading ? (
                <CircularProgress sx={{ color: "#000" }} size="20px" />
              ) : (
                "Gửi bình luận"
              )}
            </button>
          </form>
        )}

        {data?.length === 0 ? (
          <NoContent text="Không có bình luận nào " />
        ) : (
          <div className="space-y-4 mt-4">
            {data?.map((review, index) => (
              <div
                key={index}
                className="p-4 border border-gray-700 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{review.first_name}</h4>
                  <p className="text-sm text-gray-400">
                    {formatTimeDateVN(review.created_at)}
                  </p>
                </div>
                <p className="text-yellow-400">{"★".repeat(review.rating)}</p>
                <p className="mt-1">{review.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProductReview = ({ data }: { data?: ProductDetail }) => {
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );
  const { user } = useAuthStore();

  const [listComment, setListComment] = useState<Comment[]>([]);
  const fetchComments = async () => {
    try {
      const response = await RestApi.get("/getCommentByIdProduct", {
        params: { slug: data?.slug },
      });
      setListComment(response.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (data?.slug) {
      fetchComments();
    }
  }, [data?.slug]);
  return (
    <div className="w-full">
      <SwitchTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        reviewCount={listComment.length} // Hoặc truyền từ API
      />
      {activeTab === "description" ? (
        <ProductDescription data={data} />
      ) : (
        <ProductReviews
          user={user}
          data={listComment}
          dataProduct={data}
          setData={setListComment}
        />
      )}
    </div>
  );
};

export default ProductReview;
