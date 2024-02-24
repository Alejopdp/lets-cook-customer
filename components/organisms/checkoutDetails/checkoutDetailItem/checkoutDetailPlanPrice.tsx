// Utils & config
import React from "react";

// External components
import { Box, Typography } from "@material-ui/core";
import { checkoutDetailPlanPriceProps } from "./interface";
import { useLang } from "@hooks";

const CheckoutDetailPlanPrice = (props: checkoutDetailPlanPriceProps) => {
    const [lang] = useLang("checkoutStep");

    return (
        <Box display="flex" justifyContent="space-between" marginBottom={2}>
            <Typography style={{ fontSize: 16, color: "inherit" }}>{props.title}</Typography>
            <Typography style={{ fontSize: 16, color: "inherit" }}>
                {props.priceWithOffer ?? props.price} €/{lang.checkoutDetails.week}
            </Typography>
        </Box>
    );
};

export default CheckoutDetailPlanPrice;
