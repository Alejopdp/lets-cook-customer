// Utils & Config
import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import Link from "next/link";

// External components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


// Internal components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import { Layout } from "../../components/layout/index";
import PaymentsTable from "../../components/molecules/paymentsTable/PaymentsTable";
import PaymentDetailsModal from "../../components/molecules/paymentDetailsModal/PaymentDetailsModal";
import BackButtonTitle from "../../components/atoms/backButtonTitle/backButtonTitle";

const HistorialPagos = (props) => {
    const theme = useTheme();
    const [openPaymentDetailsModal, setOpenPaymentDetailsModal] = useState(false);
    const [selectedPaymentOrderId, setSelectedPaymentOrderId] = useState('');

    const handleClickOpenPaymentDetailsModal = (paymentOrderId) => {
        setSelectedPaymentOrderId(paymentOrderId);
        setOpenPaymentDetailsModal(true);
    };

    const handleClosePaymentDetailsModal = () => {
        setOpenPaymentDetailsModal(false);
        setSelectedPaymentOrderId('');
    };

    
    return (
        <>
            <Layout disableCallToActionSection>
                <InnerSectionLayout containerMaxWidth="lg">
                    <BackButtonTitle url="/perfil" title="Historial de pagos" />
                    <PaymentsTable onClick={handleClickOpenPaymentDetailsModal} />
                </InnerSectionLayout>
            </Layout>
            <PaymentDetailsModal data={selectedPaymentOrderId} open={openPaymentDetailsModal} handleClose={handleClosePaymentDetailsModal} />
        </>
    );
};

export default HistorialPagos;
