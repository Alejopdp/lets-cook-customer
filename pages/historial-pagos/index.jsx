// Utils & Config
import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import Link from "next/link";
import { useLang } from "@hooks";

// External components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useUserInfoStore } from "../../stores/auth";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { getCustomerPaymentOrders, getPaymentOrderById } from "../../helpers/serverRequests/paymentOrder";

// Internal components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import { Layout } from "../../components/layout/index";
import PaymentsTable from "../../components/molecules/paymentsTable/PaymentsTable";
import PaymentDetailsModal from "../../components/molecules/paymentDetailsModal/paymentDetailsModal";
import BackButtonTitle from "../../components/atoms/backButtonTitle/backButtonTitle";

const HistorialPagos = (props) => {
    const theme = useTheme();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [openPaymentDetailsModal, setOpenPaymentDetailsModal] = useState(false);
    const [selectedPaymentOrder, setSelectedPaymentOrder] = useState({});
    const [orders, setorders] = useState([]);
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const [lang] = useLang("historialPagos");

    useEffect(() => {
        const getCustomerOrders = async () => {
            const res = await getCustomerPaymentOrders(userInfo.id, router.locale);

            if (res.status === 200) {
                setorders(
                    res.data.paymentOrders.filter(
                        (paymentOrder) =>
                            paymentOrder.state === "PAYMENT_ORDER_BILLED" ||
                            paymentOrder.state === "PAYMENT_ORDER_REFUNDED" ||
                            paymentOrder.state === "PAYMENT_ORDER_PARTIALLY_REFUNDED"
                    )
                );
            } else {
                enqueueSnackbar(res.data.message, { variant: "error" });
            }
        };

        getCustomerOrders();
    }, []);

    const handleClickOpenPaymentDetailsModal = async (paymentOrderId) => {
        const res = await getPaymentOrderById(paymentOrderId, router.locale);

        if (res.status === 200) {
            setSelectedPaymentOrder(res.data);
            setOpenPaymentDetailsModal(true);
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const handleClosePaymentDetailsModal = () => {
        setOpenPaymentDetailsModal(false);
        setSelectedPaymentOrder({});
    };

    return (
        <>
            <Layout disableCallToActionSection>
                <InnerSectionLayout containerMaxWidth="lg">
                    <BackButtonTitle url="/perfil" title={lang.title} />
                    <PaymentsTable onClick={handleClickOpenPaymentDetailsModal} paymentOrders={orders} lang={lang.paymentsTable} />
                </InnerSectionLayout>
            </Layout>
            <PaymentDetailsModal data={selectedPaymentOrder} open={openPaymentDetailsModal} handleClose={handleClosePaymentDetailsModal} lang={lang.paymentDetailsModal} />
        </>
    );
};

export default HistorialPagos;
