import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { FetchParams, GetList, RestApi } from "../../api/utils/axios";
import { district, UserDetail, ward } from "../../types/interface";
import { useFormik } from "formik";
import * as Yup from "yup";
import { province } from "../../types/interface";
import { ToastMessage } from "../ToastMessage";
import { CircularProgress } from "@mui/material";
import { noImage } from "../../common/constant";

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
  birthdate: Yup.string().required("Ngày sinh là bắt buộc"),
});

export default function Information(): React.ReactElement {
  const { user, setUser } = useAuthStore();

  const [listDistrict, setListDistrict] = useState<district[]>([]);

  const [listWard, setListWard] = useState<ward[]>([]);

  const [province, setProvince] = useState<province[]>([]);

  const [isLoading, setIsLoading] = useState(false);

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
    const fetchAndSetValues = async () => {
      if (user?.id_user) {
        if (user?.province_id) {
          GetDistrict(user?.province_id);
          formik.setFieldValue("province", user?.province_id);
        } else {
          setListDistrict([]);
          formik.setFieldValue("province", "");
        }
        if (user?.district_id) {
          GetWard(user?.district_id);
          formik.setFieldValue("district", user?.district_id);
        } else {
          setListWard([]);
          formik.setFieldValue("district", "");
        }
        if (user?.ward_id) {
          formik.setFieldValue("ward", user?.ward_id);
        } else {
          formik.setFieldValue("ward", "");
        }

        // Set formik sau khi chắc chắn district/ward đã được load
        formik.setFieldValue("first_name", user?.first_name);
        formik.setFieldValue("last_name", user?.last_name);
        formik.setFieldValue("email", user?.email);
        formik.setFieldValue("phone", user?.phone);
        formik.setFieldValue("address", user?.specific_address);
        formik.setFieldValue("birthdate", user?.birthdate);
        formik.setFieldValue("avatar_img", user?.avatar_img);
      }
    };
    if (user) {
      fetchAndSetValues();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      // getUserById();
    }
    GetProvince();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      formik.setFieldValue("avatar_img", base64String);
      // Bạn có thể dùng Formik setFieldValue nếu cần
      // formik.setFieldValue("avatar_img", base64String);
    };

    reader.readAsDataURL(file);
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
      birthdate: "",
      avatar_img: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        const response = await RestApi.post<{
          data: UserDetail;
          message: string;
        }>("/UpdateUser", {
          id: user?.id_user,
          first_name: values.first_name,
          last_name: values.last_name,
          phone: values.phone,
          avatar_img: formik.values.avatar_img,
          email: values.email,
          birthdate: values.birthdate,
          province: province.filter(
            (item) => item.id === Number(values.province)
          )[0]?._name,
          district: listDistrict.filter(
            (item) => item.id === Number(values.district)
          )[0]?._name,
          ward: listWard.filter((item) => item.id === Number(values.ward))[0]
            ?._name,
          specific_address: values.address,
        });
        setUser(response.data.data);
        ToastMessage("success", response.data.message);
        formik.resetForm();
      } catch (error: any) {
        ToastMessage("error", error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        <div className="relative w-24 h-24 rounded-full overflow-hidden">
          <img
            src={formik.values.avatar_img || noImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <input
            type="file"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold">
            {user?.first_name} {user?.last_name}
          </h2>
        </div>
      </div>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "40px" }}
        onSubmit={formik.handleSubmit}
      >
        {/* Profile Information Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Họ */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Họ
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="first_name"
              id="first_name"
            />
          </div>

          {/* Tên */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tên
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="last_name"
              id="last_name"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              id="email"
            />
          </div>

          {/* Số điện thoại */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              type="tel"
              className="w-full p-2 border rounded-lg"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="phone"
              id="phone"
            />
          </div>

          {/* birthdate */}
          <div className="space-y-2 ">
            <label className="block text-sm font-medium text-gray-700">
              Sinh nhật
            </label>
            <input
              type="date"
              placeholder="Vui lòng nhập ngày sinh của bạn"
              className="w-full p-2 border rounded-lg"
              value={formik.values.birthdate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="birthdate"
              id="birthdate"
            />
          </div>
          {/* Thành phố */}
          <div className="space-y-2">
            <label
              htmlFor="province"
              className="block  text-sm font-medium text-gray-700"
            >
              Thành phố
            </label>
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
              className="mt-1 block w-full p-2 border  bg-white rounded-md shadow-sm sm:text-sm"
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
              <p className="text-red-500 text-sm">{formik.errors.province}</p>
            )}
          </div>

          {/* Quận / Huyện */}
          <div className="sm:col-span-2">
            <label
              htmlFor="district"
              className="block text-sm font-medium text-gray-700"
            >
              Quận / Huyện
            </label>
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
              className="mt-1 block w-full p-2 border  bg-white rounded-md shadow-sm sm:text-sm"
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
              <p className="text-red-500 text-sm">{formik.errors.district}</p>
            )}
          </div>

          {/* Phường / Xã */}
          <div className="sm:col-span-2">
            <label
              htmlFor="ward"
              className="block text-sm font-medium text-gray-700"
            >
              Phường / Xã
            </label>
            <select
              id="ward"
              name="ward"
              value={formik.values.ward}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ height: "42px" }}
              className="mt-1 block w-full p-2 border  bg-white rounded-md shadow-sm sm:text-sm"
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
              <p className="text-red-500 text-sm">{formik.errors.ward}</p>
            )}
          </div>

          {/* Địa chỉ */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Địa chỉ
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="address"
              id="address"
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-500 text-sm">{formik.errors.address}</p>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            disabled={isLoading}
            onClick={() => {}}
            style={{ width: "180px", cursor: "pointer" }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {isLoading ? (
              <CircularProgress sx={{ color: "#fff" }} size="20px" />
            ) : (
              " Cập nhật thông tin"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
