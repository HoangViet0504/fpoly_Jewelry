import Container from "../../Container";
import { Dialog, DialogTitle } from "@mui/material";
import { Categories } from "../../../types/interface";
import { RestApi } from "../../../api/utils/axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastMessage } from "../../ToastMessage";
import ChangeImage from "../../ChangeImage";
import { noImage } from "../../../common/constant";

interface CreateProductProps {
  open: boolean;
  isEdit: boolean;
  setOpen: (open: boolean) => void;
  list: any[];
  setList: (list: any[]) => void;
  listCategories: Categories[];
  id: string;
}

export const validationSchema = Yup.object().shape({
  name_product: Yup.string()
    .required("Tên sản phẩm là bắt buộc")
    .min(2, "Tên sản phẩm phải có ít nhất 2 ký tự")
    .max(50, "Tên sản phẩm không được quá 50 ký tự"),

  id_categories: Yup.string().required("Mã danh mục là bắt buộc"),

  description: Yup.string().required("Mô tả là bắt buộc"),

  primary_image: Yup.string().required("Hình ảnh là bắt buộc"),

  price: Yup.number()
    .typeError("Giá phải là số")
    .required("Giá là bắt buộc")
    .moreThan(0, "Giá phải lớn hơn 0"),

  quantity: Yup.number()
    .typeError("Số lượng phải là số")
    .required("Số lượng là bắt buộc")
    .moreThan(0, "Số lượng phải lớn hơn 0"),

  price_sale: Yup.number()
    .typeError("Giá khuyến mãi phải là số")
    .required("Giá khuyến mãi là bắt buộc")
    .moreThan(0, "Giá khuyến mãi phải lớn hơn 0")
    .test(
      "is-less-than-price",
      "Giá khuyến mãi phải nhỏ hơn giá gốc",
      function (value) {
        const { price } = this.parent;
        return value < price;
      }
    ),
});

