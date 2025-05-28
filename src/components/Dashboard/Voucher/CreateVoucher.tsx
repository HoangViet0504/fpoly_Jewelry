import Container from "../../Container";
import { Dialog, DialogTitle } from "@mui/material";
import { Categories } from "../../../types/interface";
import { RestApi } from "../../../api/utils/axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastMessage } from "../../ToastMessage";

interface CreateVoucherProps {
    open: boolean;
    isEdit: boolean;
    setOpen: (open: boolean) => void;
    list: any[];
    setList: (list: any[]) => void;
    id: string;
}
const validationSchema = Yup.object({
    name: Yup.string()
        .required("Tên danh mục là bắt buộc")
        .min(2, "Tên danh mục phải có ít nhất 2 ký tự")
        .max(50, "Tên danh mục không được quá 50 ký tự"),
    // start_date: Yup.date()
    //     .required("Ngày bắt đầu là bắt buộc")
    //     .min(new Date(), "Ngày bắt đầu không được nhỏ hơn ngày hiện tại"),
    expires_at: Yup.date()
        .required("Ngày kết thúc là bắt buộc")
        .required("Ngày kết thúc là bắt buộc"),
    coupon_min_spend: Yup.number()
        .required("Giá trị tối thiểu là bắt buộc")
        .min(0, "Giá trị tối thiểu không được nhỏ hơn 0"),
    coupon_max_spend: Yup.number()
        .required("Giá trị tối đa là bắt buộc")
        .min(
            Yup.ref("coupon_min_spend"),
            "Giá trị tối đa không được nhỏ hơn giá trị tối thiểu"
        ),
    discount: Yup.number()
        .required("Giá trị giảm giá là bắt buộc")
        .min(0, "Giá trị giảm giá không được nhỏ hơn 0"),
    quantity: Yup.number()
        .required("Số lượng là bắt buộc")
        .min(0, "Số lượng không được nhỏ hơn 0"),
    description: Yup.string().required("Mô tả là bắt buộc"),
});
export default function CreateVoucher({
    setOpen,
    open,
    isEdit = false,
    list,
    setList,
    id,
}: CreateVoucherProps) {
    const [loading, setLoading] = useState<boolean>(false);

    async function getDetail() {
        try {
            const response = await RestApi.get("/getVouchersAdmin", {
                params: {
                    id: id,
                },
            });
            if (response.data.data) {
                formik.setFieldValue("name", response.data.data.code_coupon);
                console.log(response.data.data.start_date);

                formik.setFieldValue(
                    "start_date",
                    response.data.data.start_date.split("T")[0]
                );
                formik.setFieldValue(
                    "expires_at",
                    response.data.data.expires_at.split("T")[0]
                );
                formik.setFieldValue(
                    "coupon_min_spend",
                    response.data.data.coupon_min_spend
                );
                formik.setFieldValue(
                    "coupon_max_spend",
                    response.data.data.coupon_max_spend
                );
                formik.setFieldValue(
                    "description",
                    response.data.data.description
                );
                formik.setFieldValue("quantity", response.data.data.quantity);
                formik.setFieldValue("discount", response.data.data.discount);
                formik.setFieldValue("status", response.data.data.status);
                formik.setFieldValue("type", response.data.data.type_coupon);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isEdit && id) {
            getDetail();
        }
    }, [isEdit, id]);

    const formik = useFormik({
        initialValues: {
            name: "",
            start_date: "",
            expires_at: "",
            coupon_min_spend: 0,
            coupon_max_spend: "",
            description: "",
            quantity: "",
            type: "amount",
            discount: "",
            status: "active",
        },
        validationSchema,
        onSubmit: async (value) => {
            setLoading(true);
            if (isEdit) {
                const data = {
                    id: id,
                    code_coupon: value.name,
                    description: value.description,
                    start_date: value.start_date,
                    expires_at: value.expires_at,
                    coupon_min_spend: value.coupon_min_spend,
                    coupon_max_spend: value.coupon_max_spend,
                    discount: value.discount,
                    type_coupon: value.type,
                    quantity: value.quantity,
                    status: value.status,
                };
                try {
                    const response = await RestApi.post(
                        "/UpdateVouchersAdmin",
                        data
                    );
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
                    setLoading(false);
                } finally {
                    setLoading(false);
                }
            } else {
                const data = {
                    code_coupon: value.name,
                    description: value.description,
                    start_date: value.start_date,
                    expires_at: value.expires_at,
                    coupon_min_spend: value.coupon_min_spend,
                    coupon_max_spend: value.coupon_max_spend,
                    discount: value.discount,
                    type_coupon: value.type,
                    quantity: value.quantity,
                    status: value.status,
                };
                console.log(data);

                try {
                    const response = await RestApi.post(
                        "/AddVouchersAdmin",
                        data
                    );
                    if (response.data.data) {
                        setList([response.data.data, ...list]);
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
            aria-describedby="alert-dialog-description">
            <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
                {isEdit ? "Chỉnh sửa mã giảm giá" : "Thêm mã giảm giá"}
            </DialogTitle>
            <Container sx={{ maxWidth: "700px !important" }}>
                <div className="sm:mt-0 bg-white ">
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                        }}>
                        <div className="md:col-span-2">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <fieldset>
                                            <legend className="text-base font-medium text-gray-900">
                                                Loại giảm giá
                                            </legend>
                                            <div className=" mt-2.5 mb-3 flex flex-row items-center gap-6">
                                                <div className="flex items-center">
                                                    <input
                                                        id="push-everything"
                                                        name="type"
                                                        type="radio"
                                                        value="percent"
                                                        checked={
                                                            formik.values
                                                                .type ===
                                                            "percent"
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                    />
                                                    <label
                                                        htmlFor="push-everything"
                                                        className="ml-3 block text-sm font-medium text-gray-700">
                                                        Phần trăm
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        id="push-email"
                                                        name="type"
                                                        type="radio"
                                                        value="amount"
                                                        checked={
                                                            formik.values
                                                                .type ===
                                                            "amount"
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                    />
                                                    <label
                                                        htmlFor="push-email"
                                                        className="ml-3 block text-sm font-medium text-gray-700">
                                                        Tiền mặt
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3 ">
                                                <label
                                                    htmlFor="first-name"
                                                    className="block text-sm font-medium text-gray-700">
                                                    Code khuyến mãi
                                                </label>
                                                <input
                                                    placeholder="Vui lòng nhập code khuyến mãi"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    value={formik.values.name}
                                                    onBlur={formik.handleBlur}
                                                    type="text"
                                                    name="name"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                                                />
                                                {formik.touched.name &&
                                                    formik.errors.name && (
                                                        <p className="text-red-500 text-sm">
                                                            {formik.errors.name}
                                                        </p>
                                                    )}
                                            </div>
                                            <div className="col-span-6 sm:col-span-3 ">
                                                <label
                                                    htmlFor="first-name"
                                                    className="block text-sm font-medium text-gray-700">
                                                    {formik.values.type ===
                                                    "percent"
                                                        ? "Giảm giá (đơn vị: %)"
                                                        : "Giảm giá (đơn vị: VNĐ)"}
                                                </label>
                                                <input
                                                    placeholder="Vui lòng nhập giảm giá"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    value={
                                                        formik.values.discount
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    type="text"
                                                    name="discount"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                                                />
                                                {formik.touched.discount &&
                                                    formik.errors.discount && (
                                                        <p className="text-red-500 text-sm">
                                                            {
                                                                formik.errors
                                                                    .discount
                                                            }
                                                        </p>
                                                    )}
                                            </div>

                                            {/* <div className="col-span-6 sm:col-span-3 ">
                                                <label
                                                    htmlFor="first-name"
                                                    className="block text-sm font-medium text-gray-700">
                                                    Giảm thấp nhất
                                                </label>
                                                <input
                                                    placeholder="Vui lòng nhập giảm thấp nhất"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    value={
                                                        formik.values
                                                            .coupon_min_spend
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    type="text"
                                                    name="coupon_min_spend"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                                                />
                                                {formik.touched
                                                    .coupon_min_spend &&
                                                    formik.errors
                                                        .coupon_min_spend && (
                                                        <p className="text-red-500 text-sm">
                                                            {
                                                                formik.errors
                                                                    .coupon_min_spend
                                                            }
                                                        </p>
                                                    )}
                                            </div> */}
                                            {formik.values.type ===
                                                "percent" && (
                                                <div className="col-span-6 sm:col-span-3 ">
                                                    <label
                                                        htmlFor="first-name"
                                                        className="block text-sm font-medium text-gray-700">
                                                        Giảm tối đa
                                                    </label>
                                                    <input
                                                        placeholder="Vui lòng nhập giảm tối đa"
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .coupon_max_spend
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        type="text"
                                                        name="coupon_max_spend"
                                                        id="first-name"
                                                        autoComplete="given-name"
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                                                    />
                                                    {formik.touched
                                                        .coupon_max_spend &&
                                                        formik.errors
                                                            .coupon_max_spend && (
                                                            <p className="text-red-500 text-sm">
                                                                {
                                                                    formik
                                                                        .errors
                                                                        .coupon_max_spend
                                                                }
                                                            </p>
                                                        )}
                                                </div>
                                            )}

                                            <div className="col-span-6 sm:col-span-3 ">
                                                <label
                                                    htmlFor="first-name"
                                                    className="block text-sm font-medium text-gray-700">
                                                    Ngày bắt đầu
                                                </label>
                                                <input
                                                    placeholder="Vui lòng nhập ngày bắt đầu"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    value={
                                                        formik.values.start_date
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    type="date"
                                                    name="start_date"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                                                />
                                                {formik.touched.start_date &&
                                                    formik.errors
                                                        .start_date && (
                                                        <p className="text-red-500 text-sm">
                                                            {
                                                                formik.errors
                                                                    .start_date
                                                            }
                                                        </p>
                                                    )}
                                            </div>
                                            <div className="col-span-6 sm:col-span-3 ">
                                                <label
                                                    htmlFor="first-name"
                                                    className="block text-sm font-medium text-gray-700">
                                                    Ngày kết thúc
                                                </label>
                                                <input
                                                    placeholder="Vui lòng nhập "
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    value={
                                                        formik.values.expires_at
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    type="date"
                                                    name="expires_at"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                                                />
                                                {formik.touched.expires_at &&
                                                    formik.errors
                                                        .expires_at && (
                                                        <p className="text-red-500 text-sm">
                                                            {
                                                                formik.errors
                                                                    .expires_at
                                                            }
                                                        </p>
                                                    )}
                                            </div>
                                            <div className="col-span-6 sm:col-span-3 ">
                                                <label
                                                    htmlFor="first-name"
                                                    className="block text-sm font-medium text-gray-700">
                                                    Số lượng
                                                </label>
                                                <input
                                                    placeholder="Vui lòng nhập số lượng"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    value={
                                                        formik.values.quantity
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    type="text"
                                                    name="quantity"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300  w-full p-2 border rounded-lg"
                                                />
                                                {formik.touched.quantity &&
                                                    formik.errors.quantity && (
                                                        <p className="text-red-500 text-sm">
                                                            {
                                                                formik.errors
                                                                    .quantity
                                                            }
                                                        </p>
                                                    )}
                                            </div>
                                            <div className="col-span-6 sm:col-span-3 ">
                                                <label
                                                    htmlFor="first-name"
                                                    className="block text-sm font-medium text-gray-700">
                                                    Mô tả
                                                </label>
                                                <textarea
                                                    id="note"
                                                    name="description"
                                                    rows={2}
                                                    value={
                                                        formik.values
                                                            .description
                                                    }
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                    placeholder="Vui lòng nhập mô tả"
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                                {formik.touched.description &&
                                                    formik.errors
                                                        .description && (
                                                        <p className="text-red-500 text-sm">
                                                            {
                                                                formik.errors
                                                                    .description
                                                            }
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
                                                className="  py-4">
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
                                                                checked={
                                                                    formik
                                                                        .values
                                                                        .status ===
                                                                    "active"
                                                                }
                                                                onChange={
                                                                    formik.handleChange
                                                                }
                                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                            />
                                                            <label
                                                                htmlFor="status-active"
                                                                className="ml-3 block text-sm font-medium text-gray-700">
                                                                Hoạt động
                                                            </label>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <input
                                                                id="status-inactive"
                                                                name="status"
                                                                type="radio"
                                                                value="inactive"
                                                                checked={
                                                                    formik
                                                                        .values
                                                                        .status ===
                                                                    "inactive"
                                                                }
                                                                onChange={
                                                                    formik.handleChange
                                                                }
                                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                            />
                                                            <label
                                                                htmlFor="status-inactive"
                                                                className="ml-3 block text-sm font-medium text-gray-700">
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
                                                className=" py-3  text-left ">
                                                <button
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                        setOpen(false);
                                                    }}
                                                    type="button"
                                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                    Hủy
                                                </button>
                                                <button
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    type="submit"
                                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    {isEdit
                                                        ? "Cập nhật"
                                                        : "Thêm"}
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
