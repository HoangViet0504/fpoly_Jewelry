import Cookies from "js-cookie";
import { CART_COOKIE_KEY } from "./constant";
import { CartItem, favorite } from "../types/interface";
import { ToastMessage } from "../components/ToastMessage";
import { RestApi } from "../api/utils/axios";

export function formatCurrencyVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0, // không hiển thị số lẻ
  }).format(amount);
}

export function formatTimeDateVN(dateInput: string | number | Date): string {
  const date = new Date(dateInput);

  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  const dd = String(date.getDate()).padStart(2, "0");
  const mo = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  return `${hh}:${mm}:${ss} ${dd}-${mo}-${yyyy}`;
}

export const getCartItems = (): CartItem[] => {
  const cart = Cookies.get(CART_COOKIE_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (item: CartItem): void => {
  // Lấy giỏ hàng hiện tại từ cookies
  const currentCart = getCartItems();

  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const existingItemIndex = currentCart.findIndex(
    (cartItem) =>
      cartItem.id_product === item.id_product &&
      cartItem.size === item.size &&
      cartItem.made === item.made
  );

  if (existingItemIndex !== -1) {
    // Nếu sản phẩm đã có, tăng số lượng lên
    currentCart[existingItemIndex].quantity += item.quantity;
    currentCart[existingItemIndex].total += item.total;
    currentCart[existingItemIndex].updated_at = new Date().toISOString();
    ToastMessage("success", "Cập nhật số lượng sản phẩm thành công");
  } else {
    // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
    currentCart.push({
      ...item,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    ToastMessage("success", "Thêm sản phẩm vào giỏ hàng thành công");
  }

  // Lưu lại giỏ hàng vào cookies
  Cookies.set(CART_COOKIE_KEY, JSON.stringify(currentCart), { expires: 7 });
};

export const calculateSubtotal = (data: CartItem[]) => {
  return data.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
};

export const addFavorite = async (
  id_user: string,
  id_product: string,
  setListFavorite: (value: favorite[]) => void
): Promise<void> => {
  try {
    const response = await RestApi.post("/addProductFavorite", {
      id_user,
      id_product,
    });
    setListFavorite(response.data.data);
    ToastMessage("success", response.data.message);
  } catch (error) {
    console.error(error);
  }
};