export default function CreateProduct({
  setOpen,
  open,
  isEdit = false,
  list,
  setList,
  id,
  listCategories,
}: CreateProductProps) {
  const [loading, setLoading] = useState<boolean>(false);

  async function getDetail() {
    try {
      const response = await RestApi.get("/getProductAdmin", {
        params: {
          id: id,
        },
      });
      if (response.data.data) {
        formik.setFieldValue("name_product", response.data.data.name_product);
        formik.setFieldValue("primary_image", response.data.data.primary_image);
        formik.setFieldValue("made", response.data.data.made);

        formik.setFieldValue("size", response.data.data.size);

        formik.setFieldValue("quantity", response.data.data.quantity);
        formik.setFieldValue("price", response.data.data.price);
        formik.setFieldValue("price_sale", response.data.data.price_sale);
        formik.setFieldValue("description", response.data.data.description);
        formik.setFieldValue(
          "short_description",
          response.data.data.short_description
        );

        formik.setFieldValue("status", response.data.data.status);
        formik.setFieldValue("id_categories", response.data.data.id_category);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isEdit && id) {
      getDetail();
    }
  }, [isEdit, id, open]);

  const formik = useFormik({
    initialValues: {
      id_categories: "",
      id_collection: "",
      name_product: "",
      short_description: "",
      description: "",
      made: "",
      status: "active",
      size: "",
      primary_image: noImage,
      price: "",
      price_sale: "",
      quantity: 0,
    },
    validationSchema,
    onSubmit: async (value) => {
      setLoading(true);
      if (isEdit) {
        const data = {
          id: id,
          name: value.name_product,
          id_categories: value.id_categories,
          id_collection: null,
          short_description: value.short_description,
          description: value.description,
          quantity: value.quantity,
          status: value.status,
          primary_image: value.primary_image,
          price: value.price,
          price_sale: value.price_sale,
          made: value.made,
          size: value.size,
        };
        try {
          const response = await RestApi.post("/UpdateProductsAdmin", data);
          if (response.data.data) {
            setList([
              response.data.data,
              ...list.filter((item) => item.id !== id),
            ]);
            ToastMessage("success", response.data.message);
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
      } else {
        const data = {
          id_categories: value.id_categories,
          id_collection: 1,
          name_product: value.name_product,
          short_description: value.short_description,
          description: value.description,
          quantity: value.quantity,
          status: value.status,
          primary_image: value.primary_image,
          price: value.price,
          price_sale: value.price_sale,
          made: value.made,
          size: JSON.stringify(value.size.split(",").map(String)),
        };

        try {
          const response = await RestApi.post("/AddProductsAdmin", data);
          if (response.data.data) {
            setList(response.data.data);
            ToastMessage("success", response.data.message);
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
        {isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
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
                        Hình sản phẩm
                      </label>
                      <div className="mt-1 flex items-center">
                        <ChangeImage
                          isRadius={false}
                          imageUrl={formik.values.primary_image}
                          setImageUrl={(url) =>
                            formik.setFieldValue("primary_image", url)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6  sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tên sản phẩm
                        </label>
                        <input
                          placeholder="Vui lòng nhập tên sản phẩm"
                          onChange={formik.handleChange}
                          value={formik.values.name_product}
                          onBlur={formik.handleBlur}
                          type="text"
                          name="name_product"
                          id="first-name"
                          autoComplete="given-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                        />
                        {formik.touched.name_product &&
                          formik.errors.name_product && (
                            <p className="text-red-500 text-sm">
                              {formik.errors.name_product}
                            </p>
                          )}
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Mô tả ngắn
                        </label>
                        <input
                          placeholder="Vui lòng nhập mô tả ngắn"
                          onChange={formik.handleChange}
                          value={formik.values.short_description}
                          onBlur={formik.handleBlur}
                          type="text"
                          name="short_description"
                          id="first-name"
                          autoComplete="given-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Giá gốc
                        </label>
                        <input
                          type="text"
                          name="price"
                          placeholder="Vui lòng nhập giá sản phẩm"
                          onChange={formik.handleChange}
                          value={formik.values.price}
                          onBlur={formik.handleBlur}
                          id="last_name"
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                        />
                        {formik.touched.price && formik.errors.price && (
                          <p className="text-red-500 text-sm">
                            {formik.errors.price}
                          </p>
                        )}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Giá giảm
                        </label>
                        <input
                          type="text"
                          name="price_sale"
                          placeholder="Vui lòng nhập giá giảm"
                          onChange={formik.handleChange}
                          value={formik.values.price_sale}
                          onBlur={formik.handleBlur}
                          id="last_name"
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                        />
                        {formik.touched.price_sale &&
                          formik.errors.price_sale && (
                            <p className="text-red-500 text-sm">
                              {formik.errors.price_sale}
                            </p>
                          )}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Số lượng
                        </label>
                        <input
                          type="text"
                          name="quantity"
                          placeholder="Vui lòng nhập số lượng"
                          onChange={formik.handleChange}
                          value={formik.values.quantity}
                          onBlur={formik.handleBlur}
                          id="last_name"
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                        />
                        {formik.touched.quantity && formik.errors.quantity && (
                          <p className="text-red-500 text-sm">
                            {formik.errors.quantity}
                          </p>
                        )}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Kích thược
                        </label>
                        <input
                          type="text"
                          name="size"
                          placeholder="Vui lòng nhập kích thước"
                          onChange={formik.handleChange}
                          value={formik.values.size}
                          onBlur={formik.handleBlur}
                          id="last_name"
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                        />
                        {/* {formik.touched.size && formik.errors.size && (
                          <p className="text-red-500 text-sm">
                            {formik.errors.size}
                          </p>
                        )} */}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Nguyên liệu
                        </label>
                        <input
                          type="text"
                          name="made"
                          placeholder="Vui lòng nhập kích thước"
                          onChange={formik.handleChange}
                          value={formik.values.made}
                          onBlur={formik.handleBlur}
                          id="last_name"
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                        />
                        {/* {formik.touched.size && formik.errors.size && (
                          <p className="text-red-500 text-sm">
                            {formik.errors.size}
                          </p>
                        )} */}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="province"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Danh mục
                        </label>
                        <select
                          id="province"
                          name="id_categories"
                          value={formik.values.id_categories}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "id_categories",
                              e.target.value
                            );
                          }}
                          onBlur={formik.handleBlur}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="" disabled>
                            Vui lòng chọn
                          </option>
                          {listCategories.map((item) => (
                            <option
                              key={item.id_categories}
                              value={item.id_categories}
                            >
                              {item.name}
                            </option>
                          ))}
                        </select>
                        {formik.touched.id_categories &&
                          formik.errors.id_categories && (
                            <p className="text-red-500 text-sm">
                              {formik.errors.id_categories}
                            </p>
                          )}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Mô tả
                        </label>
                        <textarea
                          id="note"
                          name="description"
                          rows={4}
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Vui lòng nhập mô tả"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {formik.touched.description &&
                          formik.errors.description && (
                            <p className="text-red-500 text-sm">
                              {formik.errors.description}
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
                                value="active"
                                checked={formik.values.status === "active"}
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
                                value="inactive"
                                checked={formik.values.status === "inactive"}
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
