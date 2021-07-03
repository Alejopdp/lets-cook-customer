// Utils & Config
import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import Link from "next/link";

// External components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// Internal components
import InnerSectionLayout from "../../components/layout/publicLayout";
import Layout from "../../components/layout/index";
import PaymentsTable from "../../components/molecules/paymentsTable/PaymentsTable";
import PaymentDetailsModal from "../../components/molecules/paymentDetailsModal/PaymentDetailsModal";

const HistorialPagos = (props) => {
    const theme = useTheme();
    const [openPaymentDetailsModal, setOpenPaymentDetailsModal] = useState(false);

    const handleClickOpenPaymentDetailsModal = () => {
        setOpenPaymentDetailsModal(true);
    };

    const handleClosePaymentDetailsModal = () => {
        setOpenPaymentDetailsModal(false);
    };

    console.log(theme.palette.text.black);
    console.log(theme.palette.text.primary);

    return (
        <>
            <Layout>
                <InnerSectionLayout containerMaxWidth="lg">
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: theme.spacing(3) }}>
                        <Link href="/perfil">
                            <IconButton aria-label="close" style={{ marginRight: theme.spacing(1), color: theme.palette.text.black }}>
                                <ArrowBackIcon />
                            </IconButton>
                        </Link>
                        <Typography variant="h4" style={{ fontSize: "24px", color: theme.palette.text.black }}>
                            Historial de pagos
                        </Typography>
                    </div>
                    <PaymentsTable onClick={handleClickOpenPaymentDetailsModal} />
                </InnerSectionLayout>
            </Layout>
            <PaymentDetailsModal open={openPaymentDetailsModal} handleClose={handleClosePaymentDetailsModal} />
        </>
    );
};

export default HistorialPagos;
