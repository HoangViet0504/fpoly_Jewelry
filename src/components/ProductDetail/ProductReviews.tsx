import { useState } from "react";
import { ProductDetail } from "../../types/interface";

interface ReviewProps {
  data?: ProductDetail;
  onShowReviews: () => void;
}
const ProductDescription = ({ onShowReviews, data }: ReviewProps) => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Button switch */}
      <div className="flex ">
        <button className="flex-1 py-3 font-semibold bg-yellow-500  text-black hover:bg-yellow-500">
          Mô tả sản phẩm
        </button>
        <button
          className="flex-1 py-3 font-semibold text-black bg-transparent hover:bg-yellow-500 "
          onClick={onShowReviews}
        >
          Đánh giá
        </button>
      </div>

      {/* Nội dung mô tả */}
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
    </div>
  );
};

const ProductReviews = ({ onHideReviews }: { onHideReviews: () => void }) => {
  const [reviews, setReviews] = useState([
    {
      name: "Nguyễn Văn A",
      rating: 5,
      comment: "Nhẫn đẹp, sáng bóng, đeo rất vừa vặn!",
      date: "12/03/2025",
    },
    {
      name: "Trần Thị B",
      rating: 4,
      comment: "Chất lượng tốt, nhưng giao hàng hơi lâu.",
      date: "10/03/2025",
    },
    {
      name: "Lê Minh C",
      rating: 5,
      comment: "Mẫu mã tinh tế, rất hợp với phong cách của mình.",
      date: "08/03/2025",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  const handleSubmitReview = () => {
    if (!newReview.name || !newReview.comment) return;

    const newEntry = {
      ...newReview,
      date: new Date().toLocaleDateString("vi-VN"),
    };

    setReviews([newEntry, ...reviews]);
    setShowForm(false);
    setNewReview({ name: "", rating: 5, comment: "" });
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Button switch */}
      <div className="flex border-b border-gray-700">
        <button
          className="flex-1 py-3 font-semibold text-black bg-transparent hover:bg-yellow-500"
          onClick={onHideReviews}
        >
          Mô tả sản phẩm
        </button>
        <button className="flex-1 py-3 font-semibold bg-yellow-500 text-black">
          Đánh giá ({reviews.length})
        </button>
      </div>

      {/* Nội dung đánh giá */}
      <div className="mt-6 text-black text-sm">
        <h3 className="text-lg font-bold mb-2">Phản hồi từ khách hàng</h3>
        <p className="text-yellow-400 font-semibold mb-2">
          ⭐ 4.5 trên 5 sao (dựa trên {reviews.length} đánh giá)
        </p>

        {/* Nút viết đánh giá */}
        <button
          className="mt-4 px-4 py-2 border border-white text-black rounded-md hover:bg-gray-800"
          onClick={() => setShowForm(!showForm)}
        >
          Viết đánh giá
        </button>

        {/* Form nhập đánh giá */}
        {showForm && (
          <div className="mt-4 p-4 border border-gray-700 rounded-lg">
            <input
              type="text"
              placeholder="Tên của bạn"
              className="w-full p-2 mb-2 bg-gray-800 text-black border border-gray-600 rounded-md"
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
            />
            <select
              className="w-full p-2 mb-2 bg-gray-800 text-black border border-gray-600 rounded-md"
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: Number(e.target.value) })
              }
            >
              {[5, 4, 3, 2, 1].map((star) => (
                <option key={star} value={star}>
                  {star} sao
                </option>
              ))}
            </select>
            <textarea
              placeholder="Nhận xét của bạn"
              className="w-full p-2 mb-2 bg-gray-800 text-black border border-gray-600 rounded-md"
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
            />
            <button
              className="w-full px-4 py-2 bg-yellow-500 text-black font-semibold rounded-md"
              onClick={handleSubmitReview}
            >
              Gửi đánh giá
            </button>
          </div>
        )}

        {/* Hiển thị danh sách đánh giá */}
        <div className="space-y-4 mt-4">
          {reviews.map((review, index) => (
            <div key={index} className="p-4 border border-gray-700 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{review.name}</h4>
                <p className="text-sm text-gray-400">{review.date}</p>
              </div>
              <p className="text-yellow-400">{"★".repeat(review.rating)}</p>
              <p className="mt-1">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductPage = () => {
  const [showReviews, setShowReviews] = useState(false);

  return (
    <div className=" p-6">
      {!showReviews ? (
        <ProductDescription onShowReviews={() => setShowReviews(true)} />
      ) : (
        <ProductReviews onHideReviews={() => setShowReviews(false)} />
      )}
    </div>
  );
};

export default ProductPage;
