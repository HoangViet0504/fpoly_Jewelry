import { useEffect, useState } from "react";
import Container from "../Container";
import { useAuthStore } from "../../stores/useAuthStore";
import { paths } from "../../common/constant";
import { FetchParams, GetList, RestApi } from "../../api/utils/axios";
import { district, ItemCart, ward } from "../../types/interface";
import { calculateSubtotal, formatCurrencyVND } from "../../common/helper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { province } from "../../types/interface";
import { TextField } from "@mui/material";
import { ToastMessage } from "../ToastMessage";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  first_name: Yup.string()
    .required("Họ tên là bắt buộc")
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(50, "Họ tên không được quá 50 ký tự"),

  last_name: Yup.string()
    .required("Tên là bắt buộc")
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(50, "Tên không được quá 50 ký tự"),

  email: Yup.string().required("Email là bắt buộc").email("Email không hợp lệ"),

  phone: Yup.string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^[0-9]{10}$/, "Số điện thoại phải gồm 10 chữ số"), // Ví dụ cho số điện thoại 10 chữ số

  province: Yup.string().required("Tỉnh/Thành phố là bắt buộc"),

  district: Yup.string().required("Quận/Huyện là bắt buộc"),

  ward: Yup.string().required("Phường/Xã là bắt buộc"),

  address: Yup.string().required("Địa chỉ là bắt buộc"),
});

const paymentMethods = [
  { id: "Thanh toán online", title: "Thanh toán online" },
  { id: "Thanh toán khi nhận hàng", title: "Thanh toán khi nhận hàng" },
];

