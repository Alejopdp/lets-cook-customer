import React, { memo } from "react";
import { useBuyFlow } from "@stores";
import { Container, Grid } from "@material-ui/core";
import { ShipmentForm, PaymentForm, IconsWithText } from "@molecules";
import CheckoutDetails from "../checkoutDetails";

interface CheckoutStepProps {
    handleSubmitPayment: () => void;
}
export const CheckoutStep = memo((props: CheckoutStepProps) => {
    return (
        <>
            {/* <Container maxWidth="lg"> */}
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <ShipmentForm onClick={() => ""} />
                    <PaymentForm savedCards />
                    <IconsWithText />
                </Grid>
                <Grid item xs={12} md={4}>
                    <CheckoutDetails />
                </Grid>
            </Grid>
            {/* </Container> */}
        </>
    );
});

export default CheckoutStep;
