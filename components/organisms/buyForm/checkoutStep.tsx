import React, { memo } from "react";
import { useBuyFlow } from "@stores";
import { Container, Grid, Typography, useTheme } from "@material-ui/core";
import { ShipmentForm, PaymentForm, IconsWithText } from "@molecules";
import CheckoutDetails from "../checkoutDetails";


interface CheckoutStepProps {
    handleSubmitPayment: () => void;
}
export const CheckoutStep = memo((props: CheckoutStepProps) => {
    const theme = useTheme();
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Container style={{ maxWidth: '650px' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} style={{ marginBottom: theme.spacing(1) }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src='/icons/checkout/verified.svg' width={24} height={24} />
                                    <Typography variant="h5" style={{ marginLeft: theme.spacing(1) }}>Pago 100% seguro</Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <ShipmentForm onClick={() => ""} />
                            </Grid>
                            <Grid item xs={12}>
                                <PaymentForm savedCards />
                            </Grid>
                            <Grid item xs={12} style={{marginTop: theme.spacing(4)}}>
                                <IconsWithText />
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
                <Grid item xs={12} md={4}>
                    <CheckoutDetails />
                </Grid>
            </Grid>
        </>
    );
});

export default CheckoutStep;
