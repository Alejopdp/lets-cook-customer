// Utils & config
import React from "react";

// External components
import { Box, Typography, useTheme } from "@material-ui/core";
import { CheckoutDetailItemProps } from "./interface";

const CheckoutDetailItem = (props: CheckoutDetailItemProps) => {
    const theme = useTheme();

    return (
        <Box display="flex" justifyContent="space-between" marginBottom={2}>
            <Typography style={{ fontSize: 16, color: props.isDiscountItem ? theme.palette.secondary.main : "inherit" }}>
                {props.title}
            </Typography>
            <Typography style={{ fontSize: 16, color: props.isDiscountItem ? theme.palette.secondary.main : "inherit" }}>
                {props.value}
            </Typography>
        </Box>
    );
};

export default CheckoutDetailItem;