export default function CheckoutContent() {
  const [cartItem, setCartItem] = useState<ItemCart[]>([]);
  const [discount, setDiscount] = useState(0);
  const [valueDiscount, setValueDiscount] = useState<string>("");
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const fetchCartInLogin = async () => {
    try {
      const response = await RestApi.get("/getListCartByUser", {
        params: { id: user?.id_user },
      });
      console.log(response.data.data);

      setCartItem(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [listDistrict, setListDistrict] = useState<district[]>([]);
  const navigate = useNavigate();
  const [listWard, setListWard] = useState<ward[]>([]);

  const [province, setProvince] = useState<province[]>([]);

  async function GetProvince() {
    try {
      const response = await GetList<{ data: province[] }>("/getAllProvince");
      setProvince(response.data);
    } catch (error) {}
  }

  async function GetDistrict(id: number) {
    try {
      const response = await FetchParams<{ data: district[] }>(
        "/getAllDistrictById",
        id
      );
      setListDistrict(response.data);
    } catch (error) {}
  }

  async function GetWard(id: number) {
    try {
      const response = await FetchParams<{ data: ward[] }>(
        "/getAllWardById",
        id
      );
      setListWard(response.data);
    } catch (error) {}
  }

  useEffect(() => {
    if (user) {
      fetchCartInLogin();
      GetProvince();
    }
  }, [user]);

  useEffect(() => {
    if (!cartItem) {
      navigate(paths.cart);
    }
  }, [cartItem]);

  const handleApplyDiscount = async () => {
    try {
      const response = await RestApi.post("/getVoucherByCode", {
        code: valueDiscount,
      });
      console.log(response);
      if (response.data.data.type_coupon === "amount") {
        setDiscount(response.data.data.discount);
      } else {
        const total =
          (calculateSubtotal(cartItem) * response.data.data.discount) / 100;
        if (total > response.data.data.coupon_max_spend) {
          setDiscount(response.data.data.coupon_max_spend);
        } else {
          setDiscount(total);
        }
      }
      ToastMessage("success", response.data.message);
    } catch (error: any) {
      console.log(error);

      ToastMessage("error", error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      province: "",
      district: "",
      ward: "",
      address: "",
      note: "",
      paymentMethod: "Thanh toán khi nhận hàng",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const responseOrder = await RestApi.post("/createOrder", {
          name: `${values.first_name} ${values.last_name}`,
          phone: values.phone,
          email: values.email,
          address: `${values.address}, ${
            listWard.filter((item) => item.id === Number(values.ward))[0]._name
          }, ${
            listDistrict.filter(
              (item1) => item1.id === Number(values.district)
            )[0]._name
          }, ${
            province.filter((item2) => item2.id === Number(values.province))[0]
              ._name
          }`,
          note: values.note,
          discount: discount,
          payment_method: values.paymentMethod,
          id_user: user?.id_user,
          total_amount: calculateSubtotal(cartItem) - discount,
        });
        if (responseOrder.data.data) {
          try {
            const response = await Promise.all(
              cartItem?.map((item) =>
                RestApi.post("/createOrderDetail", {
                  id_order: responseOrder.data.data,
                  id_product: item.id_product,
                  quantity: item.quantity,
                  name_product: item.name_product,
                  primary_image: item.image_product,
                  slug: item.slug,
                  size: item.size,
                  made: item.made,
                  price: item.total,
                  id_user: user?.id_user,
                })
              )
            );
            // ToastMessage("success", "Đặt hàng thành công");
            if (response) {
              if (values.paymentMethod === "Thanh toán khi nhận hàng") {
                ToastMessage("success", "Đặt hàng thành công");
                window.location.href = paths.checkout_success;
              } else {
                try {
                  const responseUrl = await RestApi.post("/checkOut", {
                    amount: calculateSubtotal(cartItem) - discount,
                    userId: user?.id_user,
                  });
                  window.location.href = responseUrl.data.data.order_url;
                } catch (error) {
                  console.log(error);
                }
              }
            }
          } catch (error) {
            console.log(error);
          }

          // if (response.data.data) {

          // }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Container>
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Thanh toán</h2>

        <form
          onSubmit={formik.handleSubmit}
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        >
          <div>
            <div className="">
              <h2 className="text-lg font-medium text-gray-900">
                Thông tin giao hàng
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Họ
                  </label>
                  <div className="mt-1">
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      placeholder="Vui lòng nhập họ"
                      value={formik.values.first_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {formik.touched.first_name && formik.errors.first_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.first_name}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tên
                  </label>
                  <div className="mt-1">
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      placeholder="Vui lòng nhập tên"
                      value={formik.values.last_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {formik.touched.last_name && formik.errors.last_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.last_name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Số điện thoại
                  </label>
                  <div className="mt-1">
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="Vui lòng nhập số điện thoại"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      placeholder="Vui lòng nhập email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Thành phố
                  </label>
                  <div className="mt-1">
                    <select
                      id="province"
                      name="province"
                      value={formik.values.province}
                      onChange={(e) => {
                        const value = e.target.value;
                        formik.setFieldValue("province", value);
                        formik.setFieldError("province", "");
                        formik.setFieldValue("district", "");
                        formik.setFieldValue("ward", "");
                        GetDistrict(Number(value));
                        setListWard([]);
                      }}
                      onBlur={formik.handleBlur}
                      style={{ height: "42px" }}
                      className="mt-1 block w-full p-2 border border-gray-300  bg-white rounded-md  sm:text-sm"
                    >
                      <option value="" disabled>
                        Vui lòng chọn
                      </option>
                      {province.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item._name}
                        </option>
                      ))}
                    </select>
                    {formik.touched.province && formik.errors.province && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.province}
                      </p>
                    )}
                  </div>
                </div>

                <div className="">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Quận huyện
                  </label>
                  <div className="mt-1">
                    <select
                      id="district"
                      name="district"
                      value={formik.values.district}
                      onChange={(e) => {
                        const value = e.target.value;
                        formik.setFieldValue("district", value);
                        formik.setFieldValue("ward", "");
                        GetWard(Number(value));
                      }}
                      style={{ height: "42px" }}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full p-2 border  bg-white rounded-md border-gray-300  sm:text-sm"
                    >
                      <option value="" disabled>
                        Vui lòng chọn
                      </option>
                      {listDistrict.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item._name}
                        </option>
                      ))}
                    </select>
                    {formik.touched.district && formik.errors.district && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.district}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phường xã
                  </label>
                  <div className="mt-1">
                    <select
                      id="ward"
                      name="ward"
                      value={formik.values.ward}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      style={{ height: "42px" }}
                      className="mt-1 block w-full p-2 border  bg-white rounded-md border-gray-300  sm:text-sm"
                    >
                      <option value="" disabled>
                        Vui lòng chọn
                      </option>
                      {listWard.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item._name}
                        </option>
                      ))}
                    </select>
                    {formik.touched.ward && formik.errors.ward && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.ward}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Địa chỉ
                  </label>
                  <div className="mt-1">
                    <input
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Địa chỉ"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {formik.touched.address && formik.errors.address && (
                      <p className="text-red-500 text-sm mt-1 ">
                        {formik.errors.address}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Ghi chú
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="note"
                      name="note"
                      rows={4}
                      value={formik.values.note}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Ghi chú"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">
                Phương thức thanh toán
              </h2>

              <fieldset className="mt-4">
                <legend className="sr-only">Phương thức thanh toán</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  {paymentMethods.map((paymentMethod) => (
                    <div key={paymentMethod.id} className="flex items-center">
                      <input
                        id={paymentMethod.id}
                        name="paymentMethod"
                        value={paymentMethod.title}
                        onChange={(e) => {
                          console.log(e.target.value);

                          formik.setFieldValue("paymentMethod", e.target.value);
                        }}
                        defaultChecked={
                          formik.values.paymentMethod === paymentMethod.title
                        }
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label
                        htmlFor={paymentMethod.id}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {paymentMethod.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Đơn hàng</h2>

            <div className="mt-4 bg-white border border-gray-200 rounded-lg ">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {cartItem.map((product) => (
                  <li
                    key={product.id_product}
                    className="flex py-6 px-4 sm:px-6"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={product.image_product}
                        alt={product.image_product}
                        className="w-20 rounded-md"
                      />
                    </div>

                    <div className="ml-6 flex-1 flex flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4>
                            <a
                              href={paths.productDetail(product.slug)}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              Tên sản phẩm: {product.name_product}
                            </a>
                          </h4>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <p className="mt-1 text-sm text-gray-500">
                              Kích cỡ: {product.size}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              Chất liệu: {product.made}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            Số lượng: {product.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex-1  flex items-end gap-4">
                        <p className="  font-medium text-gray-900">
                          Giá:{" "}
                          {product.price_sale > 0
                            ? formatCurrencyVND(product.price)
                            : formatCurrencyVND(product.price_sale)}
                        </p>
                        {product.price_sale > 0 && (
                          <del className=" text-sm font-medium text-gray-900">
                            {" "}
                            {formatCurrencyVND(product.price_sale)}
                          </del>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="border-t border-gray-200 py-6 px-4 space-y-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="">Tổng tiền: </dt>
                  <dd className=" font-medium text-gray-900">
                    {formatCurrencyVND(calculateSubtotal(cartItem))}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="">Phí vận chuyển</dt>
                  <dd className=" font-medium text-gray-900">Miễn phí</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="">Giảm giá</dt>
                  <dd className=" font-medium text-gray-900">
                    {discount > 0 && "-"}
                    {formatCurrencyVND(discount)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className=" font-medium">Thành tiền</dt>
                  <dd className=" font-medium text-gray-900">
                    {formatCurrencyVND(calculateSubtotal(cartItem) - discount)}
                  </dd>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <div className="flex align-center gap-2">
                    <TextField
                      size="small"
                      placeholder="Nhập mã giảm giá"
                      value={valueDiscount}
                      onChange={(e) => {
                        setValueDiscount(e.target.value);
                      }}
                      sx={{
                        ".MuiInputBase-root": {
                          borderRadius: "8px",
                          paddingLeft: "5px !important",
                          paddingRight: "5px !important",
                          textAlign: "center", // Chỉ có tác dụng ở outer div
                          fieldset: { boxSizing: "border-box" },
                        },

                        width: "100%",
                      }}
                    />
                    <button
                      onClick={() => {
                        if (valueDiscount !== "") {
                          handleApplyDiscount();
                        } else {
                          ToastMessage("error", "Vui lòng nhập mã giảm giá");
                        }
                      }}
                      style={{ maxHeight: "40px", maxWidth: "130px" }}
                      type="button"
                      className="w-full bg-indigo-600 border border-transparent rounded-md  text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 cursor-pointer"
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>
              </dl>

              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 border border-transparent rounded-md  py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 cursor-pointer"
                >
                  {isLoading ? (
                    <CircularProgress sx={{ color: "#fff" }} size="20px" />
                  ) : (
                    "Đặt hàng"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}
