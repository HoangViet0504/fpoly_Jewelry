import { useEffect, useState } from "react";
import { RestApi } from "../../api/utils/axios";
import { CART_COOKIE_KEY, paths } from "../../common/constant";
import Cookies from "js-cookie";

import {
  calculateSubtotal,
  formatCurrencyVND,
  getCartItems,
} from "../../common/helper";
import Container from "../Container";
import { ItemCart, Product } from "../../types/interface";
import { CheckIcon } from "@heroicons/react/solid";
import { ClockIcon } from "@heroicons/react/solid";
import ClearIcon from "@mui/icons-material/Clear";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ToastMessage } from "../ToastMessage";
import NoContent from "../NoContent/NoContent";
import { useAuthStore } from "../../stores/useAuthStore";
import ConfirmDeleted from "../Dialog/ConfirmDeleted";

export default function CartContent() {
  const data = getCartItems();
  const { user } = useAuthStore();
  const [cartItem, setCartItem] = useState<ItemCart[]>([]);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [idCartDelete, setIdCartDelete] = useState<number>(0);
  const [isOpenAllDelete, setIsOpenAllDelete] = useState(false);

  const fetchDetails = async () => {
    if (data.length === 0) {
      return;
    }
    const results = await Promise.all(
      data.map(async (item) => {
        const res = await RestApi.get("/getProductDetailInCart", {
          params: { id: item.id_product },
        });
        const data = res.data.data[0] as Product;
        return {
          id_product: data.id,
          name_product: data?.name_product,
          price: data?.price,
          price_sale: data?.price_sale,
          image_product: data?.primary_image,
          made: item.made,
          size: item.size,
          slug: data?.slug,
          quantity: item.quantity,
          total: item.total,
          created_at: item.created_at,
        };
      })
    );
    setCartItem(results);
  };

  const fetchCartInLogin = async () => {
    try {
      const response = await RestApi.get("/getListCartByUser", {
        params: { id: user?.id_user },
      });
      setCartItem(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCartInLogin();
    } else {
      fetchDetails();
    }
  }, [user]);

  const handleChangeQuantity = (
    index: number,
    type: "increase" | "decrease"
  ) => {
    setCartItem((prevItems) => {
      return prevItems.map((item, idx) => {
        if (idx === index) {
          const newQuantity =
            type === "increase"
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1);

          const price = item.price_sale > 0 ? item.price_sale : item.price;
          if (newQuantity > item.quantity) {
            ToastMessage("error", "Không còn số lượng sản phẩm trong kho");
            return item;
          }
          return {
            ...item,
            quantity: newQuantity,
            total: newQuantity * price,
          };
        }
        return item;
      });
    });
    if (type === "increase") {
      ToastMessage("success", "Tăng số lượng sản phẩm thành công");
    } else {
      ToastMessage("success", "Giảm số lượng sản phẩm thành công");
    }
  };

  const handleChangeQuantityApi = async (value: string, id_cart: number) => {
    try {
      const response = await RestApi.post("/updateQuantityCart", {
        id_cart: id_cart,
        type: value,
      });
      ToastMessage("success", response.data.message);
      const updatedCartItems = cartItem.map((item) => {
        if (item.id_cart === id_cart) {
          // Cập nhật số lượng mới và tính lại tổng
          const updatedQuantity =
            value === "increase" ? item.quantity + 1 : item.quantity - 1;
          const updatedTotal = updatedQuantity * item.price; // Giả sử item.price là giá của sản phẩm

          return {
            ...item,
            quantity: updatedQuantity,
            total: updatedTotal,
          };
        }
        return item;
      });

      // Cập nhật lại state với danh sách giỏ hàng mới
      setCartItem(updatedCartItems);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItemFromCart = (index: number) => {
    setCartItem((prevItems) => prevItems.filter((_, idx) => idx !== index));
    ToastMessage("success", "Xóa sản phẩm thành công");
    setIsOpenDelete(false);
  };

  useEffect(() => {
    if (cartItem) {
      if (!user) {
        Cookies.set(CART_COOKIE_KEY, JSON.stringify(cartItem));
      }
    }
  }, [cartItem]);

  const handleRemoveApi = async (id_cart: number) => {
    try {
      const response = await RestApi.post("/deleteCartById", {
        id: id_cart,
        id_user: user?.id_user,
      });
      ToastMessage("success", response.data.message);
      const updatedCartItems = cartItem.filter(
        (item) => item.id_cart !== id_cart
      );
      setCartItem(updatedCartItems);
      setIsOpenDelete(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveAllCart = async () => {
    try {
      const response = await RestApi.post("/deleteAllCart", {
        id: user?.id_user,
      });
      setCartItem([]);
      setIsOpenAllDelete(false);
      ToastMessage("success", response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {cartItem.length === 0 ? (
        <div
          style={{
            padding: "100px 0px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <NoContent
            sxText={{ fontSize: "1.5rem" }}
            text="Bạn chưa có đơn hàng nào ! "
          />
        </div>
      ) : (
        <div className="bg-white">
          <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Giỏ hàng
            </h1>
            <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
              <section aria-labelledby="cart-heading" className="lg:col-span-7">
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>

                <ul
                  role="list"
                  className="border-t border-b border-gray-200 divide-y divide-gray-200"
                >
                  {cartItem?.map((product, productIdx) => (
                    <li key={product.id_product} className="flex py-6 sm:py-7">
                      <div className="flex-shrink-0">
                        <img
                          src={product.image_product}
                          alt={product.name_product}
                          className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                        />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div className="col-span-2 flex flex-col gap-2.5">
                            <div className="flex justify-between align-start gap-2.5">
                              <h3
                                style={{
                                  color: "#000",
                                  fontSize: "1.125rem",
                                  fontWeight: "600",
                                }}
                              >
                                <a
                                  href={paths.productDetail(product?.slug)}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  Tên : {product.name_product}
                                </a>
                              </h3>
                              <div className="  ">
                                <div className="">
                                  <button
                                    type="button"
                                    className=" inline-flex text-gray-400 hover:text-gray-500"
                                  >
                                    <span className="sr-only">Remove</span>
                                  </button>
                                  <ClearIcon
                                    onClick={() => {
                                      setIsOpenDelete(true);
                                      if (user) {
                                        setIdCartDelete(product.id_cart!);
                                      } else {
                                        setIdCartDelete(productIdx);
                                      }
                                    }}
                                    sx={{ cursor: "pointer", opacity: 0.8 }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className=" flex gap-5 ">
                              <p
                                style={{ fontSize: "1rem" }}
                                className=" text-gray-600"
                              >
                                Kích thước: {product.size}
                              </p>
                              {product.made && (
                                <p
                                  style={{ fontSize: "1rem" }}
                                  className="text-gray-500 "
                                >
                                  Chất liệu: {product.made}
                                </p>
                              )}
                            </div>
                            <div style={{ maxWidth: "100px" }}>
                              <TextField
                                slotProps={{
                                  input: {
                                    startAdornment: (
                                      <button disabled={product.quantity === 1}>
                                        <RemoveIcon
                                          onClick={() => {
                                            if (user) {
                                              handleChangeQuantityApi(
                                                "decrease",
                                                product.id_cart!
                                              );
                                            } else {
                                              handleChangeQuantity(
                                                productIdx,
                                                "decrease"
                                              );
                                            }
                                          }}
                                          sx={{ cursor: "pointer" }}
                                        />
                                      </button>
                                    ),
                                    endAdornment: (
                                      <AddIcon
                                        onClick={() => {
                                          if (user) {
                                            handleChangeQuantityApi(
                                              "increase",
                                              product.id_cart!
                                            );
                                          } else {
                                            handleChangeQuantity(
                                              productIdx,
                                              "increase"
                                            );
                                          }
                                        }}
                                        sx={{ cursor: "pointer" }}
                                      />
                                    ),
                                  },
                                }}
                                value={product.quantity}
                                size="small"
                                sx={{
                                  ".MuiInputBase-root": {
                                    borderRadius: "8px",
                                    paddingLeft: "5px !important",
                                    paddingRight: "5px !important",
                                    textAlign: "center", // Chỉ có tác dụng ở outer div
                                    fieldset: { boxSizing: "border-box" },
                                  },
                                  input: {
                                    textAlign: "center", // Cái này mới canh giữa nội dung nhập
                                  },
                                  width: "100%",
                                }}
                              />
                            </div>
                            <p
                              style={{ fontSize: "1.125rem" }}
                              className=" font-medium text-gray-900"
                            >
                              Tổng tiền:
                              {formatCurrencyVND(Number(product.total))}
                            </p>
                          </div>
                        </div>

                        <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                          {product.created_at ? (
                            <CheckIcon
                              className="flex-shrink-0 h-5 w-5 text-green-500"
                              aria-hidden="true"
                            />
                          ) : (
                            <ClockIcon
                              className="flex-shrink-0 h-5 w-5 text-gray-300"
                              aria-hidden="true"
                            />
                          )}

                          {/* <span>
                            {product.inStock
                              ? "In stock"
                              : `Ships in ${product.leadTime}`}
                          </span> */}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div style={{ maxWidth: "200px" }} className="mt-6">
                  <button
                    onClick={() => {
                      setIsOpenAllDelete(true);
                    }}
                    type="button"
                    className=" cursor-pointer w-full bg-red-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 "
                  >
                    Xoá giỏ hàng
                  </button>
                </div>
              </section>

              {/* Order summary */}
              <section
                aria-labelledby="summary-heading"
                className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
              >
                <h2
                  id="summary-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Tóm tắt đơn hàng
                </h2>

                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Thành tiền</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {formatCurrencyVND(calculateSubtotal(cartItem))}
                    </dd>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="flex items-center text-sm text-gray-600">
                      <span>Phí vận chuyển</span>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      Miễn phí
                    </dd>
                  </div>
                  {/* <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="flex text-sm text-gray-600">
                      <span>Mã giảm giá</span>
                      <a
                        href="#"
                        className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">
                          Learn more about how tax is calculated
                        </span>
                      </a>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {discount}
                    </dd>
                  </div> */}
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">
                      Tổng
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      {formatCurrencyVND(calculateSubtotal(cartItem))}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-col gap-4">
                  <button
                    onClick={() => {
                      window.location.href = paths.checkout;
                    }}
                    type="button"
                    className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 cursor-pointer"
                  >
                    Thanh toán
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
      <ConfirmDeleted
        open={isOpenDelete}
        setOpen={setIsOpenDelete}
        text="Bạn có muốn xóa sản phẩm này trong giỏ hàng không"
        title="Xóa sản phẩm"
        onDelete={
          user
            ? () => handleRemoveApi(idCartDelete)
            : () => removeItemFromCart(idCartDelete)
        }
      />
      <ConfirmDeleted
        open={isOpenAllDelete}
        setOpen={setIsOpenAllDelete}
        text="Bạn có muốn xóa tất cả sản phẩm trong giỏ hàng không ?"
        title="Xóa giỏ hàng"
        onDelete={
          user
            ? () => handleRemoveAllCart()
            : () => {
                Cookies.remove(CART_COOKIE_KEY);
                setCartItem([]);
                setIsOpenAllDelete(false);
              }
        }
      />
    </Container>
  );
}
