import React, { memo } from "react";
import { useBuyFlow } from "@stores";
import { Container } from "@material-ui/core";
import { ShipmentForm, PaymentForm, IconsWithText } from "@molecules";
import CheckoutDetails from "../checkoutDetails";

interface CheckoutStepProps {
    handleSubmitPayment: () => void;
}
export const CheckoutStep = memo((props: CheckoutStepProps) => {
    const gotToNextView = useBuyFlow(({ forward }) => forward);

    return (
        <Container maxWidth="lg">
            {/* <button onClick={() => gotToNextView()}>Elegir recetas</button> */}
            <ShipmentForm onClick={() => ""} />
            <PaymentForm savedCards />
            <IconsWithText />
            <CheckoutDetails />
        </Container>
    );
});

export default CheckoutStep;
