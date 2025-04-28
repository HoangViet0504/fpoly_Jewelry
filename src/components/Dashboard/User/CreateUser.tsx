import Container from "../../Container";
import { Dialog, DialogTitle } from "@mui/material";
import {
  district,
  province,
  User,
  UserDetail,
  ward,
} from "../../../types/interface";
import {
  DeleteItemHaveToken,
  FetchParams,
  FetchParamsHaveToken,
} from "../../../api/utils/axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastMessage } from "../../ToastMessage";
import ChangeImage from "../../ChangeImage";

interface CreateUserProps {
  open: boolean;
  isEdit: boolean;
  setOpen: (open: boolean) => void;
  province: province[];
  listUser: User[];
  setListUser: (listUser: User[]) => void;
  userDetail: UserDetail;
  setUserDetail: (userDetail: UserDetail) => void;
  idUser: string;
}
const validationSchema = Yup.object({
  first_name: Yup.string()
    .required("Họ tên là bắt buộc")
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(50, "Họ tên không được quá 50 ký tự"),
  avatar_img: Yup.string().required("Avatar là bắt buộc"),
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
export default function CreateUser({
  setOpen,
  open,
  isEdit = false,
  province,
  listUser,
  setListUser,
  userDetail,
  idUser,
  setUserDetail,
}: CreateUserProps) {
  const [listDistrict, setListDistrict] = useState<district[]>([]);

  const [listWard, setListWard] = useState<ward[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  async function getUserById() {
    try {
      const response = await FetchParamsHaveToken<{ data: UserDetail }>(
        "/getUserAdmin",
        Number(idUser)
      );
      console.log(response.data);

      setUserDetail(response.data);
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
      status: isEdit ? "" : "1",
      role: isEdit ? "" : "2",
      avatar_img: "",
    },
    validationSchema,
    onSubmit: async (value) => {
      setLoading(true);
      if (isEdit) {
        const data = {
          first_name: value.first_name,
          last_name: value.last_name,
          email: value.email,
          phone: value.phone,
          province: province.filter(
            (item) => item.id === Number(value.province)
          )[0]._name,
          district: listDistrict.filter(
            (item) => item.id === Number(value.district)
          )[0]._name,
          ward: listWard.filter((item) => item.id === Number(value.ward))[0]
            ._name,
          specific_address: value.address,
          birthdate: value.birthdate,
          is_active: value.status,
          role: `${value.role}`,
          avatar_img: formik.values.avatar_img,
          id: idUser,
        };
        try {
          const response = await DeleteItemHaveToken<{
            data: User;
            message: string;
          }>("/UpdateUserAdmin", data);
          if (response.data) {
            setListUser([
              response.data,
              ...listUser.filter((item) => item.id_user !== idUser),
            ]);
            ToastMessage("success", response.message);
            setOpen(false);
            formik.resetForm();
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
        } finally {
          setLoading(false);
        }
      } else {
        const data = {
          first_name: value.first_name,
          last_name: value.last_name,
          email: value.email,
          phone: value.phone,
          province: province.filter(
            (item) => item.id === Number(value.province)
          )[0]._name,
          district: listDistrict.filter(
            (item) => item.id === Number(value.district)
          )[0]._name,
          ward: listWard.filter((item) => item.id === Number(value.ward))[0]
            ._name,
          specific_address: value.address,
          password: "Anhtien2018!",
          birthdate: value.birthdate,
          is_active: value.status,
          role: value.role,
          avatar_img: formik.values.avatar_img,
        };
        try {
          const response = await DeleteItemHaveToken<{
            data: User;
            message: string;
          }>("/AddUserAdmin", data);
          if (response.data) {
            setListUser([response.data, ...listUser]);
            ToastMessage("success", response.message);
            setOpen(false);
            formik.resetForm();
          }
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }
    },
  });

  useEffect(() => {
    if (isEdit && idUser) {
      getUserById();
    }
  }, [isEdit, idUser]);

  useEffect(() => {
    const fetchAndSetValues = async () => {
      if (userDetail?.id_user) {
        if (userDetail.province_id) {
          GetDistrict(userDetail.province_id);
          formik.setFieldValue("province", userDetail.province_id);
        } else {
          setListDistrict([]);
          formik.setFieldValue("province", "");
        }
        if (userDetail.district_id) {
          GetWard(userDetail.district_id);
          formik.setFieldValue("district", userDetail.district_id);
        } else {
          setListWard([]);
          formik.setFieldValue("district", "");
        }
        if (userDetail.ward_id) {
          formik.setFieldValue("ward", userDetail.ward_id);
        } else {
          formik.setFieldValue("ward", "");
        }

        // Set formik sau khi chắc chắn district/ward đã được load
        formik.setFieldValue("first_name", userDetail.first_name);
        formik.setFieldValue("last_name", userDetail.last_name);
        formik.setFieldValue("email", userDetail.email);
        formik.setFieldValue("phone", userDetail.phone);
        formik.setFieldValue("address", userDetail.specific_address);
        formik.setFieldValue("birthdate", userDetail.birthdate);
        formik.setFieldValue("status", String(userDetail.is_active));
        formik.setFieldValue("role", String(userDetail.role));
      }
    };

    fetchAndSetValues();
  }, [userDetail]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      maxWidth="md"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        {isEdit ? "Chỉnh sửa khách hàng" : "Thêm khách hàng"}
      </DialogTitle>
      <Container sx={{ maxWidth: "700px !important" }}>
        <div className="sm:mt-0 bg-white ">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div className="md:col-span-2">
              <form onSubmit={formik.handleSubmit}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    className="px-4 bg-white  "
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <label className="block text-sm font-medium text-gray-700 text-center">
                        Ảnh đại diện
                      </label>
                      <div className="mt-1 flex items-center">
                        <ChangeImage
                          imageUrl={formik.values.avatar_img}
                          setImageUrl={(url) =>
                            formik.setFieldValue("avatar_img", url)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Họ
                        </label>
                        <input
                          placeholder="Vui lòng nhập họ của bạn"
                          onChange={formik.handleChange}
                          value={formik.values.first_name}
                          onBlur={formik.handleBlur}
                          type="text"
                          name="first_name"
                          id="first-name"
                          autoComplete="given-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                        />
                        {formik.touched.first_name &&
                          formik.errors.first_name && (
                            <p className="text-red-500 text-sm">
                              {formik.errors.first_name}
                            </p>
                          )}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tên
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          placeholder="Vui lòng nhập tên của bạn"
                          onChange={formik.handleChange}
                          value={formik.values.last_name}
                          onBlur={formik.handleBlur}
                          id="last_name"
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                        />
                        {formik.touched.last_name &&
                          formik.errors.last_name && (
                            <p className="text-red-500 text-sm">
                              {formik.errors.last_name}
                            </p>
                          )}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          placeholder="Vui lòng nhập email của bạn"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          onBlur={formik.handleBlur}
                          name="email"
                          id="email"
                          autoComplete="email"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                        />
                        {formik.touched.email && formik.errors.email && (
                          <p className="text-red-500 text-sm">
                            {formik.errors.email}
                          </p>
                        )}
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Số điện thoại
                        </label>
                        <input
                          type="text"
                          name="phone"
                          placeholder="Vui lòng nhập số điện thoại của bạn"
                          onChange={formik.handleChange}
                          value={formik.values.phone}
                          onBlur={formik.handleBlur}
                          id="phone"
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                        />
                        {formik.touched.phone && formik.errors.phone && (
                          <p className="text-red-500 text-sm">
                            {formik.errors.phone}
                          </p>
                        )}
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Ngày sinh
                        </label>
                        <input
                          max={new Date().toISOString().split("T")[0]}
                          type="date"
                          name="birthdate"
                          placeholder="Vui lòng nhập số điện thoại của bạn"
                          onChange={formik.handleChange}
                          value={formik.values.birthdate}
                          onBlur={formik.handleBlur}
                          id="last-name"
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                        />
                        {formik.touched.birthdate &&
                          formik.errors.birthdate && (
                            <p className="text-red-500 text-sm">
                              {formik.errors.birthdate}
                            </p>
                          )}
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="province"
                          className="block text-sm font-medium text-gray-700"
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
                            formik.setFieldError("province", ""); // xoá lỗi hiện tại
                            formik.setFieldValue("district", "");
                            formik.setFieldValue("ward", "");
                            GetDistrict(Number(value)); // gọi API lấy quận
                            setListWard([]); // xóa danh sách phường cũ
                          }}
                          onBlur={formik.handleBlur}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                          <p className="text-red-500 text-sm">
                            {formik.errors.province}
                          </p>
                        )}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
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
                            GetWard(Number(value)); // Giả sử bạn có hàm lấy danh sách phường
                          }}
                          onBlur={formik.handleBlur}
                          autoComplete="address-level2"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                          <p className="text-red-500 text-sm">
                            {formik.errors.district}
                          </p>
                        )}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
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
                          autoComplete="address-level3"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                          <p className="text-red-500 text-sm">
                            {formik.errors.ward}
                          </p>
                        )}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Địa chỉ
                        </label>
                        <input
                          placeholder="Vui lòng nhập địa chỉ của bạn"
                          onChange={formik.handleChange}
                          value={formik.values.address}
                          onBlur={formik.handleBlur}
                          type="text"
                          name="address"
                          id="address"
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                        />
                        {formik.touched.address && formik.errors.address && (
                          <p className="text-red-500 text-sm">
                            {formik.errors.address}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className=" overflow-hidden sm:rounded-md">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                        }}
                        className="  py-4"
                      >
                        <fieldset>
                          <legend className="text-base font-medium text-gray-900">
                            Quyền
                          </legend>
                          <div className=" mt-2.5 flex flex-row items-center gap-6">
                            <div className="flex items-center">
                              <input
                                id="push-everything"
                                name="role"
                                type="radio"
                                value="1"
                                checked={formik.values.role === "1"}
                                onChange={formik.handleChange}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              />
                              <label
                                htmlFor="push-everything"
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                Quản lý
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="push-email"
                                name="role"
                                type="radio"
                                value="2"
                                checked={formik.values.role === "2"}
                                onChange={formik.handleChange}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              />
                              <label
                                htmlFor="push-email"
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                Khách hàng
                              </label>
                            </div>
                          </div>
                        </fieldset>
                        <fieldset>
                          <div>
                            <legend className="text-base font-medium text-gray-900">
                              Trạng thái
                            </legend>
                          </div>
                          <div className="mt-2.5 flex flex-row items-center gap-6">
                            <div className="flex items-center">
                              <input
                                id="status-active"
                                name="status"
                                type="radio"
                                value="1"
                                checked={formik.values.status === "1"}
                                onChange={formik.handleChange}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              />
                              <label
                                htmlFor="status-active"
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                Hoạt động
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                id="status-inactive"
                                name="status"
                                type="radio"
                                value="0"
                                checked={formik.values.status === "0"}
                                onChange={formik.handleChange}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              />
                              <label
                                htmlFor="status-inactive"
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                Tạm khóa
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                        }}
                        className=" py-3  text-left "
                      >
                        <button
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setOpen(false);
                          }}
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Hủy
                          {/* <UserIcon
                          className="ml-3 -mr-1 h-5 w-5"
                          aria-hidden="true"
                        /> */}
                        </button>
                        <button
                          style={{ cursor: "pointer" }}
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          {isEdit ? "Cập nhật" : "Thêm"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </Dialog>
  );
}
