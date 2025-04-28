import Cookies from "js-cookie";
import React, { useState } from "react";
import { CART_COOKIE_KEY } from "../../common/constant";
import { CheckIcon } from "@heroicons/react/solid";
import { RestApi } from "../../api/utils/axios";
import { getCartItems } from "../../common/helper";
import { useAuthStore } from "../../stores/useAuthStore";
import { ToastMessage } from "../ToastMessage";
import CircularProgress from "@mui/material/CircularProgress";

interface ConfirmDeletedProps {
  text?: string;
  open: boolean;
  title?: string;
  setOpen: (open: boolean) => void;
}

export default function ConfirmCart({
  text = "Bạn đã có sản phẩm trong giỏ hàng, bạn có muốn thêm vào tài khoản của bạn không ?",
  title = "Thêm đơn hàng",
  setOpen,
  open,
}: ConfirmDeletedProps): React.ReactElement {
  const dataCart = getCartItems();
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();
  const handleMergeCart = async () => {
    setLoading(true);
    try {
      await Promise.all(
        dataCart?.map((item) =>
          RestApi.post("/mergeCart", {
            id_product: item.id_product,
            quantity: item.quantity,
            size: item.size,
            made: item.made,
            id_user: user?.id_user,
            total: item.total,
          })
        )
      );

      ToastMessage("success", "Thêm đơn hàng thành công");
      setOpen(false);
    } catch (err) {
      ToastMessage("error", "Có lỗi xảy ra khi thêm đơn hàng");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-gray-500/75 transition-opacity"
            aria-hidden="true"
          ></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                      <CheckIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-base font-semibold text-gray-900"
                        id="modal-title"
                      >
                        {title}
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{text}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    disabled={loading}
                    onClick={() => {
                      handleMergeCart();
                      setOpen(false);
                    }}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
                  >
                    {loading ? (
                      <CircularProgress sx={{ color: "#fff" }} size="20px" />
                    ) : (
                      "Thêm"
                    )}
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      Cookies.remove(CART_COOKIE_KEY);
                      setOpen(false);
                    }}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Không thêm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
