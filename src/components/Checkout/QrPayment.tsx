import React, { Fragment, use, useContext, useEffect } from "react";
import {
    Box,
    Typography,
    Divider,
    Grid,
    Avatar,
    Button,
    CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate, useParams } from "react-router-dom";
import { RestApi } from "../../api/utils/axios";
import { useAuthStore } from "../../stores/useAuthStore";
import { ToastMessage } from "../ToastMessage";

export default function QrOrderPaymentPage() {
    const { id } = useParams();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [dataOrderDetail, setDataOrderDetail] = React.useState<any>(null);

    const fetchOrderDetails = async (orderId: number) => {
        try {
            const response = await RestApi.get(`/getorder`, {
                params: {
                    orderId: orderId,
                    userId: user?.id_user,
                },
            });

            setDataOrderDetail(response.data.data[0]);
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };

    const fetchCheckStatusOrder = async (orderId: number) => {
        try {
            const response = await RestApi.get(
                `/checkOrderStatus/${orderId}`,
                {}
            );

            if (response.data.data === "new") {
                ToastMessage(
                    "success",
                    `Thanh toán đơn hàng ${orderId} thành công`
                );

                return navigate("/profile");
            }
        } catch (error) {
            console.error("Error checking order status:", error);
        }
    };
    useEffect(() => {
        const timer = setInterval(() => {
            fetchCheckStatusOrder(id ? parseInt(id) : 0);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (user) fetchOrderDetails(id ? parseInt(id) : 0);
    }, [id, user]);

    return (
        <Fragment>
            {dataOrderDetail && (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                    width="100%"
                    sx={{ px: 1 }}>
                    <Box
                        p={3}
                        maxWidth={1200}
                        mx="auto"
                        borderRadius={2}
                        boxShadow={3}
                        bgcolor="#fff">
                        <Box display="flex" alignItems="center" gap={1} mb={2}>
                            <CheckCircleIcon color="success" />
                            <Typography variant="h6" fontWeight="bold">
                                Đặt hàng thành công
                            </Typography>
                        </Box>

                        <Typography variant="subtitle1" mb={3}>
                            Mã đơn hàng{" "}
                            <strong>{dataOrderDetail.id_order}</strong>
                        </Typography>

                        <Divider textAlign="center" sx={{ mb: 3 }}>
                            Hướng dẫn thanh toán qua chuyển khoản ngân hàng
                        </Divider>

                        <Grid container spacing={2}>
                            {/* Cách 1 */}
                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Cách 1: Mở app ngân hàng và quét mã QR
                                </Typography>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center">
                                    <Box
                                        component={"img"}
                                        src={`https://qr.sepay.vn/img?bank=VPB&acc=0916022260&template=compact&amount=${dataOrderDetail.total_amount}&des=NAP ${dataOrderDetail.id_order}`}
                                        alt="QR Code"
                                        sx={{ width: 500, mb: 2 }}
                                    />

                                    <Typography
                                        mt={2}
                                        fontSize={14}
                                        color="text.secondary">
                                        Trạng thái: Chờ thanh toán...{" "}
                                        <CircularProgress size={16} />
                                    </Typography>
                                </Box>
                            </Grid>

                            {/* Cách 2 */}
                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Cách 2: Chuyển khoản thủ công theo thông tin
                                </Typography>

                                <Box
                                    component={"img"}
                                    src="https://qr.sepay.vn/assets/img/banklogo/VPB.png"
                                    alt="QR Code"
                                    sx={{ width: 200, mb: 2 }}
                                />

                                <Typography>
                                    <strong>Ngân hàng:</strong> VP Bank
                                </Typography>
                                <Typography>
                                    <strong>Chủ tài khoản:</strong> Trịnh Hoàng
                                    Việt
                                </Typography>
                                <Typography>
                                    <strong>Số TK:</strong> 0916022260
                                </Typography>
                                <Typography>
                                    <strong>Số tiền:</strong>{" "}
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(dataOrderDetail.total_amount)}
                                </Typography>
                                <Typography>
                                    <strong>Nội dung CK:</strong> NAP{" "}
                                    {dataOrderDetail.id_order}
                                </Typography>
                                <Typography
                                    fontSize={13}
                                    color="text.secondary"
                                    mt={1}>
                                    Lưu ý: Vui lòng giữ nguyên nội dung chuyển
                                    khoản{" "}
                                    <strong>
                                        NAP {dataOrderDetail.id_order}
                                    </strong>{" "}
                                    để hệ thống tự động xác nhận thanh toán.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            )}
        </Fragment>
    );
}
