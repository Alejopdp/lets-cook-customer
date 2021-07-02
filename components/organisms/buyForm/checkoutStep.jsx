import React, { memo } from "react";
import { useBuyFlow } from "@stores";
import { Container } from "@material-ui/core";
import { ShipmentForm, PaymentForm, IconsWithText } from "@molecules";

export const CheckoutStep = memo(() => {
    const gotToNextView = useBuyFlow(({ forward }) => forward);
    return (
        <Container maxWidth="lg">
            <button onClick={() => gotToNextView()}>Elegir recetas</button>
            <ShipmentForm registeredUser />
            <PaymentForm savedCards />
            <IconsWithText />
        </Container>
    );
});

export default CheckoutStep;
