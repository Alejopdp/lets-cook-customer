// Utils & config
import React from "react";

// External components
import { Box, Typography } from "@material-ui/core";
import { checkoutDetailPlanPriceProps } from "./interface";

const checkoutDetailPlanPrice = (props: checkoutDetailPlanPriceProps) => {
    return (
        <Box display="flex" justifyContent="space-between" marginBottom={2}>
            <Typography style={{ fontSize: 16, color: "inherit" }}>{props.title}</Typography>
            {/* <Typography style={{ fontSize: 16, color: "inherit" }}>{props.price}</Typography> */}
            {props.priceWithOffer ? (
                <Typography style={{ fontSize: 16, color: "inherit" }}>
                    <span style={{ textDecoration: 'line-through', fontSize: 14, color: '#515151' }}>{props.price} €</span> {props.priceWithOffer} €/semana
                </Typography>
            ) : (
                    <Typography style={{ fontSize: 16, color: "inherit" }}>
                        {props.price} €/semana
                    </Typography>
                )}
        </Box>
    );
};

export default checkoutDetailPlanPrice;
