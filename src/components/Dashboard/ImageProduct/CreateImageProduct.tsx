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

interface CreateCategoryProps {
  open: boolean;
  isEdit: boolean;
  setOpen: (open: boolean) => void;
  list: Categories[];
  setList: (list: Categories[]) => void;
  id: string;
}
const validationSchema = Yup.object({
  id_product: Yup.string().required("Sản phẩm không được để trống"),
});
export default function CreateImageProduct({
  setOpen,
  open,
  isEdit = false,
  list,
  setList,
  id,
}: CreateCategoryProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [listProduct, setListProduct] = useState<any[]>([]);
  async function getProduct() {
    try {
      const response = await RestApi.get("/getAllProducts");
      console.log(response.data.data);

      setListProduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getDetail() {
    try {
      const response = await RestApi.get("/getCategoriesAdminById", {
        params: {
          id: id,
        },
      });
      if (response.data.data) {
        formik.setFieldValue("name", response.data.data.name);
        formik.setFieldValue(
          "image_categories",
          response.data.data.image_categories
        );
        formik.setFieldValue("status", response.data.data.status);
        formik.setFieldValue("type", response.data.data.type);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (isEdit && id) {
      getDetail();
    }
  }, [isEdit, id]);

  const formik = useFormik({
    initialValues: {
      image: [noImage] as string[],
      id_product: "",
    },
    validationSchema,
    onSubmit: async (value) => {
      setLoading(true);
      try {
        formik.values.image.forEach(async (item) => {
          await RestApi.post("/AddImageProduct", {
            id_products: value.id_product,
            image: item,
          });
        });
        ToastMessage("success", "Thêm hình sản phẩm thành công");
        setOpen(false);
        formik.resetForm();
        setLoading(false);
        const response = await RestApi.get("/getGroupedImageProducts");
        setList(response.data.data);
      } catch (error) {
        console.log(error);
      }
      // if (isEdit) {
      //   const data = {
      //     id: id,
      //     name: value.name,
      //     image_categories: value.image_categories,
      //     type: value.type,
      //     status: value.status,
      //   };
      //   try {
      //     const response = await RestApi.post("/UpdateCategoriesAdmin", data);
      //     if (response.data.data) {
      //       setList([
      //         response.data.data,
      //         ...list.filter((item) => item.id_categories !== id),
      //       ]);
      //       ToastMessage("success", response.data.message);
      //       setOpen(false);
      //       formik.resetForm();
      //     }
      //     setLoading(false);
      //   } catch (error) {
      //     setLoading(false);
      //   } finally {
      //     setLoading(false);
      //   }
      // } else {
      //   const data = {
      //     name: value.name,
      //     image_categories: value.image_categories,
      //     type: value.type,
      //     status: value.status,
      //   };
      //   console.log(data);

      //   try {
      //     const response = await RestApi.post("/AddCategoriesAdmin", data);
      //     if (response.data.data) {
      //       setList([response.data.data, ...list]);
      //       ToastMessage("success", response.data.message);
      //       setOpen(false);
      //       formik.resetForm();
      //     }
      //     setLoading(false);
      //   } catch (error) {
      //     console.log(error);
      //     setLoading(false);
      //   } finally {
      //     setLoading(false);
      //   }
      // }
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
        {isEdit ? "Chỉnh sửa khách hàng" : "Thêm hình sản phẩm"}
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
                      <div
                        className="mt-1 flex flex-wrap items-center gap-4"
                        style={{ justifyContent: "center" }}
                      >
                        {formik.values.image.map((image, index) => (
                          <div key={index} style={{ position: "relative" }}>
                            <ChangeImage
                              isRadius={false}
                              imageUrl={image}
                              setImageUrl={(url) => {
                                const updatedImages = [...formik.values.image];
                                updatedImages[index] = url;
                                formik.setFieldValue("image", updatedImages);
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updatedImages = [...formik.values.image];
                                updatedImages.splice(index, 1);
                                formik.setFieldValue("image", updatedImages);
                              }}
                              style={{
                                position: "absolute",
                                top: "-10px",
                                right: "-10px",
                                background: "red",
                                color: "white",
                                borderRadius: "50%",
                                width: "24px",
                                height: "24px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                              }}
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3 px-4 py-5">
                    <label
                      htmlFor="province"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Sản phẩm
                    </label>
                    <select
                      id="id_product"
                      name="id_product"
                      value={formik.values.id_product}
                      onChange={(e) => {
                        formik.setFieldValue("id_product", e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="" disabled>
                        Vui lòng chọn
                      </option>
                      {listProduct.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name_product}
                        </option>
                      ))}
                    </select>
                    {formik.touched.id_product && formik.errors.id_product && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.id_product}
                      </p>
                    )}
                  </div>

                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className=" overflow-hidden sm:rounded-md">
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
                          {isEdit ? "Cập nhật" : "Tạo hình"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            formik.setFieldValue("image", [
                              ...formik.values.image,
                              noImage,
                            ]);
                          }}
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Thêm 1 hình
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
